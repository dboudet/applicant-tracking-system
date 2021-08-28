import firebase from "firebase"
import "firebase/auth"
import { firebaseConfig } from "../config"
import { useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { alpha, makeStyles } from "@material-ui/core/styles"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  Button,
  TextField,
} from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"
import SearchIcon from "@material-ui/icons/Search"
import AccountCircle from "@material-ui/icons/AccountCircle"
import SupervisedUserCircleOutlinedIcon from "@material-ui/icons/SupervisedUserCircleOutlined"

const useStyles = makeStyles((theme) => ({
  // appBar: {
  //   zIndex: theme.zIndex.drawer + 1,
  // },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titleLink: {
    display: "flex",
    alignItems: "center",
    letterSpacing: "1px",
    color: "inherit",
    textDecoration: "none",
  },
  normalizeLink: {
    color: "inherit",
    textDecoration: "none",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    minWidth: 320,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    // [theme.breakpoints.up("md")]: {
    //   width: "20ch",
    // },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}))

export default function NavBar({ user, setUser }) {
  const classes = useStyles()
  const history = useHistory()

  const [applicantSearchResults, setApplicantSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [primaryAnchorEl, setPrimaryAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget)
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null)
  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }
  const handleMobileMenuOpen = (event) =>
    setMobileMoreAnchorEl(event.currentTarget)

  const handleLogout = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        setUser(false)
        // localStorage.removeItem("user")
        history.push("/")
      })
      .catch((error) => {})
  }

  const menuId = "primary-search-account-menu"
  const renderMenu = (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {!user && (
          <MenuItem onClick={handleMenuClose}>
            <Link to="/login" className={classes.normalizeLink}>
              Log in
            </Link>
          </MenuItem>
        )}

        {user && <MenuItem onClick={handleLogout}>Log out</MenuItem>}
      </Menu>
    </>
  )

  const mobileMenuId = "primary-search-account-menu-mobile"
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="Log in to view applicants"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {user && <span onClick={handleLogout}>Log out</span>}
        {!user && (
          <Link to="/login" className={classes.normalizeLink}>
            Log In
          </Link>
        )}
      </MenuItem>
    </Menu>
  )

  const populateSearchOptions = () => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ats/applicants`)
      .then((response) => response.json())
      .then((data) => {
        setApplicantSearchResults(data)
      })
      .catch((err) => console.error(err))
  }

  // useEffect(() => {
  //   fetch(`${process.env.REACT_APP_API_ENDPOINT}/ats/search/${searchQuery}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setApplicantSearchResults(data)
  //     })
  //     .catch((err) => console.error(err))
  // }, [searchQuery])

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {/* {user && <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>}
          {user && <Menu
            id="main-nav-menu"
            anchorEl={primaryAnchorEl}
            keepMounted
            open={Boolean(primaryAnchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <Link
                to="/add-new-applicant"
                className={classes.normalizeLink}
              >
                Add Applicant
              </Link>
            </MenuItem>
          </Menu>} */}
          <Typography variant="h6" component="h1" noWrap>
            <Link to="/" className={classes.titleLink}>
              <SupervisedUserCircleOutlinedIcon />
              &nbsp;Applicant Assistant
            </Link>
          </Typography>
          {user && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Autocomplete
                id="applicant-search"
                clearOnBlur={true}
                clearOnEscape={true}
                noOptionsText="Start typing..."
                options={applicantSearchResults}
                getOptionLabel={(applicant) => {
                  setSelectedApplicant(applicant.id)
                  return `${applicant.first_name} ${applicant.last_name}`
                }}
                getOptionSelected={(event) => {
                  // console.log(selectedApplicant)
                  history.push(`/view-applicant/${selectedApplicant}`)
                }}
                className={classes.inputRoot}
                onClose={() => history.push("/")}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Search applicants by name"
                    onFocus={populateSearchOptions}
                    onBlur={(event) => setSearchQuery("")}
                    onChange={(event) =>
                      setSearchQuery(
                        event.target.value.replace(/[^a-zA-Z0-9]/g, "")
                      )
                    }
                    className={classes.inputInput}
                  />
                )}
              />
              {/* <InputBase
              placeholder="Search Applicants…"
              inputProps={{ "aria-label": "search" }}
              onChange={(event) => setSearchQuery(event.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
                    /> */}
            </div>
          )}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {!user && (
              <Link to="/" className={classes.normalizeLink}>
                <Button
                  onClick={handleLogout}
                  startIcon={<AccountCircle />}
                  className={classes.normalizeLink}
                >
                  Log in
                </Button>
              </Link>
            )}
            {user && (
              <Button
                onClick={handleLogout}
                className={classes.normalizeLink}
                startIcon={<AccountCircle />}
              >
                Log out
              </Button>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div className={classes.offset} />
    </div>
  )
}
