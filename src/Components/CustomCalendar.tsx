import { Paper, TextField, TextFieldProps } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import moment from "moment";

interface CustomCalendarProps {
  date: Date;
  onChange: (date: Date | null) => void;
}

export default function CustomCalendar({ date, onChange }: CustomCalendarProps) {
  return (
    <Paper sx={{ padding: "10px 0" }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <StaticDatePicker
          onChange={onChange}
          value={moment(date, "YYYY-MM-DD").toDate()}
          views={["month", "day"]}
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField {...params} />
          )}
          componentsProps={{
            actionBar: {
              actions: ["today"],
            },
          }}
        />
      </LocalizationProvider>
    </Paper>
  );
}
