import React from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CreateChartModal from "../Components/CreateChartModal";
import { FlexBox } from "../Components/UI/GeneralStyledComponents";
import WeightChart from "../Components/WeightChart";

export default function TrendsPage() {
  return (
    <FlexBox
      alignItems="center"
      flexWrap={"wrap"}
      gap={8}
      sx={{ marginTop: "40px" }}
      flexDirection={["column", "row"]}
      centered="yAxis"
    >
      <WeightChart></WeightChart>
      {/* <CreateChartModal /> */}
    </FlexBox>
  );
}
