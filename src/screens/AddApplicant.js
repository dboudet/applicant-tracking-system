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
  // uploadInput: {
  //   display: "none",
  // },
}))

export default function AddApplicant() {
  const classes = useStyles()

  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
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
      .catch((err) => console.log(err))
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    setLoading(true)

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
        setLoading(false)
        response.json()
      })
      .then((data) => {
        setLoading(false)
        alert("Applicant has been successfully added to the system")
      })
      .catch((err) => {
        setLoading(false)
        alert("Error creating applicant: ", err)
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
        <form className={classes.root} noValidate autoComplete="off">
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
            required
            id="email"
            label="Email Address"
            onChange={(event) => setEmail(event.target.value)}
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
          <label
            htmlFor="photoUploadInput"
            style={{
              width: "50ch",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" style={{ marginBottom: "12px" }}>
              Please upload a photo/headshot, if available:
            </Typography>
            <input
              accept="image/*"
              className={classes.uploadInput}
              id="photoUploadInput"
              type="file"
              onChange={handlePhotoUpload}
            />
          </label>
          <Button
            onClick={handleFormSubmit}
            variant="contained"
            color="primary"
            size="large"
          >
            Add Applicant
          </Button>
        </form>
      </Paper>
    </>
  )
}
