import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useState } from "react";
import { FoodEntry } from "../../../../Api/food-entries/types";
import { FlexBox } from "../../../UI/GeneralStyledComponents.tsx";

interface FoodEntryItemProps {
  foodEntry: FoodEntry;
  onDelete: (id: number | string) => void;
}

export function FoodEntryItem({ foodEntry, onDelete }: FoodEntryItemProps) {
  return (
    <ListItem
      sx={{
        borderBottom: 1,
        borderColor: "divider",
        height: "60px",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <ListItemAvatar>
        <Avatar>
          <RestaurantIcon />
        </Avatar>
      </ListItemAvatar>
      <Typography>
        {foodEntry.name} - {foodEntry.quantity} {foodEntry.servingSize}
      </Typography>
      <ListItemText sx={{ textAlign: "end" }} primary={foodEntry.calories} secondary="cal" />
      <FlexBox centered="allAxis">
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon onClick={() => onDelete(foodEntry.id)} />
        </IconButton>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon onClick={() => onDelete(foodEntry.id)} />
        </IconButton>
      </FlexBox>
    </ListItem>
  );
}
