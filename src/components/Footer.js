import Box from "@material-ui/core/Box"

export default function Footer() {
  return (
    <Box bgcolor="var(--darkgray)" color="white" height="80px" p={3}>
      &copy; {new Date().getFullYear()} Dan Boudet
    </Box>
  )
}
