import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useState } from "react";
import { FoodEntry } from "../app/api/types";
import { useRemoveFoodEntryMutation } from "../app/api/api";

interface FoodEntryItemProps {
  foodEntry: FoodEntry;
}

export function FoodEntryItem({ foodEntry }: FoodEntryItemProps) {
  const [removeFoodEntry] = useRemoveFoodEntryMutation();
  const [makrosOpacity, setMakrosOpacity] = useState<number>(0);

  const getProtein = () => {
    if (foodEntry.servingSize === "g") {
      return foodEntry.macroNutrients.protein;
    }
    if (foodEntry.servingSize === "oz") {
      return Math.round(foodEntry.macroNutrients.protein * foodEntry.quantity * 28.3495);
    }
    if (foodEntry.servingSize === "lb") {
      return Math.round(foodEntry.macroNutrients.protein * foodEntry.quantity * 453.592);
    }
    return -1;
  };
  const getCarbs = () => {
    if (foodEntry.servingSize === "g") {
      return foodEntry.macroNutrients.carbs;
    }
    if (foodEntry.servingSize === "oz") {
      return Math.round(foodEntry.macroNutrients.carbs * foodEntry.quantity * 28.3495);
    }
    if (foodEntry.servingSize === "lb") {
      return Math.round(foodEntry.macroNutrients.carbs * foodEntry.quantity * 453.592);
    }
    return -1;
  };
  const getFat = () => {
    if (foodEntry.servingSize === "g") {
      return foodEntry.macroNutrients.fat;
    }
    if (foodEntry.servingSize === "oz") {
      return Math.round(foodEntry.macroNutrients.fat * foodEntry.quantity * 28.3495);
    }
    if (foodEntry.servingSize === "lb") {
      return Math.round(foodEntry.macroNutrients.fat * foodEntry.quantity * 453.592);
    }
    return -1;
  };

  return (
    <ListItem
      onMouseOver={() => setMakrosOpacity(1)}
      onMouseLeave={() => setMakrosOpacity(0)}
      sx={{
        borderTop: 1,
        borderColor: "divider",
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={() => removeFoodEntry(foodEntry)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar>
          <RestaurantIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={foodEntry.name}
        secondary={`${foodEntry.quantity} ${foodEntry.servingSize}`}
      />
      <ListItemText
        sx={{ textAlign: "end" }}
        primary={foodEntry.macroNutrients.calories}
        secondary="cal"
      />
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          position: "absolute",
          width: "24%",
          margin: "0 38%",
          height: "100%",
          opacity: makrosOpacity,
          transition: "0.15s",
        }}
      >
        <ListItemText
          sx={{ textAlign: "center", userSelect: "none" }}
          primaryTypographyProps={{ sx: { color: "#83b28d" } }}
          secondaryTypographyProps={{ sx: { color: "#83b28d" } }}
          primary={getProtein()}
          secondary="protein"
        />
        <ListItemText
          sx={{ textAlign: "center", userSelect: "none" }}
          primaryTypographyProps={{ sx: { color: "#EF4444" } }}
          secondaryTypographyProps={{ sx: { color: "#EF4444" } }}
          primary={getFat()}
          secondary="fat"
        />
        <ListItemText
          sx={{ textAlign: "center", userSelect: "none" }}
          primaryTypographyProps={{ sx: { color: "#ef9a44" } }}
          secondaryTypographyProps={{ sx: { color: "#ef9a44" } }}
          primary={getCarbs()}
          secondary="carbs"
        />
      </Stack>
    </ListItem>
  );
}
