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
  Toolbar,
} from "@material-ui/core"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  //   root: {
  //     display: "flex",
  //     flexDirection: "column",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  paper: {
    minWidth: "60ch",
    maxWidth: "90vw",
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
  },
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
        alert("Welcome! You are now signed in.")
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div className={classes.root}>
      <Fade
        in={true}
        style={{
          transitionDelay: "500ms",
        }}
        unmountOnExit
      >
        <Paper className={classes.paper}>
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
          <Toolbar />
          <video width="320" height="240" controls>
            <source src="/video/recording-login-and-lists.mov" type="video/mov" />
            Your browser does not support the video tag.
          </video>
        </Paper>
      </Fade>
    </div>
  )
}
