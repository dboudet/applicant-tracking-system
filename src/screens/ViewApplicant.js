import { useParams } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import { Container } from "@material-ui/core"
import { useState, useEffect } from "react"
import SingleApplicant from "../components/SingleApplicant"
import BreadcrumbsSingle from "../components/BreadcrumbsSingle"

export default function ViewApplicant() {
  const [applicant, setApplicant] = useState({})
  const { applicantId } = useParams()

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(3),
      textAlign: "center",
      color: theme.palette.text.primary,
    },
  }))
    
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ats/applicants/${applicantId}`)
      .then((response) => response.json())
      .then((data) => {
        setApplicant(data[0])
      })
      .catch((err) => console.error(err))
  }, [applicantId])

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <BreadcrumbsSingle />
      <SingleApplicant key={applicant.id} value={applicant} />
    </div>
  )
}
