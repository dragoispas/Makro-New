import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
}

function ChangePasswordModal({ open, onClose }: Props) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSave = () => {
    // Perform password change logic here
    // e.g., call an API to update the password

    // Reset form fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    // Close the modal
    onClose();
  };

  const handleCancel = () => {
    // Reset form fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    // Close the modal
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} sx={{ maxWidth: "sm", margin: "0 auto" }}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <DialogContentText marginBottom={1.5}>
          Please enter your current password and new password.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={handleCurrentPasswordChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="New Password"
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangePasswordModal;
