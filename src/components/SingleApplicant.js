import {Grid, Box, Paper, Typography} from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"
import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import SingleAppRating from "./SingleAppRating"
import SingleAppInfo from "./SingleAppInfo"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.primary,
  },
}))

export default function SingleApplicant(props) {
  const { first_name, last_name, email, photo_url, position, rating } =
    props.value

  // const [value, setValue] = useState(5)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <img
              src={photo_url}
              alt={`${first_name} ${last_name}`}
              width="150"
              height="auto"
              style={{ borderRadius: "50%", maxWidth: "100%" }}
            />
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating
                name="simple-controlled"
                value={rating}
                // onChange={(event, newValue) => {
                //   setValue(newValue)
                // }}
              />
            </Box>
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
