import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import SingleApplicant from "../components/SingleApplicant"
import BreadcrumbsSingle from "../components/BreadcrumbsSingle"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    minHeight: "70vh",
    
  },
}))

export default function ViewApplicant() {
  const classes = useStyles()
  const [applicant, setApplicant] = useState({})
  const { applicantId } = useParams()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ats/applicants/${applicantId}`)
      .then((response) => response.json())
      .then((data) => {
        setApplicant(data[0])
      })
      .catch((err) => console.error(err))
  }, [applicantId])

  return (
    <>
      <BreadcrumbsSingle />
      <Paper className={classes.paper} elevation={4}>
        <SingleApplicant key={applicant.id} applicant={applicant} />
      </Paper>
    </>
  )
}
