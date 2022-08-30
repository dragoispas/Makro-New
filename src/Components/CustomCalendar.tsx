/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/require-default-props */
/* eslint-disable no-else-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-pattern */
/* eslint-disable no-use-before-define */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/function-component-definition */

import { Paper, Stack, TextField, TextFieldProps } from '@mui/material';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { setDate } from 'date-fns';
import React from 'react';

export const CustomCalendar: React.FC = () => {
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
              actions: ['today']
            }
          }}
        />
      </LocalizationProvider>
    </Paper>
  );
};
