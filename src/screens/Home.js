import { useState } from "react"
import { FormControlLabel, Switch } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import BreadcrumbsList from "../components/BreadcrumbsList"
import ApplicantList from "../components/ApplicantList"
import MobileApplicantList from "./MobileApplicantList"

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
}))

export default function Home() {
  const [showStage, setShowStage] = useState(false)
  const classes = useStyles()
  return (
    <>
      <div className={classes.title}>
        <BreadcrumbsList />
        <FormControlLabel
          control={
            <Switch
              checked={showStage}
              onChange={(event) => setShowStage(event.target.checked)}
              name="showStage"
              color="primary"
            />
          }
          label="Card View"
        />
      </div>
      {showStage ? <MobileApplicantList /> : <ApplicantList />}
    </>
  )
}
