import { Link } from "react-router-dom"
import { Grid, Box, Paper, Typography, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import EditIcon from "@material-ui/icons/Edit"
import AppStageSepperReadOnly from "../components/AppStageStepperReadOnly"
import RatingReadOnly from "./RatingReadOnly"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    margin: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
  gridColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
}))

export default function SingleApplicant(props) {
  const {
    id,
    first_name,
    last_name,
    email,
    photo_url,
    position,
    score,
    application_stage,
    notes,
  } = props.value

  const classes = useStyles()

  return (
    <Paper className={classes.paper} key={id}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4} className={classes.gridColumn}>
          <img
            src={photo_url}
            alt={`${first_name} ${last_name}`}
            width="150"
            height="auto"
            style={{ borderRadius: "50%", maxWidth: "100%" }}
          />
          <Typography
            variant="h5"
            component="h2"
          >{`${first_name} ${last_name}`}</Typography>
          <Typography variant="subtitle2">{email}</Typography>
          <Link
            to={`/applicants/update/${id}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Button variant="contained" color="primary" size="large">
              Update Applicant
              <EditIcon />
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} md={8} className={classes.gridColumn}>
          <Typography variant="h6">{position}</Typography>
          <AppStageSepperReadOnly
            application_stage={application_stage}
          />
          <RatingReadOnly score={score} />
          {notes && <Typography variant="body1" textAlign="center">
            Notes:
            <br />
            {notes}
          </Typography>}
        </Grid>
      </Grid>
    </Paper>
  )
}
