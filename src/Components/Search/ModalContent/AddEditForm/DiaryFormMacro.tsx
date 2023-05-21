import { Box, Typography, InputBase } from "@mui/material";
import React from "react";
import { setDiaryFormMacro } from "../../../../app/store/slices/searchSlice";
import { MacroNutrientType } from "../../../../app/macroNutrients";
import { useAppDispatch } from "../../../../Hooks/useAppDispatch";

interface Props {
  label: MacroNutrientType;
  value: string | undefined;
}

export function DiaryFormMacro({ label, value }: Props) {
  const dispatch = useAppDispatch();

  const capitalizeFirstLetter = (label: string) =>
    `${label.charAt(0).toUpperCase()}${label.slice(1)}`;

  return (
    <Box textAlign="center">
      <Typography variant="subtitle1">{capitalizeFirstLetter(label)}</Typography>
      <InputBase
        value={value ?? 0}
        onChange={(e) =>
          dispatch(setDiaryFormMacro({ macroNutrient: label, value: e.target.value }))
        }
        placeholder="0"
        inputProps={{ style: { textAlign: "center" } }}
        sx={{ width: "50px", fontWeight: "500", fontSize: "1.15rem" }}
      />
    </Box>
  );
}
