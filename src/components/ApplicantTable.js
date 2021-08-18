import { useState, useEffect } from "react"
import { Avatar, Container } from "@material-ui/core"
import { DataGrid } from "@material-ui/data-grid"
import SingleAppRating from "./SingleAppRating"
let imageUrlForTable = ""

const columns = [
  {
    field: (
      <Avatar
        alt="photo"
        src={imageUrlForTable}
      />
    ),
    headerName: "",
    width: 50,
  },
  {
    field: "first_name",
    headerName: "First name",
    width: 120,
  },
  {
    field: "first_name",
    headerName: "First name",
    width: 120,
  },
  {
    field: "last_name",
    headerName: "Last name",
    width: 120,
  },
  {
    field: "position",
    headerName: "Position",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    sortable: false,
    width: 200,
  },
  {
    field: `${SingleAppRating}`,
    headerName: "Rating",
    width: 100,
  },
]

export default function ApplicantTable() {
  const [applicants, setApplicants] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ats/applicants`)
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data)
        console.log(applicants)
        let imageUrlForTable = applicants.photo_url
      })
      //   .then(console.log(applicants))
      .catch((err) => console.error(err))
  }, [])

  return (
    <Container maxWidth="lg" style={{ minHeight: "70vh", paddingTop: "20px" }}>
      <div style={{ height: "40vh", width: "100%" }}>
        <DataGrid
          rows={applicants}
          columns={columns}
          pageSize={3}
          rowsPerPageOptions={[2]}
        />
      </div>
    </Container>
  )
}
