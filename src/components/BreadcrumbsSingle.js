import Typography from "@material-ui/core/Typography"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Link from "@material-ui/core/Link"
import { makeStyles } from "@material-ui/core/styles"
import PeopleIcon from "@material-ui/icons/People"
import PersonIcon from "@material-ui/icons/Person"

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}))

export default function BreadcrumbsSingle() {
  const classes = useStyles()

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/applicants-list" className={classes.link}>
        <PeopleIcon className={classes.icon} />
        All Applicants
      </Link>
      <Typography color="textPrimary">
        <PersonIcon className={classes.icon} />
        Single Applicant
      </Typography>
    </Breadcrumbs>
  )
}
