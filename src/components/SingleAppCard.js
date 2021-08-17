import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Grid from "@material-ui/core/Grid"
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

export default function SingleAppCard() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <img
              src={headshot}
              alt="headshot"
              width="200"
              style={{ borderRadius: "50%", maxWidth: "100%" }}
            />
            <SingleAppRating />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <SingleAppInfo />
        </Grid>
      </Grid>
    </div>
  )
}
