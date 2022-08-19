import { Box, Paper, Container, Stack, InputBase, TextField, Typography, MenuItem } from '@mui/material'
import { DatePicker, DesktopDatePicker, LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import React, { useState } from 'react'
import { CustomCalendar } from '../Components/CustomCalendar'
import { DiaryChart } from '../Components/DiaryChart'
import { Header } from '../Components/Header'
import { Search } from '../Components/Search'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const DiaryPage:React.FC = () => {
  const [weight, setWeight] = useState<string>("WEIGHT");
  const [currentDate, setCurrentDate] = useState<string>("12-09-2022");


  return (
      <>
        <Header activePage='diary'/>
        <Box sx={{marginTop: "70px", display:"flex", justifyContent:"center", gap: "40px"}}>
          <Stack gap="30px">
            <CustomCalendar></CustomCalendar>
            <Paper sx={{width: "320px"}}>
              <Stack sx={{margin: "24px"}} gap="20px">
                <Typography sx={{fontSize:"0.75rem", opacity: 0.6}}>CALORIE GOAL AND WEIGHT</Typography>
                <TextField id="outlined-basic" label="Calorie goal" variant="outlined" />
                <Stack direction={"row"} gap="20px">
                  <TextField id="outlined-basic" label="Weight" variant="outlined" />
                  <TextField id="outlined-basic" label="Unit" select variant="outlined" sx={{width:"100px"}}>
                    <MenuItem key={"KG"} value={"KG"}>KG</MenuItem>
                    <MenuItem key={"LBS"} value={"LBS"}>LBS</MenuItem>
                  </TextField>
                </Stack>
              </Stack>
            </Paper>
          </Stack>
        
          <Paper sx={{height:"1000px", width:"800px"}}>
            <Stack sx={{alignItems:"center", position:"relative"}} p="50px">
                <Container sx={{width: "500px", height: "60px"}}></Container>
                <Search/>
                <DiaryChart targetCalories={2000} totalCalories={1500} totalCarbs={200} totalFat={34} totalProtein={178}/>
                {/* {getDivider()}
                <FoodEntriesBox products={products} deleteFoodEntry={deleteFoodEntry} foodEntries={dayEntry.foodEntries} servingSizes={servingSizes}/> */}
            </Stack>
          </Paper>
        </Box>
      </>
  )
}
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
