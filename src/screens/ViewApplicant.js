import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Grid, Box, Paper, Typography, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import EditIcon from "@material-ui/icons/Edit"
import BreadcrumbsSingle from "../components/BreadcrumbsSingle"
import RatingReadOnly from "../components/RatingReadOnly"
import AppStageSepperReadOnly from "../components/AppStageStepperReadOnly"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(3),
    minHeight: "70vh",
  },
  gridColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    minHeight: 350,
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

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <BreadcrumbsSingle />
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid className={classes.gridColumn} item xs={12} md={4}>
            <img
              src={applicant.photo_url}
              alt={`${applicant.first_name} ${applicant.last_name}`}
              width="150"
              height="auto"
              style={{ borderRadius: "50%", maxWidth: "100%" }}
            />
            <Typography
              variant="h4"
              component="h2"
            >{`${applicant.first_name} ${applicant.last_name}`}</Typography>
            <Typography variant="subtitle2">{applicant.email}</Typography>
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
          <Grid className={classes.gridColumn} item xs={12} md={8}>
            <Typography variant="h6">{applicant.position}</Typography>
            <AppStageSepperReadOnly
              key={applicant.id}
              application_stage={applicant.application_stage}
            />
            <RatingReadOnly key={applicant.id} score={applicant.score} />
            {applicant.notes && (
              <Typography variant="body1" textAlign="center">
                Notes:
                <br />
                {applicant.notes}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
    </div>
  )
}
