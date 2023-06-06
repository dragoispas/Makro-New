import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
}

const ContactSupportModal = ({ open, onClose }: Props) => {
  const [message, setMessage] = useState("");
  const MAX_CHARACTERS = 200; // Adjust the maximum character limit as needed

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    // Here, you can perform any necessary actions with the submitted message
    // For example, send it to the backend or trigger a notification

    // Clear the message and close the dialog
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ maxWidth: "sm", margin: "0 auto" }}>
      <DialogTitle>Contact Support</DialogTitle>
      <DialogContent>
        <DialogContentText marginBottom={1.5}>
          Please give us more details about the issue you encountered in the box below.
        </DialogContentText>
        <TextField
          label="Message"
          multiline
          rows={5}
          fullWidth
          value={message}
          onChange={handleInputChange}
          inputProps={{
            maxLength: MAX_CHARACTERS,
          }}
          helperText={`${message.length}/${MAX_CHARACTERS} characters`}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!message.trim()} color="primary">
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactSupportModal;
