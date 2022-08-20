import { Paper, Stack, TextField } from "@mui/material"
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { setDate } from "date-fns"
import React from "react"

export const CustomCalendar:React.FC = () => {
    const [date, setDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    return(
        <Paper sx={{padding:"10px 0"}}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
            onChange={(newValue) => setDate(newValue)}
            value={date}
            renderInput={(params) => <TextField {...params} />}
            componentsProps={{
                actionBar: {
                actions: ['today'],
                },
            }}
            />
        </LocalizationProvider>
        </Paper>
    )
}