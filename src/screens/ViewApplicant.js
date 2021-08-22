import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Grid, Box, Paper, Typography, Button } from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"
import { makeStyles } from "@material-ui/core/styles"
import EditIcon from "@material-ui/icons/Edit"
import BreadcrumbsSingle from "../components/BreadcrumbsSingle"

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

export default function ViewApplicant() {
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

  const [value,setValue] = useState(applicant.score)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <BreadcrumbsSingle />
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            md={4}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              src={applicant.photo_url}
              alt={`${applicant.first_name} ${applicant.last_name}`}
              width="150"
              height="auto"
              style={{ borderRadius: "50%", maxWidth: "100%" }}
            />
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating name="Applicant Score" value={value} readOnly />
            </Box>
            <Link
              to={`/applicants/update/${applicant.id}`}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button variant="contained" color="primary" size="large">
                Update Applicant
                <EditIcon />
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h3">{`${applicant.first_name} ${applicant.last_name}`}</Typography>
            <Typography variant="body1">{applicant.email}</Typography>
            <Typography variant="body1">{applicant.position}</Typography>
            <Typography variant="body2">{applicant.notes}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
