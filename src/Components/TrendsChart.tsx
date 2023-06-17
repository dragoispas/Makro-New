import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FlexBox } from "./UI/GeneralStyledComponents";

const chartTitleStyle = {
  textAlign: "center",
  width: "100%",
  marginBottom: 3,
  paddingTop: 1,
  fontWeight: 450,
  fontSize: "1rem",
};

export type DataItem = {
  date: string;
  [key: string]: number | string;
};

export enum ChartType {
  Line = "line",
  Bar = "bar",
}

interface Props {
  name: string;
  type: ChartType;
  data?: DataItem[];
  startDate: string;
  endDate: string;
  options?: {
    yAxis?: {
      label?: string;
      suffix?: string;
    };
  };
}

function TrendsChart({ name, type, data, startDate, endDate, options }: Props) {
  const chartTitleStyle = {
    textAlign: "center",
    width: "100%",
    marginBottom: 3,
    paddingTop: 1,
    fontWeight: 450,
    fontSize: "1rem",
  };

  const formattedData =
    data?.map((item) => {
      const formattedDate = formatDate(item.date);
      return {
        ...item,
        date: formattedDate,
      };
    }) ?? [];

  const firstItem = data ? data[0] : {};

  const renderChart = () => {
    if (type === ChartType.Line) {
      return (
        <LineChart
          style={{ transform: "translate(-15px, 10px)" }}
          width={500}
          height={300}
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3" />
          <XAxis dataKey="date" />
          <YAxis
            domain={["dataMin - 2", "dataMax + 2"]}
            tickFormatter={(value) => `${value} ${options?.yAxis?.suffix ?? ""}`}
          />
          <Legend></Legend>
          <Tooltip
            contentStyle={{
              border: "none",
              boxShadow: "0 0 20px rgba(0,0,0,0.3)",
              borderRadius: "10px",
            }}
            formatter={(value) => `${value} kg`}
          />
          {/* Render lines dynamically */}
          {Object.keys(firstItem).map((key) => {
            if (key !== "date") {
              return (
                <Line
                  key={key}
                  connectNulls
                  type="monotone"
                  dataKey={key}
                  name={options?.yAxis?.label ?? key}
                  stroke="#ee5b46"
                  activeDot={{ r: 6 }}
                  strokeWidth={2}
                />
              );
            }
            return null;
          })}
        </LineChart>
      );
    } else if (type === ChartType.Bar) {
      return (
        <BarChart
          style={{ transform: "translate(-15px, 10px)" }}
          width={500}
          height={300}
          data={data}
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
          {/* Render bars dynamically */}
          {Object.keys(firstItem).map((key) => {
            if (key !== "date") {
              return (
                <Bar
                  key={key}
                  dataKey={key}
                  name={key.charAt(0).toUpperCase() + key.slice(1)}
                  fill="#ee5b46"
                />
              );
            }
            return <div key={"adwadawdwa"}>Unsupported chart</div>;
          })}
        </BarChart>
      );
    }
    return <div>Unsupported chart</div>;
  };

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);
    return `${day} ${month}`;
  }

  return (
    <Paper sx={{ width: 800, height: 500, padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 1,
        }}
      >
        <FlexBox width={"100%"} centered="allAxis" direction="column" gap={1}>
          <Typography fontSize={"1.3rem"}>{name} chart</Typography>
          <Typography>
            <strong>{formatDate(startDate)}</strong> to <strong>{formatDate(endDate)}</strong>
          </Typography>
        </FlexBox>
      </Box>

      <ResponsiveContainer width="100%" height="80%">
        {renderChart()}
      </ResponsiveContainer>
    </Paper>
  );
}

export default TrendsChart;
