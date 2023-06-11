import React, { useState } from "react";
import { Paper, Typography, Box, IconButton } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import EditIcon from "@mui/icons-material/Edit";
import EditChartModal from "./EditChartModal";
import { FlexBox } from "./UI/GeneralStyledComponents";
const weightChartData = [
  {
    date: "4 May",
    weight: 79,
    calories: 2400,
  },
  {
    date: "5 May",
    weight: 78,
    calories: 2210,
  },
  {
    date: "6 May",
    weight: 77.8,
    calories: 2290,
  },
  {
    date: "7 May",
    weight: 77.9,
    calories: 2000,
  },
  {
    date: "8 May",
    weight: 77.6,
    calories: 2181,
  },
  {
    date: "9 May",
    weight: 77.3,
    calories: 2500,
  },
  {
    date: "10 May",
    weight: 77.5,
    calories: 2100,
  },
  {
    date: "11 May",
    weight: 77.2,
    calories: 2100,
  },
  {
    date: "12 May",
    weight: 77.1,
    calories: 2100,
  },
  {
    date: "13 May",
    weight: 76.8,
    calories: 2100,
  },
  {
    date: "14 May",
    weight: 76.9,
    calories: 2100,
  },
];

const chartTitleStyle = {
  textAlign: "center",
  width: "100%",
  marginBottom: 3,
  paddingTop: 1,
  fontWeight: 450,
  fontSize: "1rem",
};

interface ChartData {
  name: string;
  Weight: number;
  // Add other data properties if needed
}

const WeightChart: React.FC = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleOnCloseEdit = () => {
    setIsEdit(false);
  };
  const handleOpenEdit = () => {
    setIsEdit(true);
  };
  return (
    <Paper sx={{ width: 800, height: 500, padding: "20px" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <FlexBox width={"100%"} centered="xAxis" justifyContent={"space-between"}>
          <Box sx={{ width: "50px" }} />
          <Typography sx={chartTitleStyle}>
            Weight progression from <strong>4 May</strong> to <strong>14 May</strong>
          </Typography>
          <Box sx={{ width: "50px" }}>
            <IconButton onClick={handleOpenEdit}>
              <EditIcon />
            </IconButton>
          </Box>
        </FlexBox>
      </Box>

      <ResponsiveContainer width="100%" height="80%">
        <LineChart
          style={{ transform: "translate(-15px, 10px)" }}
          width={500}
          height={300}
          data={weightChartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3" />
          <XAxis dataKey="date" />
          <YAxis domain={["dataMin - 2", "dataMax + 2"]} tickFormatter={(value) => `${value} kg`} />
          <Tooltip
            contentStyle={{
              border: "none",
              boxShadow: "0 0 20px rgba(0,0,0,0.3)",
              borderRadius: "10px",
            }}
            formatter={(value) => `${value} kg`}
          />
          <Line
            connectNulls
            type="monotone"
            dataKey="weight"
            stroke="#ee5b46"
            activeDot={{ r: 6 }}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
      <EditChartModal
        open={isEdit}
        onClose={handleOnCloseEdit}
        options={["weight", "average weight"]}
      ></EditChartModal>
    </Paper>
  );
};

export default WeightChart;
