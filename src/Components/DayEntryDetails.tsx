import { Box, Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCurrentDayEntry } from "../Hooks/useCurrentDayEntry";
import { useUpdateDayEntryMutation } from "../app/api/api";
import { enqueueSnackbar } from "notistack";

export default function DayEntryDetails() {
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<string>("");
  const [caloriesTarget, setCaloriesTarget] = useState<string>("");
  const dayEntry = useCurrentDayEntry();
  const [updateDayEntry, { isSuccess }] = useUpdateDayEntryMutation();

  useEffect(() => {
    if (dayEntry) {
      setWeight(dayEntry.weight?.toString() ?? "");
      setWeightUnit(dayEntry.weightUnit ?? "");
      setCaloriesTarget(dayEntry.caloriesTarget?.toString() ?? "");
    }
  }, [dayEntry]);

  const onSaveClick = async () => {
    if (dayEntry) {
      updateDayEntry({
        id: dayEntry.id,
        data: {
          weight: weight ? parseInt(weight) : null,
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
            onChange={(e) => setWeightUnit(e.target.value)}
          >
            <MenuItem key="KG" value="KG">
              KG
            </MenuItem>
            <MenuItem key="LBS" value="LBS">
              LBS
            </MenuItem>
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
