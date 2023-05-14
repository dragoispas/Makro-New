import { Box, CircularProgress, Stack, styled } from "@mui/material";
import { MakroLineChart } from "./Charts/MakroLineChart";
import { FlexBox } from "../../../UI/GeneralStyledComponents";
import { CaloriesChart } from "./Charts/CaloriesChart";

const macroColors = {
  totalProtein: "#83b28d",
  totalFat: "#EF4444",
  totalCarbs: "#ef9a44",
};

interface Props {
  targetCalories: number;
  totalCalories: number;
  totalCarbs: number;
  totalFat: number;
  totalProtein: number;
}
export function DiaryChart({
  targetCalories,
  totalCalories,
  totalCarbs,
  totalFat,
  totalProtein,
}: Props) {
  return (
    <FlexBox centered="allAxis" style={{ width: "400px" }} gap={"40px"}>
      <CaloriesChart value={50}></CaloriesChart>
      <Stack gap={"20px"}>
        <MakroLineChart label="protein" value={50}></MakroLineChart>
        <MakroLineChart label="fat" value={50}></MakroLineChart>
        <MakroLineChart label="carbs" value={50}></MakroLineChart>
      </Stack>
    </FlexBox>
  );
}
