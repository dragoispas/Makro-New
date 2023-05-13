import { Paper, TextField, TextFieldProps } from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import type { RootState } from "../../../app/store";
import { getDayEntryByDate } from "../../../Api/day-entries/api";
import { setDayEntry } from "../../../modules/diary/diarySlice";

export default function CustomCalendar() {
  const dispatch = useDispatch();
  const dayEntry = useSelector((state: RootState) => state.diary.dayEntry);

  if (!dayEntry) {
    return null;
  }

  const onDatePickerChange = (newValue: Date | null) => {
    if (newValue) {
      getDayEntryByDate(newValue).then((newDayEntry) => {
        dispatch(setDayEntry(newDayEntry));
      });
    }
  };

  return (
    <Paper sx={{ padding: "10px 0" }}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <StaticDatePicker
          onChange={onDatePickerChange}
          value={moment(dayEntry.date, "YYYY-MM-DD").toDate()}
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
