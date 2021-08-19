import { useState } from "react"
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
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

  const classes = useStyles()
  const formData = {
    firstName: "Danielito",
    lastName: "Boudet",
    email: "dan08191230@bocacode.com",
    position: "API Tester 2",
    photoUrl: "https://bocacode.com/assets/images/candidates/dan-boudet.jpg",
  }

  const addApplicantToDB = (event) => {
    event.preventDefault()
    setLoading(true)

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
    <Container>
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
          />
          <TextField
            className={classes.textInput}
            required
            id="lastName"
            label="Last Name"
          />
          <TextField
            className={classes.textInput}
            required
            id="email"
            label="Email Address"
          />
          <TextField
            className={classes.textInput}
            required
            id="position"
            label="Position"
          />
          <TextField
            className={classes.textInput}
            id="photoUrl"
            label="Photo URL... (backup)"
          />
          <label
            htmlFor="photoUrl"
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
            id="photoUrl"
            multiple
            type="file"
          />
          <Button variant="contained" color="primary" size="large">
            Add Applicant
          </Button>
        </form>
      </Paper>
    </Container>
  )
}
