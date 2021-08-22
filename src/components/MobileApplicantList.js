import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useState, useEffect } from "react"
import BreadcrumbsList from "./BreadcrumbsList"
import SingleApplicant from "./SingleApplicant"

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
}))

export default function MobileApplicantList() {
  const classes = useStyles()
  const [applicants, setApplicants] = useState([])

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
      </Typography>
      {applicants?.map((singleApplicant) => {
        return (
          <>
            <SingleApplicant key={singleApplicant.id} value={singleApplicant} />
          </>
        )
      })}
    </div>
  )
}
