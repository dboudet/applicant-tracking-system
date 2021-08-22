import {
  Drawer,
  Toolbar,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import {
  Devices,
  FilterList,
  PersonAdd,
} from "@material-ui/icons"
import ListIcon from '@material-ui/icons/List'
import TableChartOutlinedIcon from '@material-ui/icons/TableChartOutlined'
import { Link } from "react-router-dom"

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  drawerLink: {
    color: "inherit",
    textDecoration: "inherit",
  },
}))

export default function SideDrawer() {
  const classes = useStyles()

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <Link to="/applicants-list" className={classes.drawerLink}>
            <ListItem button key="List">
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Applicant List" />
            </ListItem>
          </Link>
          <Link to="/applicants-table" className={classes.drawerLink}>
            <ListItem button key="Table">
              <ListItemIcon>
                <TableChartOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Applicant Table" />
            </ListItem>
          </Link>
          <Link to="/applicants-list-mobile" className={classes.drawerLink}>
            <ListItem button key="MobileList">
              <ListItemIcon>
                <Devices />
              </ListItemIcon>
              <ListItemText primary="Mobile List" />
            </ListItem>
          </Link>
          <Link to="/add-new-applicant" className={classes.drawerLink}>
            <ListItem button key="AddApplicant">
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Add New Applicant" />
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          <ListItem button key="List">
            <ListItemIcon>
              <FilterList />
            </ListItemIcon>
            <ListItemText primary="Filter...?" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  )
}
