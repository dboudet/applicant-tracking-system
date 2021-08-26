import { makeStyles } from "@material-ui/core/styles"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Button,
  Paper,
} from "@material-ui/core"
import AppStageSepperReadOnly from "../components/AppStageStepperReadOnly"
import ApplicantPhoto from "./ApplicantPhoto"
import EditIcon from "@material-ui/icons/Edit"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "100%",
    minWidth: 740,
    margin: "auto",
  },
  title: {
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
  listFirstCol: {
    flexBasis: 200,
    flexShrink: 0,
  },
  button: {
    minWidth: "128px",
  },
}))

export default function ApplicantList() {
  const classes = useStyles()
  const [applicants, setApplicants] = useState([])
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
                    secondary={applicant.email}
                    className={classes.listFirstCol}
                  />
                  <Typography style={{ flexBasis: 170, flexGrow: 1 }}>
                    {applicant.position}
                  </Typography>
                  <AppStageSepperReadOnly
                    key={applicant.id}
                    application_stage={applicant.application_stage}
                  />
                  <Button
                    variant="outlined"
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
