import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { CustomCalendar } from '../Components/CustomCalendar';
import { DiaryChart } from '../Components/DiaryChart';
import { Search } from '../Components/Search';

export const DiaryPage: React.FC = () => {
  const [weight, setWeight] = useState<string>('WEIGHT');
  const [currentDate, setCurrentDate] = useState<string>('12-09-2022');

  function getFoodEntries(element: React.ReactElement) {
    return [0, 1, 2, 4, 5, 6].map((value) =>
      React.cloneElement(element, {
        key: value
      })
    );
  }

  return (
    <>
      {/* <Header activePage='diary'/> */}
      <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '40px' }}>
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
                  sx={{ width: '100px' }}>
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
            <Box sx={{ width: '100%' }}>
              <List dense sx={{ height: '350px' }}>
                {getFoodEntries(
                  <ListItem
                    sx={{ borderTop: 1, borderColor: 'divider' }}
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    }>
                    <ListItemAvatar>
                      <Avatar>
                        <RestaurantIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Food name" secondary="123 g" />
                    <ListItemText sx={{ textAlign: 'end' }} primary="123" secondary="cal" />
                  </ListItem>
                )}
              </List>
            </Box>
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
