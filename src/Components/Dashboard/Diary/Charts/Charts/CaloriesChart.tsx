import { CircularProgress, Stack, Typography } from "@mui/material";
import { textAlign } from "@mui/system";

interface Props {
  value: number;
}

export function CaloriesChart({ value }: Props) {
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
        value={value}
      ></CircularProgress>
      {value > 100 && (
        <CircularProgress
          style={{ position: "absolute" }}
          size={"10rem"}
          color={"error"}
          variant="determinate"
          value={value - 100}
        ></CircularProgress>
      )}
      <Stack style={{ position: "absolute" }}>
        <Typography textAlign={"center"} fontWeight={"bold"} fontSize={"0.9rem"}>
          1234
        </Typography>
        <Typography textAlign={"center"} fontWeight={"bold"} fontSize={"0.8rem"}>
          cal
        </Typography>
      </Stack>
    </div>
  );
}
