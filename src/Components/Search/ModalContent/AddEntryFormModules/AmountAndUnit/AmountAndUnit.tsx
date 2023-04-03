import { TextField, MenuItem, Typography, Stack } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import { NumberFormatCustom } from "../../../../Helpers/Formatter";
import { ModuleHeader, ModuleTitleStyle, ModuleWrapper } from "../../AddEditForm/AddEditFormStyle";

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
      <ModuleHeader>
        <Typography sx={ModuleTitleStyle} color={"primary"}>
          Add to diary
        </Typography>
      </ModuleHeader>
      <div style={{ padding: "10px", display: "flex", justifyContent: "space-between" }}>
        <Typography>Amount</Typography>
        <div>
          <TextField
            error={amountInputError !== " "}
            InputProps={{
              inputComponent: NumberFormatCustom as never,
            }}
            id="standard-basic"
            variant="standard"
            size="small"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
          />
          <TextField
            sx={{ width: "100px" }}
            select
            defaultValue="EUR"
            variant="standard"
            size="small"
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
        </div>
      </div>
      <div style={{ padding: "10px", display: "flex", justifyContent: "space-between" }}>
        <Typography>Timestamp</Typography>
        <div>
          <TextField
            variant="standard"
            select
            SelectProps={{ MenuProps: { disablePortal: true, style: { cursor: "default" } } }}
          ></TextField>
        </div>
      </div>
    </ModuleWrapper>
  );
};
