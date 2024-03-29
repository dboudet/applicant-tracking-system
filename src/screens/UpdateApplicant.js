import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Button, ButtonGroup, Link, Paper, Typography } from "@material-ui/core"
import BreadcrumbsUpdateForm from "../components/BreadcrumbsUpdateForm"
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
      <BreadcrumbsUpdateForm />
      <Paper>
        <Typography
          variant="h4"
          style={{ textAlign: "center", paddingTop: 20 }}
        >
          Update Applicant
        </Typography>
        <UpdateForm key={applicant.id} value={applicant} />
        <ButtonGroup
          style={{ display: "flex", justifyContent: "space-around" }}
          color="primary"
          aria-label="primary button group"
        >
          {applicant.id > 1 && (
            <Link href={"/applicants/update/" + (applicant.id - 1)}>
              <Button>&laquo; Previous Applicant</Button>
            </Link>
          )}
          {(applicant.id + 1) !== null && <Link href={"/applicants/update/" + (applicant.id + 1)}>
            <Button>Next Applicant &raquo;</Button>
          </Link>}
        </ButtonGroup>
      </Paper>
    </>
  )
}
