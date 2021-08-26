import { useState } from "react"
import {Link} from "react-router-dom"
import { Button, FormControlLabel, Switch } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import BreadcrumbsList from "../components/BreadcrumbsList"
import ApplicantList from "../components/ApplicantList"
import MobileApplicantList from "./MobileApplicantList"
import PersonAddIcon from '@material-ui/icons/PersonAdd'

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  titleLeft: {
    flexBasis: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }
}))

export default function Home() {
  const [showStage, setShowStage] = useState(false)
  const classes = useStyles()
  return (
    <>
      <div className={classes.title}>
        <div className={classes.titleLeft}>
          <BreadcrumbsList />
          <FormControlLabel
            label="Card View"
            control={
              <Switch
                checked={showStage}
                onChange={(event) => setShowStage(event.target.checked)}
                name="showStage"
                color="primary"
              />
            }
          />
        </div>
          <Link to="/add-new-applicant" style={{color: "inherit", textDecoration: "none"}}>
        <Button color="primary" startIcon={<PersonAddIcon />}>
            Add New Applicant
        </Button>
          </Link>
      </div>
      {showStage ? <MobileApplicantList /> : <ApplicantList />}
    </>
  )
}
