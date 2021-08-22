import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Paper, Typography } from "@material-ui/core"
import BreadcrumbsAppForm from "../components/BreadcrumbsAppForm"
import UpdateForm from "../components/UpdateForm"

export default function UpdateApplicant() {
  const { applicantId } = useParams()
  const [applicant, setApplicant] = useState({})

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
      <BreadcrumbsAppForm />
      <Paper>
        <Typography
          variant="h3"
          style={{ textAlign: "center", paddingTop: 20 }}
        >
          Update Applicant
        </Typography>
        <UpdateForm key={applicant.id} value={applicant} />
      </Paper>
    </>
  )
}
