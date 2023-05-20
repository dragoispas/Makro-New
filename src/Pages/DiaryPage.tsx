import { Box, Stack, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDayEntryByDate } from "../Api/day-entries/api";
import CustomCalendar from "../Components/Dashboard/Calendar/CustomCalendar";
import DayEntryDetails from "../Components/Dashboard/DayEntryDetails";
import { FoodEntryList } from "../Components/Dashboard/Diary/FoodEntries/FoodEntryList";
import { SearchModal } from "../Components/Dashboard/Search/SearchModal/SearchModal";
import { RootState } from "../app/store";
import { setDayEntry } from "../modules/diary/diarySlice";
import { DiaryChart } from "../Components/Dashboard/Diary/Charts/DiaryChart";
import { FlexBox } from "../Components/UI/GeneralStyledComponents";

export default function DiaryPage() {
  const dispatch = useDispatch();
  const dayEntry = useSelector((state: RootState) => state.diary.dayEntry);

  useEffect(() => {
    getDayEntryByDate(new Date()).then((dayEntryy) => {
      dispatch(setDayEntry(dayEntryy));
    });
  }, []);

  useEffect(() => {
    console.log(dayEntry);
    console.log(dayEntry?.foodEntries);
  }, [dayEntry]);

  return (
    <Box
      sx={{
        marginTop: "30px",
        display: "flex",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      <Stack gap="30px">
        <CustomCalendar />
        <DayEntryDetails />
      </Stack>

      <Paper sx={{ height: "785px", width: "600px", padding: "24px" }}>
        <Typography sx={{ fontSize: "0.75rem", opacity: 0.6, marginTop: "10px" }}>DIARY</Typography>
        <Stack sx={{ alignItems: "center", paddingTop: "20px" }}>
          <SearchModal />
          <Box height={"20px"}></Box>
          <FlexBox centered="allAxis" zIndex={1} p={2}>
            <DiaryChart
              targetCalories={dayEntry ? dayEntry.caloriesTarget : 2000}
              totalCalories={1500}
              totalCarbs={200}
              totalFat={34}
              totalProtein={178}
            />
          </FlexBox>
          <Box height={"20px"}></Box>
          <Box sx={{ width: "100%" }}>
            <FoodEntryList />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
