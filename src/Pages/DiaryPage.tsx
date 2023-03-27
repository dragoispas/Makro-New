import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomCalendar from "../Components/CustomCalendar";
import { DiaryChart } from "../Components/DiaryChart";
import { FoodEntryList } from "../Components/FoodEntryList";
import { getDayEntryByDate } from "../Api/day-entries/api";
import { setDayEntry } from "../modules/diary/diarySlice";
import DayEntryDetails from "../Components/DayEntryDetails";
import { RootState } from "../app/store";
import { SearchModal } from "../Components/Search/SearchModal/SearchModal";

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
        <Typography sx={{ fontSize: "0.75rem", opacity: 0.6, marginTop: "10px" }}>
          LOG FOODS
        </Typography>
        <Stack sx={{ alignItems: "center", paddingTop: "20px" }}>
          <SearchModal />
          <DiaryChart
            targetCalories={dayEntry ? dayEntry.caloriesTarget : 2000}
            totalCalories={1500}
            totalCarbs={200}
            totalFat={34}
            totalProtein={178}
          />
          <Box sx={{ width: "100%" }}>
            <FoodEntryList />
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}
