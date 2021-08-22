// using Firebase for file storage
import firebase from "firebase/app"
import "firebase/storage"
import { firebaseConfig } from "../config"

import { useState } from "react"
import { Box, Button, TextField, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import Rating from "@material-ui/lab/Rating"
import AppStageStepper from "./AppStageStepper"

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
    width: "70ch",
  },
  uploadInput: {
    display: "none",
  },
}))

export default function UpdateForm(props) {
  const classes = useStyles()

  const {
    id,
    first_name,
    last_name,
    email,
    photo_url,
    position,
    score,
    notes,
    application_stage,
  } = props.value

  const [loading, setLoading] = useState(false)
  const [newFirstName, setNewFirstName] = useState(first_name)
  const [newLastName, setNewLastName] = useState(last_name)
  const [newEmail, setNewEmail] = useState(email)
  const [newPosition, setNewPosition] = useState(position)
  const [newPhotoUrl, setNewPhotoUrl] = useState(photo_url)
  const [newNotes, setNewNotes] = useState(notes)
  const [value, setValue] = useState(score)
  const [newScore, setNewScore] = useState(score)
  const [newApplicationStage, setNewApplicationStage] =
    useState(application_stage)

  const handlePhotoUpload = () => {
    // reference file uploaded - with unique filename
    const uniqueFilename = require("unique-filename")
    // const os = require("os")
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
          setNewPhotoUrl(downloadURL)
        })
      })
      .catch((err) => console.log(err))
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    setLoading(true)

    const formData = {
      id: id,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      position: newPosition,
      photoUrl: newPhotoUrl,
      notes: newNotes,
      score: newScore,
      applicationStage: newApplicationStage,
    }

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ats/applicants/update/${id}`, {
      method: "PATCH",
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
        alert("Applicant information has been successfully updated.")
      })
      .catch((err) => {
        setLoading(false)
        console.error(err)
      })
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <label
        htmlFor="photoUploadInput"
        style={{
          width: "50ch",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <img src={newPhotoUrl} style={{ width: "100px", height: "100px" }} />
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
        defaultValue={first_name}
        onChange={(event) => setNewFirstName(event.target.value)}
      />
      <TextField
        className={classes.textInput}
        required
        id="lastName"
        label="Last Name"
        defaultValue={last_name}
        onChange={(event) => setNewLastName(event.target.value)}
      />
      <TextField
        className={classes.textInput}
        required
        id="email"
        label="Email Address"
        defaultValue={email}
        onChange={(event) => setNewEmail(event.target.value)}
      />
      <TextField
        className={classes.textInput}
        required
        id="position"
        label="Position"
        defaultValue={position}
        onChange={(event) => setNewPosition(event.target.value)}
      />
      <AppStageStepper
        key={id}
        application_stage={application_stage}
        setNewApplicationStage={setNewApplicationStage}
      />
      <Box component="fieldset" mb={2} borderColor="transparent">
        <Typography component="legend">Assessment Score</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, value) => {
            setValue(value)
            setNewScore(value)
          }}
        />
      </Box>
      <TextField
        className={classes.textInput}
        id="notes"
        label="Additional Notes"
        multiline
        defaultValue={notes}
        onChange={(event) => setNewNotes(event.target.value)}
      />
      <Button
        onClick={handleFormSubmit}
        variant="contained"
        color="primary"
        size="large"
      >
        Save Changes
      </Button>
    </form>
  )
}
