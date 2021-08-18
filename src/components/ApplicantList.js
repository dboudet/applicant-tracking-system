import { makeStyles } from "@material-ui/core/styles"
import { useState, useEffect } from "react"
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
  Button,
  Box,
} from "@material-ui/core"
import Rating from "@material-ui/lab/Rating"
import ApplicantPhoto from "./ApplicantPhoto"
import EditIcon from "@material-ui/icons/Edit"
import SingleApplicant from "./SingleApplicant"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "90vw",
    maxWidth: 900,
    minWidth: 600,
    margin: "auto",
  },
  applicantList: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    alignItems: "flex-start",
    marginRight: "8px",
  },
}))

export default function ApplicantList() {
  const classes = useStyles()
  const [applicants, setApplicants] = useState([])
  const [secondary, setSecondary] = useState(false)
  const [editDisabled, setEditDisabled] =useState(false)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ats/applicants`)
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data)
        console.log(applicants)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Applicants
        <FormControlLabel
          control={
            <Switch
            checked={secondary}
            onChange={(event) => setSecondary(event.target.checked)}
            name="showEmail"
            color="primary"
            />
          }
          label="Show Email"
        />
      </Typography>
      <div className={classes.applicantList}>
        <List>
          {applicants?.map((applicant) => {
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar className={classes.large}>
                    <ApplicantPhoto
                      key={applicant.id}
                      photo={applicant.photo_url}
                      name={applicant.first_name + "" + applicant.last_name}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={applicant.first_name + " " + applicant.last_name}
                  secondary={secondary ? applicant.email : null}
                />
                <Box>
                  <Rating
                    name="simple-controlled"
                    value={applicant.rating}
                    // onChange={(event, newValue) => {
                    //   setValue(newValue)
                    // }}
                  />
                </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<EditIcon />}
                    disabled={editDisabled} 
                  >
                    View/Edit
                  </Button>
              </ListItem>
            )
          })}
        </List>
      </div>
    </div>
  )
}
