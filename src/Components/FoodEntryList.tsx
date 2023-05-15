import { List } from "@mui/material";
import React from "react";
import { FoodEntryItem } from "./FoodEntryItem";
import { useCurrentDayEntry } from "../Hooks/useCurrentDayEntry";

export function FoodEntryList() {
  const dayEntry = useCurrentDayEntry();

  return (
    <List dense sx={{ height: "350px" }}>
      {dayEntry?.foodEntries.map((entry) => (
        <FoodEntryItem key={entry.id} foodEntry={entry} />
      ))}
    </List>
  );
}
