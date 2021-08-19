import { useParams } from "react-router-dom"
import { Container } from "@material-ui/core"
import { useState, useEffect } from "react"
import SingleApplicant from "../components/SingleApplicant"

export default function ViewApplicant() {
  const [applicant, setApplicant] = useState({})
  const {applicantId} = useParams()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ats/applicants/${applicantId}`)
      .then((response) => response.json())
      .then((data) => {
        setApplicant(data[0])
      })
      .catch((err) => console.error(err))
  }, [applicantId])

  return (
    <Container maxWidth="lg" style={{ minHeight: "70vh", paddingTop: "20px" }}>
      <SingleApplicant key={applicant.id} value={applicant} />
    </Container>
  )
}
