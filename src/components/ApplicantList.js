import { makeStyles } from "@material-ui/core/styles"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  FormControlLabel,
  Switch,
  Typography,
  Button,
  Box,
  Paper,
} from "@material-ui/core"
import BreadcrumbsList from "../components/BreadcrumbsList"
import Rating from "@material-ui/lab/Rating"
import ApplicantPhoto from "./ApplicantPhoto"
import EditIcon from "@material-ui/icons/Edit"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "75vw",
    minWidth: 740,
    margin: "auto",
  },
  title: {
    margin: theme.spacing(4, 0, 2),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  const [editDisabled, setEditDisabled] = useState(false)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ats/applicants`)
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        <BreadcrumbsList />
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
        <Paper>
          <List>
            {applicants?.map((applicant) => {
              return (
                <ListItem key={applicant.id} style={{ overflow: "scroll" }}>
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
                    style={{ flexBasis: 150 }}
                  />
                  <Typography style={{ flexBasis: 180, flexGrow: 1 }}>
                    {applicant.position}
                  </Typography>
                  <Box style={{ flexBasis: 140 }}>
                    <Rating
                      name="Applicant Score"
                      value={applicant.score}
                      readOnly
                      // onChange={(event, newValue) => {
                      //   setValue(newValue)
                      // }}
                    />
                  </Box>
                  <Button
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<EditIcon />}
                    disabled={editDisabled}
                  >
                    <Link
                      to={`/view-applicant/${applicant?.id}`}
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      View/Update
                    </Link>
                  </Button>
                </ListItem>
              )
            })}
          </List>
        </Paper>
      </div>
    </div>
  )
}
