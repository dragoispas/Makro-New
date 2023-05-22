import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import { FlexBox } from "../../../UI/GeneralStyledComponents";
import { useCurrentDayEntry } from "../../../../Hooks/useCurrentDayEntry";

interface Props {
  value: number;
  label: string;
}

export function MakroLineChart({ value, label }: Props) {
  const dayEntry = useCurrentDayEntry();

  // Temp, just for testing
  const getTotalMacro = () => {
    let totalMacro = 0;
    dayEntry?.foodEntries.map((entry) => {
      if (label === "Protein") {
        totalMacro = totalMacro + entry.macroNutrients.protein;
      }
      if (label === "Fat") {
        totalMacro = totalMacro + entry.macroNutrients.fat;
      }
      if (label === "Carbs") {
        totalMacro = totalMacro + entry.macroNutrients.carbs;
      }
    });
    return totalMacro;
  };

  const getColor = () => {
    if (label === "Protein") {
      return "red";
    }
    if (label === "Fat") {
      return "orange";
    }
    if (label === "Carbs") {
      return "green";
    }
  };
  return (
    <FlexBox centered="xAxis" gap={0.5}>
      <Box height={"37px"} width={"1px"} bgcolor={getColor()}></Box>
      <Box sx={{ transform: "translate(0px, -2px)" }}>
        <Typography height={"22px"} variant="subtitle1" fontSize={"0.95rem"}>
          {label}
        </Typography>
        <Typography height={"25px"} variant="h6" fontSize={"1.15rem"}>
          {getTotalMacro()}
        </Typography>
      </Box>
    </FlexBox>
  );
}
