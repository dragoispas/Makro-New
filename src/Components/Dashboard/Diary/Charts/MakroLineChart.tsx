import { LinearProgress, Stack, Typography } from "@mui/material";

interface Props {
  value: number;
  label: string;
}

export function MakroLineChart({ value, label }: Props) {
  const getColor = () => {
    if (label === "protein") {
      return "primary";
    }
    if (label === "fat") {
      return "warning";
    }
    if (label === "carbs") {
      return "secondary";
    }
  };
  return (
    <Stack>
      <Typography
        style={{ zIndex: "1" }}
        fontWeight={"bold"}
        fontSize={"0.8rem"}
      >{`${value}g ${label}`}</Typography>
      <LinearProgress
        color={getColor()}
        sx={{ width: "200px" }}
        variant="determinate"
        value={value}
      ></LinearProgress>
      <LinearProgress
        color={getColor()}
        sx={{ width: "200px" }}
        variant="determinate"
        value={value}
      ></LinearProgress>
    </Stack>
  );
}
