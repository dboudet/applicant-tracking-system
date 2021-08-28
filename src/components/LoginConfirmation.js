import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@material-ui/core"

export default function LoginConfirmation({ onClose, open }) {
  const handleClose = () => onClose()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="login-confirmation"
      aria-describedby="login-message"
    >
      <DialogContent>
        <DialogContentText id="login-message">
          You are now logged in
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          <strong>Continue</strong>
        </Button>
      </DialogActions>
    </Dialog>
  )
}
