import {
  Box, Container, Paper, Stack, Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import CustomCalendar from '../Components/CustomCalendar';
import { DiaryChart } from '../Components/DiaryChart';
import { Search } from '../Components/Search';
import { FoodEntryList } from '../Components/FoodEntryList';
import { getDayEntryByDate } from '../Api/day-entries/api';
import { setDayEntry } from '../modules/diary/diarySlice';
import DayEntryDetails from '../Components/DayEntryDetails';

export default function DiaryPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    getDayEntryByDate(new Date()).then((dayEntry) => {
      dispatch(setDayEntry(dayEntry));
    });
  }, []);

  return (
    <Box sx={{
      marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '40px',
    }}
    >
      <Stack gap="30px">
        <CustomCalendar />
        <DayEntryDetails />
      </Stack>

      <Paper sx={{ height: '785px', width: '600px', padding: '24px' }}>
        <Typography sx={{ fontSize: '0.75rem', opacity: 0.6, marginTop: '10px' }}>
          LOG FOODS
        </Typography>
        <Stack sx={{ alignItems: 'center', paddingTop: '20px' }}>
          <Container sx={{ width: '500px', height: '60px' }} />
          <Search />
          <DiaryChart
            targetCalories={2000}
            totalCalories={1500}
            totalCarbs={200}
            totalFat={34}
            totalProtein={178}
          />
          <Box sx={{ width: '100%' }}>
            <FoodEntryList />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
