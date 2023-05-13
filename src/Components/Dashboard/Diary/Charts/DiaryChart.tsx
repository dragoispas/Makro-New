import { Box, CircularProgress, Stack, styled } from "@mui/material";
import { CaloriesChart } from "./CaloriesChart";
import { MakroLineChart } from "./MakroLineChart";

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

export const Row = styled(Stack)`
  flex-direction: row:
`;
export function DiaryChart({
  targetCalories,
  totalCalories,
  totalCarbs,
  totalFat,
  totalProtein,
}: Props) {
  return (
    <Row width={"400px"}>
      <CaloriesChart value={50}></CaloriesChart>
      <Stack gap={"10px"}>
        <MakroLineChart label="protein" value={50}></MakroLineChart>
        <MakroLineChart label="fat" value={50}></MakroLineChart>
        <MakroLineChart label="carbs" value={50}></MakroLineChart>
      </Stack>
    </Row>
  );
}
