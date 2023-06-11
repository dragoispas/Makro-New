import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  options: string[];
}

interface ChartData {
  startDate: string;
  endDate: string;
  showTargetWeight: boolean;
}

function EditChartModal({ open, onClose, options }: Props) {
  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in 'YYYY-MM-DD' format
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [showTargetWeight, setShowTargetWeight] = useState(false);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowTargetWeight(e.target.checked);
  };

  const handleSave = () => {
    const chartData: ChartData = {
      startDate,
      endDate,
      showTargetWeight,
    };

    // Perform chart update logic here
    // e.g., call an API to update the chart data

    // Reset form fields
    setStartDate(currentDate);
    setEndDate(currentDate);
    setShowTargetWeight(false);

    // Close the modal
    onClose();
  };

  const handleCancel = () => {
    // Reset form fields
    setStartDate(currentDate);
    setEndDate(currentDate);
    setShowTargetWeight(false);

    // Close the modal
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" sx={{ margin: "0 auto" }}>
      <DialogTitle>Edit Chart</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Start Date"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="End Date"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox checked={showTargetWeight} onChange={handleCheckboxChange} color="primary" />
          }
          label="Show Target Weight"
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

export default EditChartModal;
