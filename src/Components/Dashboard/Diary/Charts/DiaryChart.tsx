import { Box, CircularProgress, Stack, styled } from "@mui/material";
import { MakroLineChart } from "./MakroLineChart";
import { FlexBox } from "../../../UI/GeneralStyledComponents";
import { CaloriesChart } from "./CaloriesChart";
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
      <Box sx={{ width: "53.07px" }}></Box>
      <CaloriesChart value={50}></CaloriesChart>
      <Stack gap={"10px"}>
        <MakroLineChart label="Protein" value={50}></MakroLineChart>
        <MakroLineChart label="Fat" value={50}></MakroLineChart>
        <MakroLineChart label="Carbs" value={50}></MakroLineChart>
      </Stack>
    </FlexBox>
  );
}
