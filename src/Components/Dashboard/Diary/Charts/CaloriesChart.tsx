import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { textAlign } from "@mui/system";
import { useDayEntryByDateQuery } from "../../../../app/api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store/store";
import { useCurrentDayEntry } from "../../../../Hooks/useCurrentDayEntry";

interface Props {
  value: number;
}

export function CaloriesChart({ value }: Props) {
  const dayEntry = useCurrentDayEntry();

  const getTotalCalories = () => {
    let totalCalories = 0;
    dayEntry?.foodEntries.map((entry) => {
      totalCalories = totalCalories + entry.macroNutrients.calories;
    });
    return totalCalories;
  };

  const getTotalCaloriesPercentage = () => {
    return dayEntry ? (getTotalCalories() / dayEntry?.caloriesTarget) * 100 : 0;
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        style={{ opacity: 0.2 }}
        size={"10rem"}
        variant="determinate"
        value={100}
      ></CircularProgress>
      <CircularProgress
        style={{ position: "absolute" }}
        size={"10rem"}
        variant="determinate"
        value={getTotalCaloriesPercentage()}
      ></CircularProgress>
      {getTotalCaloriesPercentage() > 100 && (
        <CircularProgress
          style={{ position: "absolute" }}
          size={"10rem"}
          color={"error"}
          variant="determinate"
          value={getTotalCaloriesPercentage() - 100}
        ></CircularProgress>
      )}
      {/* <Stack style={{ position: "absolute" }}>
        <Typography textAlign={"center"} fontWeight={"bold"} fontSize={"0.9rem"}>
          1234
        </Typography>
        <Typography textAlign={"center"} fontWeight={"bold"} fontSize={"0.8rem"}>
          cal
        </Typography>
      </Stack> */}
      <Box textAlign="center" style={{ position: "absolute" }}>
        <Typography variant="subtitle1">Calories</Typography>
        <Typography variant="h6">{getTotalCalories()}</Typography>
      </Box>
    </div>
  );
}
