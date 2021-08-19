import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#333333",
    color: "#FFFFFF",
    height: "80px",
    padding: "24px",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}))

export default function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <p>&copy; {new Date().getFullYear()} Dan Boudet</p> 
      <p><em>Built with React and Material-UI</em></p>
    </footer>
  )
}
