import firebase from "firebase/app"
import "firebase/auth"
import { firebaseConfig } from "../config"
import bcrypt from "bcryptjs"
import { useState, useEffect, useRef } from "react"
import { useHistory } from "react-router-dom"
import {
  Button,
  Fade,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { makeStyles } from "@material-ui/core/styles"
import heroImage from "../static/applicant-assistant-hero-2.jpg"
import demoLogin from "../static/demo-login.png"
import LoginConfirmation from "../components/LoginConfirmation"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  hero: {
    width: "100%",
    height: "calc(100vw * 0.2)",
    backgroundImage: `url(${heroImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  formContainer: {
    width: "60ch",
    maxWidth: "90vw",
    margin: theme.spacing(4),
  },
  loginForm: {
    "& > *": {
      margin: theme.spacing(3),
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "100vw",
  },
  textInput: {
    width: "50ch",
    maxWidth: "95%",
  },
  demoArea: {
    margin: theme.spacing(4),
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    "& > h6": {
      margin: theme.spacing(4, 0, 1, 0),
    },
    "& > img": {
      maxWidth: "94%",
    },
  },
  demoContent: {},
}))
const mySalt = "$2a$10$jVyAWaE9JAWIbzEQqx/sju"

export default function Login({ user, setUser }) {
  const classes = useStyles()
  const history = useHistory()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const timerRef = useRef()
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => () => clearTimeout(timerRef.current), [])
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = (event) => event.preventDefault()

  const testValidEmail = (inputEmail) => {
    const regexEmailString =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexEmailString.test(String(inputEmail).toLowerCase())
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    const hashedPassword = bcrypt.hashSync(password, mySalt)
    // if (!email || !password) {
    //   alert("Please enter your email address and password")
    //   return
    // }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, hashedPassword)
      .then((userCredential) => {
        // Signed in
        const firebaseUser = userCredential.user
        // localStorage.setItem("user", JSON.stringify(firebaseUser))
        setUser(firebaseUser)
        // console.log(firebaseUser)
        history.push("/")
        setDialogOpen(true)
        // alert("Welcome! You are now signed in.")
      })
      .catch((err) => {
        alert(err)
      })
  }

  const handleDialogClose = () => setDialogOpen(false)

  return (
    <Fade
      in={true}
      style={{
        transitionDelay: "500ms",
      }}
      unmountOnExit
    >
      <div className={classes.root}>
        <LoginConfirmation open={dialogOpen} onClose={handleDialogClose} />
        <div className={classes.hero}></div>
        <Paper className={classes.formContainer}>
          <Typography
            variant="h5"
            style={{ textAlign: "center", paddingTop: 20 }}
          >
            Please log in to view applicants
          </Typography>
          <form
            className={classes.loginForm}
            noValidate
            autoComplete="off"
            onSubmit={handleFormSubmit}
          >
            <TextField
              className={classes.textInput}
              id="email"
              label="Email Address"
              required
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              onBlur={(event) =>
                testValidEmail(event.target.value)
                  ? setEmailError(false)
                  : setEmailError(true)
              }
              error={emailError}
              helpertext={
                emailError ? "Please enter a valid email address." : null
              }
            />
            <FormControl className={classes.textInput}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                label="Password"
                required
                type={showPassword ? "text" : "password"}
                onBlur={(event) =>
                  !event.target.value
                    ? setPasswordError(true)
                    : setPasswordError(false)
                }
                error={passwordError}
                helpertext={
                  passwordError ? "Please enter your password." : null
                }
                onChange={(event) => setPassword(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={email === false || password === false ? true : false}
            >
              Log in
            </Button>
          </form>
        </Paper>
        <Paper className={classes.demoArea}>
          <Typography variant="h5" style={{ maxWidth: "760px" }}>
            <p>Below, you'll find a preview of my applicant tracking system, along with a demo login if you'd like try it out.</p>
            <img
              src={demoLogin}
              alt="demo user"
            />
          </Typography>
          <Typography variant="h6">Multiple List Views</Typography>
          <img
            src={process.env.PUBLIC_URL + "/ats-demo-lists.gif"}
            alt="List and card applicant views"
          />
          <Typography variant="h6">Update Applicants' Progress</Typography>
          <img
            src={process.env.PUBLIC_URL + "/ats-demo-update.gif"}
            alt="Login and applicant list views"
          />
          <Typography variant="h6">Easily Add New Candidates</Typography>
          <img
            src={process.env.PUBLIC_URL + "/ats-demo-add.gif"}
            alt="Login and applicant list views"
          />
          <Typography variant="h6">Find Applicants by Name</Typography>
          <img
            src={process.env.PUBLIC_URL + "/ats-demo-search.gif"}
            alt="Login and applicant list views"
          />
        </Paper>
      </div>
    </Fade>
  )
}
