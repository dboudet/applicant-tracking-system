import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#333333",
    color: "#FFFFFF",
    height: "80px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
}))

export default function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Typography variant="body1" component="h4">
        Proudly developed by Dan Boudet
      </Typography>
      {/* <Typography variant="p" component="h5">
        <em>Built with React and Material-UI</em>
      </Typography> */}
    </footer>
  )
}
