import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepLabel from "@material-ui/core/StepLabel"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "70ch",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  buttonContainer: {
      display:"flex",
      justifyContent:"center",
  }
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

export default function AppStageStepper({application_stage, setNewApplicationStage}) {
  const classes = useStyles()

  const [activeStep, setActiveStep] = useState(application_stage)
  const steps = getSteps()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setNewApplicationStage(activeStep)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    setNewApplicationStage(activeStep)
  }

  const handleReset = () => {
    setActiveStep(0)
    setNewApplicationStage(activeStep)
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div className={classes.buttonContainer}>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <div className={classes.buttonContainer}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Hired!" : "Complete This Step"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
