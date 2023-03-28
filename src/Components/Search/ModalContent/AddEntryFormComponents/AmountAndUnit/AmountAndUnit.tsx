import { TextField, MenuItem } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import { NumberFormatCustom } from "../../../../Helpers/Formatter";
import { ModuleWrapper } from "../../AddEditForm/AddEditFormStyle";

const unitBaseOptions = [
  {
    value: "g",
    label: "grams",
  },
  {
    value: "oz",
    label: "ounces",
  },
  {
    value: "lbs",
    label: "pounds",
  },
];

export const AmountAndUnit = () => {
  const themeMode = useSelector(({ general }: RootState) => general.themeMode);
  const [amountInputError, setAmountInputError] = useState<string>(" ");
  const [amount, setAmount] = useState<number>(0);
  const [unit, setUnit] = useState<string>("g");
  return (
    <ModuleWrapper themeMode={themeMode}>
      <TextField
        error={amountInputError !== " "}
        helperText={amountInputError}
        InputProps={{
          inputComponent: NumberFormatCustom as never,
        }}
        id="standard-basic"
        label="Amount"
        variant="standard"
        size="medium"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <TextField
        select
        label="Unit"
        defaultValue="EUR"
        helperText=" "
        variant="standard"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        SelectProps={{ MenuProps: { disablePortal: true, style: { cursor: "default" } } }}
      >
        {unitBaseOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </ModuleWrapper>
  );
};
