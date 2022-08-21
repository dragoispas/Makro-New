import {
  Box,
  Paper,
  Container,
  Stack,
  InputBase,
  TextField,
  Typography,
  MenuItem,
  Button
} from '@mui/material';
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
  StaticDatePicker
} from '@mui/x-date-pickers';
import moment from 'moment';
import React, { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CustomCalendar } from '../Components/CustomCalendar';
import { DiaryChart } from '../Components/DiaryChart';
import { Header } from '../Components/Header';
import { Search } from '../Components/Search';

export const DiaryPage: React.FC = () => {
  const [weight, setWeight] = useState<string>('WEIGHT');
  const [currentDate, setCurrentDate] = useState<string>('12-09-2022');

  return (
    <>
      <Header activePage="diary" />
      <Box sx={{ marginTop: '70px', display: 'flex', justifyContent: 'center', gap: '40px' }}>
        <Stack gap="30px">
          <CustomCalendar />
          <Paper sx={{ width: '320px', paddingBottom: '10px' }}>
            <Stack sx={{ margin: '24px', paddingTop: '10px' }} gap="20px">
              <Typography sx={{ fontSize: '0.75rem', opacity: 0.6 }}>
                SET CALORIE GOAL AND WEIGHT
              </Typography>
              <TextField id="outlined-basic" label="Calorie goal" variant="outlined" />
              <Stack direction="row" gap="20px">
                <TextField id="outlined-basic" label="Weight" variant="outlined" />
                <TextField
                  id="outlined-basic"
                  label="Unit"
                  select
                  variant="outlined"
                  sx={{ width: '100px' }}
                >
                  <MenuItem key="KG" value="KG">
                    KG
                  </MenuItem>
                  <MenuItem key="LBS" value="LBS">
                    LBS
                  </MenuItem>
                </TextField>
              </Stack>
            </Stack>
            <Box sx={{ display: 'flex', padding: '8px' }}>
              <Button sx={{ width: '64px', marginLeft: 'auto' }}>Save</Button>
            </Box>
          </Paper>
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
            {/* {getDivider()}
                <FoodEntriesBox products={products} deleteFoodEntry={deleteFoodEntry} foodEntries={dayEntry.foodEntries} servingSizes={servingSizes}/> */}
          </Stack>
        </Paper>
      </Box>
    </>
  );
};
// export const CustomHeaderButton = styled.div<{isActive?:boolean}>`
//     border:none;
//     outline:none;
//     background:inherit;
//     font-weight: bold;
//     opacity: 50%;
//     padding: 10px;
//     cursor: pointer;
//     transition: 0.25s;

//     ${props => !props.isActive ? "" : "color: #ef9a44; opacity:100%;"}

//     &:hover{
//         color: #ef9a44;
//         opacity:100%;
//     }
// `;
