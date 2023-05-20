import { MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../app/store/store";
import { NumberFormatCustom } from "../../../../Helpers/Formatter";
import { ModuleHeader, ModuleTitleStyle, ModuleWrapper } from "../../AddEditForm/AddEditFormStyle";
import { unitsForQuantity, UnitType } from "../../../../../app/units";

export const AmountAndUnit = () => {
  const themeMode = useSelector(({ general }: RootState) => general.themeMode);
  const [amountInputError] = useState<string>(" ");
  const [amount, setAmount] = useState<number>(0);
  const [unit, setUnit] = useState<UnitType>(UnitType.Gram);
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
            onChange={(e) => setUnit(e.target.value as UnitType)}
            SelectProps={{ MenuProps: { disablePortal: true, style: { cursor: "default" } } }}
          >
            {unitsForQuantity.map((unit) => (
              <MenuItem key={unit.type} value={unit.type}>
                {unit.name}s
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
    </ModuleWrapper>
  );
};
