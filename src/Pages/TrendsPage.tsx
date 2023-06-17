import React from "react";
import { FlexBox } from "../Components/UI/GeneralStyledComponents";
import TrendsChart, { ChartType, DataItem } from "../Components/TrendsChart";
import { useFoodEntryDailyStatsQuery } from "../app/api/api";

export default function TrendsPage() {
  const { data: dailyStats } = useFoodEntryDailyStatsQuery({
    startDate: "2023-01-01",
    endDate: "2023-08-01",
  });

  return (
    <FlexBox
      alignItems="center"
      flexWrap={"wrap"}
      gap={8}
      sx={{ marginTop: "40px" }}
      flexDirection={["column", "row"]}
      centered="yAxis"
    >
      <TrendsChart
        name="Calories"
        type={ChartType.Line}
        data={dailyStats}
        startDate="2023-01-01"
        endDate="2023-08-01"
        options={{ yAxis: { label: "Calories" } }}
      ></TrendsChart>
      {/* <CreateChartModal /> */}
    </FlexBox>
  );
}
// name: string;
//   type: ChartType;
//   data: DataItem[];
//   startDate: string;
//   endDate: string;
