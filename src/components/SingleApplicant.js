import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import headshot from "../static//headshot-2021-cropped.jpg"
import SingleAppRating from "./SingleAppRating"
import SingleAppInfo from "./SingleAppInfo"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}))

export default function SingleApplicant(props) {
  const { first_name, last_name, email, photo_url, position } = props.value
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <img
              src={photo_url}
              alt={`${first_name} ${last_name}`}
              width="200"
              height="auto"
              style={{ borderRadius: "50%", maxWidth: "100%" }}
            />
            <SingleAppRating />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            <Typography variant="h3">{`${first_name} ${last_name}`}</Typography>
            <Typography variant="body1">{email}</Typography>
            <Typography variant="body1">{position}</Typography>
            <Typography variant="body2">Notes</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}