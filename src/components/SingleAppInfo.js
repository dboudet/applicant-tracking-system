import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

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
  
export default function SingleAppInfo() {
    const classes = useStyles()

  return (
      <Paper className={classes.paper}>
        <Typography variant="h3">Applicant Name</Typography>
        <Typography variant="body1">Position</Typography>
        <Typography variant="body2">Notes</Typography>
      </Paper>
  )
}
