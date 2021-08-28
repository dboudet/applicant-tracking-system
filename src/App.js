import firebase from "firebase"
import "firebase/auth"
import { firebaseConfig } from "./config"
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Container, CssBaseline, Toolbar } from "@material-ui/core"
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles"
import NavBar from "./components/NavBar"
import MobileApplicantList from "./screens/MobileApplicantList"
import ApplicantTable from "./components/ApplicantTable"
import ApplicantList from "./components/ApplicantList"
import Footer from "./components/Footer"
import ViewApplicant from "./screens/ViewApplicant"
import AddApplicant from "./screens/AddApplicant"
import UpdateApplicant from "./screens/UpdateApplicant"
import Login from "./screens/Login"
import "./App.css"
import Home from "./screens/Home"
import { teal } from "@material-ui/core/colors"

const theme = createTheme({
  palette: {
    primary: {
      main: teal[800],
  },
}
})

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    minHeight: "90vh",
  },
  container: {
    minHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}))

export default function App() {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [])
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    firebase.auth().onAuthStateChanged((authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(undefined)
    })
  })

  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Router>
          <CssBaseline />
          <NavBar user={user} setUser={setUser} />
          <div className={classes.main}>
            {/* <SideDrawer /> */}
            <div className={classes.content}>
              <Toolbar />
              {user && (
                <Container
                  maxWidth="lg"
                  style={{ minHeight: "70vh", paddingTop: "20px" }}
                >
                  <Switch>
                    <Route exact path="/applicants/update/:applicantId">
                      <UpdateApplicant />
                    </Route>
                    <Route exact path="/view-applicant/:applicantId">
                      <ViewApplicant />
                    </Route>
                    <Route exact path="/add-new-applicant">
                      <AddApplicant />
                    </Route>
                    <Route exact path="/applicants-list-mobile">
                      <MobileApplicantList />
                    </Route>
                    <Route exact path="/applicants-table">
                      <ApplicantTable />
                    </Route>
                    <Route path="/applicants-list">
                      <ApplicantList />
                    </Route>
                    <Route path="/login">
                      <Login user={user} setUser={setUser} />
                    </Route>
                    <Route path="/*">
                      <Home />
                    </Route>
                  </Switch>
                </Container>
              )}
              {!user && (
                <Container className={classes.container}>
                  <Switch>
                    <Route path="/*">
                      <Login user={user} setUser={setUser} />
                    </Route>
                  </Switch>
                </Container>
              )}
            </div>
          </div>
          <Footer />
        </Router>
      </div>
    </ThemeProvider>
  )
}
