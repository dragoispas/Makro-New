import { Box, Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { RootState } from "../../app/store";
import { updateDateEntry } from "../../Api/day-entries/api";

export default function DayEntryDetails() {
  const [weight, setWeight] = useState<string>("");
  const [weightUnit, setWeightUnit] = useState<string>("");
  const [caloriesTarget, setCaloriesTarget] = useState<string>("");
  const dayEntry = useSelector((state: RootState) => state.diary.dayEntry);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (dayEntry) {
      setWeight(dayEntry.weight?.toString() ?? "");
      setWeightUnit(dayEntry.weightUnit ?? "");
      setCaloriesTarget(dayEntry.caloriesTarget?.toString() ?? "");
    }
  }, [dayEntry]);

  const onSaveClick = async () => {
    if (dayEntry) {
      try {
        await updateDateEntry(dayEntry.id, {
          weight: parseInt(weight, 10),
          weightUnit,
          caloriesTarget: parseInt(caloriesTarget, 10),
        });
        enqueueSnackbar("No hai ca s-a salvat cu succes", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar("O picat serverul", { variant: "error" });
      }
    }
  };

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