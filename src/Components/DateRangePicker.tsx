import { LocalizationProvider } from "@mui/x-date-pickers";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function ResponsiveDateRangePickers() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateRangePicker
        defaultValue={[dayjs("2022-04-17"), dayjs("2022-04-21")]}
        // sx={{
        //   [`.${pickersLayoutClasses.contentWrapper}`]: {
        //     alignItems: 'center',
        //   },
        // }}
      />
    </LocalizationProvider>
  );
}

export {};
