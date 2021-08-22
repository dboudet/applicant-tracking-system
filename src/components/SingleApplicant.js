import { Link } from "react-router-dom"
import { Grid, Box, Paper, Typography, Button } from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"
import { makeStyles } from "@material-ui/core/styles"
import EditIcon from "@material-ui/icons/Edit"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
}))

export default function SingleApplicant(props) {
  const { id, first_name, last_name, email, photo_url, position, score } =
    props.value

  // const [value, setValue] = useState(5)
  const classes = useStyles()

  return (
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
            src={photo_url}
            alt={`${first_name} ${last_name}`}
            width="150"
            height="auto"
            style={{ borderRadius: "50%", maxWidth: "100%" }}
          />
          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating name="Applicant Score" value={score} readOnly />
          </Box>
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
        <Grid item xs={12} md={8}>
          <Typography variant="h3">{`${first_name} ${last_name}`}</Typography>
          <Typography variant="body1">{email}</Typography>
          <Typography variant="body1">{position}</Typography>
          <Typography variant="body2">Notes</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}
