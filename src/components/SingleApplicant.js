import { Link } from "react-router-dom"
import { Grid, Typography, Box, Button } from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"
import { makeStyles } from "@material-ui/core/styles"
import EditIcon from "@material-ui/icons/Edit"
import AppStageSepperReadOnly from "../components/AppStageStepperReadOnly"

const useStyles = makeStyles((theme) => ({
  gridColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 320,
    textAlign: "center",
  },
}))

export default function SingleApplicant({ applicant }) {
  const classes = useStyles()

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={4} className={classes.gridColumn}>
        <img
          src={applicant.photo_url}
          alt={`${applicant.first_name} ${applicant.last_name}`}
          width="150"
          height="150"
          style={{ borderRadius: "50%", maxWidth: "100%", objectFit:"cover", objectPosition:"top" }}
        />
        <Typography
          variant="h5"
          component="h2"
        >{`${applicant.first_name} ${applicant.last_name}`}</Typography>
        <Typography variant="subtitle2">{applicant.email}</Typography>
        <Link
          to={`/applicants/update/${applicant.id}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <Button variant="contained" color="primary" size="large">
            <EditIcon />
            &nbsp;Update
          </Button>
        </Link>
      </Grid>
      <Grid item xs={12} md={8} className={classes.gridColumn}>
        <Typography variant="h6">{applicant.position}</Typography>
        <AppStageSepperReadOnly
          application_stage={applicant.application_stage}
        />
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Assessment Score</Typography>
          <Rating name="Applicant Score" value={applicant.score} readOnly />
        </Box>
        {applicant.notes && (
          <Typography variant="body1">
            Notes:
            <br />
            {applicant.notes}
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}
