import { makeStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import { Typography } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70ch",
    maxWidth: "100%",
  },
}))

function getSteps() {
  return [
    "Potential Candidate",
    "Application Received",
    "Application Reviewed",
    "Applicant Interviewed",
    "Offer Accepted",
  ]
}

export default function AppStageStepper({application_stage}) {
  const classes = useStyles()
  const steps = getSteps()

  return (
    <div className={classes.root}>
      <Stepper activeStep={application_stage} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel><Typography variant="caption">{label}</Typography></StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  )
}
