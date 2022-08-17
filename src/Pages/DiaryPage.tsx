import { Box, Paper, Container, Stack, InputBase, TextField } from '@mui/material'
import React, { useState } from 'react'
import { DiaryChart } from '../Components/DiaryChart'
import { Header } from '../Components/Header'
import { Search } from '../Components/Search'

export const DiaryPage:React.FC = () => {
  const [weight, setWeight] = useState<string>("WEIGHT");
  return (
      <>
        <Header activePage='diary'/>
        <Paper sx={{margin:"60px auto", height:"1000px", width:"800px"}}>
          <Stack direction={"row"} sx={{paddingLeft:"3px", paddingRight:"3px", justifyContent:"space-between"}}>
            <InputBase value={"12-10-2022"} inputProps={{style: {cursor:"pointer"}}}></InputBase>
            <InputBase value={"TARGET: 2000 CAL"} inputProps={{style: {textAlign: 'center', cursor:"pointer"}}}></InputBase>
            <InputBase onChange={e=> setWeight(e.target.value)} value={weight} inputProps={{style: {textAlign: 'right', cursor:"pointer"}}}></InputBase>
          </Stack>
                <Stack sx={{alignItems:"center", position:"relative"}} p="50px">
                    <Container sx={{width: "500px", height: "60px"}}></Container>
                    <Search/>
                    <DiaryChart targetCalories={2000} totalCalories={1500} totalCarbs={200} totalFat={34} totalProtein={178}/>
                    {/* {getDivider()}
                    <FoodEntriesBox products={products} deleteFoodEntry={deleteFoodEntry} foodEntries={dayEntry.foodEntries} servingSizes={servingSizes}/> */}
                </Stack>
            
        </Paper>
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
