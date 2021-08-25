// using Firebase for file storage
import firebase from "firebase/app"
import "firebase/storage"
import { firebaseConfig } from "../config"

import { useState } from "react"
import { Box, Button, TextField, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import AppStageStepper from "./AppStageStepper"
import Rating from "@material-ui/lab/Rating"
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
    width: "70ch",
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

  const [newFirstName, setNewFirstName] = useState(first_name)
  const [newLastName, setNewLastName] = useState(last_name)
  const [newEmail, setNewEmail] = useState(email)
  const [isValidEmail, setIsValidEmail] = useState(true)
  const [newPosition, setNewPosition] = useState(position)
  const [newPhotoUrl, setNewPhotoUrl] = useState(photo_url)
  const [newNotes, setNewNotes] = useState(notes)
  const [value, setValue] = useState(score)
  const [newScore, setNewScore] = useState(score)
  const [newApplicationStage, setNewApplicationStage] =
    useState(application_stage)

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
          setNewPhotoUrl(downloadURL)
        })
      })
      .catch(() => alert("Image could not be uploaded. Files must be .jpg or .png and less than 1MB in size."))
  }

  const validateEmail = (inputEmail) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(inputEmail).toLowerCase())
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (
      newFirstName === "" ||
      newLastName === "" ||
      isValidEmail === false ||
      newPosition === ""
    ) {
      alert("Please fill out all required fields")
      return
    }

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
        response.json()
      })
      .then((data) => {
        alert("Applicant information has been successfully updated.")
      })
      .catch((err) => {
        alert("Error: unable to update applicant")
      })
  }

  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleFormSubmit}
    >
      <label htmlFor="photoUploadInput" className={classes.photoUploadLabel}>
        <img
          src={newPhotoUrl}
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
        id="email"
        label="Email Address"
        required
        type="email"
        defaultValue={email}
        onChange={(event) => {
          if (validateEmail(event.target.value) === false) {
            setIsValidEmail(false)
          } else {
            setIsValidEmail(true)
            setNewEmail(event.target.value)
          }
        }}
        error={isValidEmail === false ? true : false}
        helperText={
          isValidEmail !== false ? null : "Please enter a valid email address."
        }
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
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        disabled={
          newFirstName === "" ||
          newLastName === "" ||
          isValidEmail === false ||
          newPosition === ""
            ? true
            : false
        }
      >
        Save Changes
      </Button>
    </form>
  )
}
