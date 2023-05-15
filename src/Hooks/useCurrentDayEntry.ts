import { DayEntry } from "../app/api/types";
import { useDayEntryByDateQuery } from "../app/api/api";
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";

/**
 * Use the current Day Entry that was selected by the user in the main Diary page UI.
 */
export function useCurrentDayEntry(): DayEntry | undefined {
  const selectedDate = useSelector((state: RootState) => state.diary.selectedDate);
  const { data: dayEntry } = useDayEntryByDateQuery(selectedDate);
  return dayEntry;
}
