import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { CssBaseline, Toolbar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import NavBar from "./components/NavBar"
import SideDrawer from "./components/SideDrawer"
import MobileApplicantList from "./components/MobileApplicantList"
import ApplicantTable from "./components/ApplicantTable"
import ApplicantList from "./components/ApplicantList"
import Footer from "./components/Footer"
import ViewApplicant from "./screens/ViewApplicant"
import AddApplicant from "./screens/AddApplicant"
import "./App.css"

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    minHeight: "90vh",
  },
}))

export default function App() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <NavBar />
        <div className={classes.main}>
          <SideDrawer />
          <div className={classes.content}>
            <Toolbar />
            <Switch>
              <Route path="/view-applicant/:applicantId">
                <ViewApplicant />
              </Route>
              <Route path="/applicants-list">
                <ApplicantList />
              </Route>
              <Route path="/applicants-list-mobile">
                <MobileApplicantList />
              </Route>
              <Route path="/applicants-table">
                <ApplicantTable />
              </Route>
              <Route path="/add-new-applicant">
                <AddApplicant />
              </Route>
              <Route path="/">
                <ApplicantList />
                {/* <Home /> */}
              </Route>
            </Switch>
          </div>
        </div>
        <Footer />
      </Router>
    </div>
  )
}
