import { Box, Typography, InputBase } from "@mui/material";
import React, { useState } from "react";
import { setDiaryFormMacro } from "../../../../app/store/slices/searchSlice";
import { MacroNutrientType } from "../../../../app/macroNutrients";
import { useAppDispatch } from "../../../../Hooks/useAppDispatch";
import { NumberFormatCustom } from "../../../Helpers/Formatter";
import { RootState } from "../../../../app/store/store";
import { useSelector } from "react-redux";

interface Props {
  label: MacroNutrientType;
  value: string | undefined;
  onFieldDirtyChange: (isDirty: boolean) => void;
}

export function DiaryFormMacro({ label, value, onFieldDirtyChange }: Props) {
  const dispatch = useAppDispatch();
  const selectedProduct = useSelector((state: RootState) => state.search.selectedProduct);

  const capitalizeFirstLetter = (label: string) =>
    `${label.charAt(0).toUpperCase()}${label.slice(1)}`;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setDiaryFormMacro({ macroNutrient: label, value: e.target.value }));
    if (selectedProduct?.macroNutrients[label]?.toString() !== e.target.value) {
      onFieldDirtyChange(true);
    } else {
      onFieldDirtyChange(false);
    }
  };

  return (
    <Box textAlign="center">
      <Typography variant="subtitle1">{capitalizeFirstLetter(label)}</Typography>
      <InputBase
        value={value ?? 0}
        onChange={handleInputChange}
        placeholder="0"
        inputProps={{ style: { textAlign: "center" } }}
        sx={{ width: "50px", fontWeight: "500", fontSize: "1.15rem" }}
        inputComponent={NumberFormatCustom as never}
      />
    </Box>
  );
}
