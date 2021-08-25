// using Firebase for file storage
import firebase from "firebase/app"
import "firebase/storage"
import { firebaseConfig } from "../config"

import { useState } from "react"
import { Button, Paper, TextField, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import BreadcrumbsAppForm from "../components/BreadcrumbsAppForm"
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
  photoUploadLabel: {
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
  const [notes, setNotes] = useState("")
  const [score, setScore] = useState(0)
  const [applicationStage, setApplicationStage] = useState(0)

  const handlePhotoUpload = () => {
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
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    const storageRef = firebase.storage().ref()
    let selectedPhotoRef = storageRef.child(
      `app-tracking-system/photos/${selectedPhotoUniqueName}`
    )
    selectedPhotoRef
      .put(selectedPhoto, metadata)
      .then(() => {
        selectedPhotoRef.getDownloadURL().then((downloadURL) => {
          setPhotoUrl(downloadURL)
        })
      })
      .catch(() => alert("Image could not be uploaded. Files must be .jpg or .png and less than 1MB in size."))
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
        alert("Applicant has been successfully added to the system")
      })
      .catch((err) => {
        alert("Error: Unable to create applicant")
      })
  }

  return (
    <>
      <BreadcrumbsAppForm />
      <Paper>
        <Typography
          variant="h4"
          style={{ textAlign: "center", paddingTop: 20 }}
        >
          Add an Applicant
        </Typography>
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          <label htmlFor="photoUploadInput" className={classes.photoUploadLabel}>
            <img src={photoUrl} className={classes.currentPhoto} alt="Current applicant headshot" />
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
            helperText={
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
