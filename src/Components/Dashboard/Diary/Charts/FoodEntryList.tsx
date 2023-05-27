import { List, Typography } from "@mui/material";
import React from "react";
import { FoodEntryItem } from "./FoodEntryItem";
import { useCurrentDayEntry } from "../../../../Hooks/useCurrentDayEntry";

export function FoodEntryList() {
  const dayEntry = useCurrentDayEntry();

  return (
    <>
      <List dense sx={{ height: "350px" }}>
        <Typography
          color={"text.secondary"}
          p={1}
          sx={{ borderBottom: "1px solid", borderColor: "divider" }}
        >
          12:30 PM
        </Typography>
        {dayEntry?.foodEntries.map((entry) => (
          <FoodEntryItem key={entry.id} foodEntry={entry} />
        ))}
      </List>
    </>
  );
}
