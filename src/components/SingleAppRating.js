import { useState } from "react"
import Rating from "@material-ui/lab/Rating"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

export default function SingleAppRating() {
  const [value, setValue] = useState(5)

  return (
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Rating</Typography>
        <Rating
          name="pristine"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        />
      </Box>
  )
}
