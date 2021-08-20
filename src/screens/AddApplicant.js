import { useState } from "react"
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core"
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
  uploadInput: {
    display: "none",
  },
}))

export default function AddApplicant() {
  const [loading, setLoading] = useState(false)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [position, setPosition] = useState("")
  const [photoUrl, setPhotoUrl] = useState(
    "http://dboudet-ats.s3-website-us-east-1.amazonaws.com/photo-placeholder.png"
  )
  const [photoUploaded, setPhotoUploaded] = useState(false)

  const classes = useStyles()

  const formData = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    position: position,
    photoUrl: photoUrl,
  }

  const handlePhotoUpload = () => {
    const photoUploadInput = document.getElementById("photoUploadInput")
    const uploadedPhoto = photoUploadInput.files[0].name
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    console.log()

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ats/new-applicant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        setLoading(false)
        return response.json()
      })
      .then((data) => {
        setLoading(false)
        console.log("Applicant added ----->", data)
      })
      .catch((err) => {
        setLoading(false)
        console.error(err)
      })
  }

  return (
    <>
      <BreadcrumbsAppForm />
      <Paper>
        <Typography
          variant="h3"
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
          <label
            htmlFor="photoUploadInput"
            style={{
              width: "50ch",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            Upload a photo/headshot (.jpg or .png)
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </label>
          <input
            accept="image/*"
            className={classes.uploadInput}
            id="photoUploadInput"
            type="file"
            onChange={handlePhotoUpload}
          />
          <TextField
            className={classes.textInput}
            id="photoUrlBackup"
            label="Photo URL... (backup)"
          />
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
