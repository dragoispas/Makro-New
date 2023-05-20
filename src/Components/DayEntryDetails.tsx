import { Box, Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCurrentDayEntry } from "../Hooks/useCurrentDayEntry";
import { useUpdateDayEntryMutation } from "../app/api/api";
import { enqueueSnackbar } from "notistack";
import { convertUnit, getDayEntryWeight, unitsForWeight, UnitType } from "../app/units";

export default function DayEntryDetails() {
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<UnitType>(UnitType.Kilogram);
  const [caloriesTarget, setCaloriesTarget] = useState<string>("");
  const dayEntry = useCurrentDayEntry();
  const [updateDayEntry, { isSuccess }] = useUpdateDayEntryMutation();

  useEffect(() => {
    if (dayEntry) {
      setWeight(getDayEntryWeight(dayEntry)?.toString() ?? "");
      setWeightUnit(dayEntry.weightUnit ?? UnitType.Kilogram);
      setCaloriesTarget(dayEntry.caloriesTarget?.toString() ?? "");
    }
  }, [dayEntry]);

  const onSaveClick = async () => {
    if (dayEntry) {
      let newWeight: number | null = null;
      if (weight && weightUnit) {
        newWeight = convertUnit(parseInt(weight), weightUnit, UnitType.Kilogram);
      } else if (weight) {
        newWeight = parseInt(weight);
      }

      updateDayEntry({
        id: dayEntry.id,
        data: {
          weight: newWeight,
          weightUnit: weightUnit || null,
          caloriesTarget: parseInt(caloriesTarget),
        },
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("Saved!", {
        variant: "success",
      });
    }
  }, [isSuccess]);

  return (
    <Paper sx={{ width: "320px", paddingBottom: "10px" }}>
      <Stack sx={{ margin: "24px", paddingTop: "10px" }} gap="20px">
        <Typography sx={{ fontSize: "0.75rem", opacity: 0.6 }}>
          SET CALORIE GOAL AND WEIGHT
        </Typography>
        <TextField
          id="outlined-basic"
          label="Calorie goal"
          variant="outlined"
          value={caloriesTarget}
          onChange={(e) => setCaloriesTarget(e.target.value)}
        />
        <Stack direction="row" gap="20px">
          <TextField
            id="outlined-basic"
            label="Weight"
            variant="outlined"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Unit"
            select
            variant="outlined"
            sx={{ width: "100px" }}
            value={weightUnit}
            onChange={(e) => setWeightUnit(e.target.value as UnitType)}
          >
            {unitsForWeight.map((unit) => (
              <MenuItem key={unit.type} value={unit.type}>
                {unit.type}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Stack>
      <Box sx={{ display: "flex", padding: "8px" }}>
        <Button sx={{ width: "64px", marginLeft: "auto" }} onClick={onSaveClick}>
          Save
        </Button>
      </Box>
    </Paper>
  );
}
