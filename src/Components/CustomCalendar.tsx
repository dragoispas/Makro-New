import { Paper, TextField, TextFieldProps } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React from 'react';

export default function CustomCalendar() {
  const [date, setDate] = React.useState<Date | null>(new Date('2014-08-18T21:11:54'));

  return (
    <Paper sx={{ padding: '10px 0' }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          onChange={(newValue: React.SetStateAction<Date | null>) => setDate(newValue)}
          value={date}
          views={['month', 'day']}
          renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField {...params} />
          )}
          componentsProps={{
            actionBar: {
              actions: ['today'],
            },
          }}
        />
      </LocalizationProvider>
    </Paper>
  );
}
