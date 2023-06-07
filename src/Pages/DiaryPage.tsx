import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import CustomCalendar from "../Components/CustomCalendar";
import DayEntryDetails from "../Components/DayEntryDetails";
import { SearchModal } from "../Components/Search/SearchModal/SearchModal";
import { RootState } from "../app/store/store";
import { useSelector } from "react-redux";
import { setSelectedDate } from "../app/store/slices/diarySlice";
import { useAppDispatch } from "../Hooks/useAppDispatch";
import { useCurrentDayEntry } from "../Hooks/useCurrentDayEntry";
import moment from "moment";
import { DiaryChart } from "../Components/Dashboard/Diary/Charts/DiaryChart";
import { FlexBox } from "../Components/UI/GeneralStyledComponents";
import { FoodEntryList } from "../Components/Dashboard/Diary/Charts/FoodEntryList";

export default function DiaryPage() {
  const dispatch = useAppDispatch();
  const selectedDate = useSelector((state: RootState) => state.diary.selectedDate);
  const dayEntry = useCurrentDayEntry();

  return (
    <Box
      sx={{
        marginTop: "15px",
        display: "flex",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      <Stack gap="30px">
        <CustomCalendar
          date={moment(selectedDate, "YYYY-MM-DD").toDate()}
          onChange={(newDate: Date | null) => {
            if (newDate) {
              dispatch(setSelectedDate(moment(newDate).format("YYYY-MM-DD")));
            }
          }}
        />
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
