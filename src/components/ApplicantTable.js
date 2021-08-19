import { useState, useEffect } from "react"
import { Container } from "@material-ui/core"
import { DataGrid } from "@material-ui/data-grid"

const columns = [
  {
    field: "full_name",
    headerName: "Name",
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, "first_name")} ${params.getValue(
        params.id,
        "last_name"
      )}`,
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
]

export default function ApplicantTable() {
  const [applicants, setApplicants] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ats/applicants`)
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data)
        console.log(applicants)
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
