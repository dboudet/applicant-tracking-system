import Typography from "@material-ui/core/Typography"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import { makeStyles } from "@material-ui/core/styles"
import PeopleIcon from "@material-ui/icons/People"

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
      <Typography color="textPrimary">
        <PeopleIcon className={classes.icon} />
        All Applicants
      </Typography>
    </Breadcrumbs>
  )
}
