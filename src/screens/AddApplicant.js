// using Firebase for file storage
import firebase from "firebase/app"
import "firebase/storage"
import { firebaseConfig } from "../config"

import { useState } from "react"
import {
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import BreadcrumbsAddForm from "../components/BreadcrumbsAddForm"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(3),
    },
    minHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "50ch",
  },
  fileUploadLabel: {
    width: "50ch",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  currentPhoto: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    objectPosition: "top",
    borderRadius: "50%",
  },
  uploadInput: {
    display: "none",
  },
}))

export default function AddApplicant() {
  const classes = useStyles()
  const history = useHistory()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [isValidEmail, setIsValidEmail] = useState()
  const [position, setPosition] = useState("")
  const [photoUrl, setPhotoUrl] = useState(
    "http://dboudet-ats.s3-website-us-east-1.amazonaws.com/photo-placeholder.png"
  )
  const [resumeUrl, setResumeUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/dan-boudet-com.appspot.com/o/app-tracking-system%2Fresumes%2Fmissing-resume.pdf?alt=media&token=78eacbf8-4b92-4070-8534-804a1284c6c4"
  )
  const [resumePath, setResumePath] = useState("")
  const [notes, setNotes] = useState("")
  const [score, setScore] = useState(0)
  const [applicationStage, setApplicationStage] = useState(0)
  const [photoLoading, setPhotoLoading] = useState(false)
  const [resumeLoading, setResumeLoading] = useState(false)

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  const handlePhotoUpload = () => {
    setPhotoLoading(true)
    const uniqueFilename = require("unique-filename")
    const mime = require("mime-types")

    // compile filename, extension, and metadata
    let selectedPhoto = document.getElementById("photoUploadInput").files[0]
    let metadata = {
      contentType: selectedPhoto.type,
    }
    let selectedPhotoExtension = mime.extension(selectedPhoto.type)
    let selectedPhotoUniqueName =
      uniqueFilename("", "photo", selectedPhoto.name) +
      "." +
      selectedPhotoExtension
    // console.log(selectedPhotoUniqueName)

    // upload to Firebase
    const storageRef = firebase.storage().ref()
    let selectedPhotoRef = storageRef.child(
      `app-tracking-system/photos/${selectedPhotoUniqueName}`
    )
    selectedPhotoRef
      .put(selectedPhoto, metadata)
      .then(() => {
        selectedPhotoRef.getDownloadURL().then((downloadURL) => {
          setPhotoUrl(downloadURL)
          setPhotoLoading(false)
        })
      })
      .catch(() => {
        setPhotoLoading(false)
        alert(
          "Image could not be uploaded. Files must be .jpg or .png and less than 2MB in size."
        )
      })
  }

  const handleResumeUpload = () => {
    setResumeLoading(true)
    const uniqueFilename = require("unique-filename")
    const mime = require("mime-types")

    // compile filename, extension, and metadata
    let selectedResume = document.getElementById("resumeUploadInput").files[0]
    if (selectedResume !== undefined) {
      setResumePath(selectedResume.name, selectedResume.type)
    } else return

    let metadata = {
      contentType: selectedResume.type,
    }
    let selectedResumeExtension = mime.extension(selectedResume.type)
    let selectedResumeUniqueName =
      uniqueFilename("", "resume", selectedResume.name) +
      "." +
      selectedResumeExtension
    // console.log(selectedResumeUniqueName)

    // upload to Firebase
    const storageRef = firebase.storage().ref()
    let selectedResumeRef = storageRef.child(
      `app-tracking-system/resumes/${selectedResumeUniqueName}`
    )
    selectedResumeRef
      .put(selectedResume, metadata)
      .then(() => {
        selectedResumeRef.getDownloadURL().then((resumeDownloadURL) => {
          setResumeUrl(resumeDownloadURL)
          setResumeLoading(false)
        })
      })
      .catch(() => {
        setResumeLoading(false)
        alert(
          "Resume could not be uploaded. Please select a PDF file less than 2MB in size."
        )
      })
  }

  const validateEmail = (inputEmail) => {
    const regexEmailString =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexEmailString.test(String(inputEmail).toLowerCase())
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (
      firstName === "" ||
      lastName === "" ||
      isValidEmail === false ||
      position === ""
    ) {
      alert("Please fill out all required fields")
      return
    }

    const formData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      position: position,
      photoUrl: photoUrl,
      resumeUrl: resumeUrl,
      notes: notes,
    }

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ats/new-applicant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        response.json()
      })
      .then((data) => {
        history.push("/")
        alert("Applicant has been successfully added to the system")
      })
      .catch((err) => {
        alert("Error: Unable to create applicant")
      })
  }

  return (
    <>
      <BreadcrumbsAddForm />
      <Paper>
        <Typography
          variant="h4"
          style={{ textAlign: "center", paddingTop: 20 }}
        >
          Add New Applicant
        </Typography>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          {photoLoading ? (
            <CircularProgress />
          ) : (
            <label
              htmlFor="photoUploadInput"
              className={classes.fileUploadLabel}
            >
              <img
                src={photoUrl}
                className={classes.currentPhoto}
                alt="Current applicant headhshot"
              />
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload Profile Photo
              </Button>
              <input
                accept="image/*"
                className={classes.uploadInput}
                id="photoUploadInput"
                type="file"
                onChange={handlePhotoUpload}
              />
            </label>
          )}
          {resumeLoading ? (
            <CircularProgress />
          ) : (
            <label
              htmlFor="resumeUploadInput"
              className={classes.fileUploadLabel}
            >
              {<p>{resumePath}</p>}
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<CloudUploadIcon />}
              >
                Upload Resume
              </Button>
              <input
                accept="application/pdf"
                className={classes.uploadInput}
                id="resumeUploadInput"
                type="file"
                onChange={
                  document.getElementById("resumeUploadInput")
                    ? handleResumeUpload
                    : null
                }
              />
            </label>
          )}
          <TextField
            className={classes.textInput}
            required
            id="firstName"
            label="First Name"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <TextField
            className={classes.textInput}
            required
            id="lastName"
            label="Last Name"
            onChange={(event) => setLastName(event.target.value)}
          />
          <TextField
            className={classes.textInput}
            id="email"
            label="Email Address"
            required
            type="email"
            onChange={(event) => setEmail(event.target.value)}
            onBlur={(event) => {
              validateEmail(event.target.value) === true
                ? setIsValidEmail(true)
                : setIsValidEmail(false)
            }}
            error={isValidEmail === false ? true : false}
            helpertext={
              isValidEmail !== false
                ? null
                : "Please enter a valid email address."
            }
          />
          <TextField
            className={classes.textInput}
            required
            id="position"
            label="Position"
            onChange={(event) => setPosition(event.target.value)}
          />
          <TextField
            className={classes.textInput}
            id="notes"
            label="Additional Notes"
            multiline
            defaultValue={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={
              firstName === "" ||
              lastName === "" ||
              isValidEmail === false ||
              position === ""
                ? true
                : false
            }
          >
            Add Applicant
          </Button>
        </form>
      </Paper>
    </>
  )
}
