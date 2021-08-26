import { useState, useEffect } from "react"
import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import SingleApplicant from "../components/SingleApplicant"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}))

export default function MobileApplicantList() {
  const classes = useStyles()
  const [applicants, setApplicants] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ats/applicants`)
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <>
      {applicants?.map((applicant) => {
        return (
          <Paper className={classes.paper} elevation={4}>
            <SingleApplicant key={applicant.id} applicant={applicant} />
          </Paper>
        )
      })}
    </>
  )
}
