import Rating from "@material-ui/lab/Rating"
import {Box, Typography} from "@material-ui/core"

export default function RatingReadOnly({ score }) {
  return (
    <Box component="fieldset" mb={3} borderColor="transparent">
      <Typography component="legend">Assessment Score</Typography>
      <Rating name="Applicant Score" value={score} readOnly />
    </Box>
  )
}
