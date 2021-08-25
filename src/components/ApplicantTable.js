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
    field: "application_stage",
    headerName: "Application Stage",
    sortable: true,
    width: 120,
  },
  {
    field: "application_stage",
    headerName: "Application Stage",
    sortable: true,
    width: 200,
  },
  {
    field: "score",
    headerName: "Assessment Score",
    sortable: true,
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
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={applicants}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[2]}
        />
      </div>
    </Container>
  )
}
