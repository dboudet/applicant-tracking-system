import { Container } from "@material-ui/core"
import { useState, useEffect } from "react"
import SingleApplicant from "./SingleApplicant"

export default function AllApplicants() {
  const [applicants, setApplicants] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ats/applicants`)
      .then((response) => response.json())
      .then((data) => setApplicants(data))
      // .then(console.log(applicants))
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
