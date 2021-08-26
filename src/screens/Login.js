import firebase from "firebase/app"
import "firebase/auth"
import { firebaseConfig } from "../config"

import { useState } from "react"
import { useHistory } from "react-router-dom"
import IconButton from "@material-ui/core/IconButton"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormControl from "@material-ui/core/FormControl"
import TextField from "@material-ui/core/TextField"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { Button, Paper, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  //   root: {
  //     display: "flex",
  //     flexDirection: "column",
  //     alignItems: "center",
  //     justifyContent: "center",
  //   },
  paper: {
    minWidth: "70ch",
    maxWidth: "90%",
  },
  loginForm: {
    "& > *": {
      margin: theme.spacing(3),
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "50ch",
  },
}))

export default function Login({ user, setUser }) {
  const classes = useStyles()
  const history = useHistory()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = (event) => event.preventDefault()

  const testValidEmail = (inputEmail) => {
    const regexEmailString =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regexEmailString.test(String(inputEmail).toLowerCase())
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    // if (!email || !password) {
    //   alert("Please enter your email address and password")
    //   return
    // }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const firebaseUser = userCredential.user
        // localStorage.setItem("user", JSON.stringify(firebaseUser))
        setUser(firebaseUser)
        console.log(firebaseUser)
        history.push("/applicants-list")
        alert("Welcome! You are now signed in.")
      })
      .catch((err) => {
        alert(err)
      })
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography
          variant="h4"
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
              testValidEmail(event.target.value) ? setEmailError(false) : setEmailError(true)
            }
            error={emailError}
            helperText={emailError ? "Please enter a valid email address." : null}
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
              helperText={passwordError ? "Please enter your password." : null}
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
    </div>
  )
}
