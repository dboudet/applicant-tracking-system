import { Container } from "@material-ui/core"
import { useState, useEffect } from "react"

export default function ViewApplicant() {
  const [applicant, setApplicant] = useState({})

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ats/applicants/:applicantId`)
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data)
        console.log(applicants)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <Container maxWidth="lg" style={{ minHeight: "70vh", paddingTop: "20px" }}>
      {applicants?.map((singleApplicant) => {
        return (
          <>
            <SingleApplicant key={singleApplicant.id} value={singleApplicant} />
          </>
        )
      })}
    </Container>
  )
}
