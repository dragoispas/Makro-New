import { Stack, TextField, MenuItem } from "@mui/material";
import { unitsForQuantity } from "../../../../app/units";
import { NumberFormatCustom } from "../../../Helpers/Formatter";
import { FlexBox } from "../../../UI/GeneralStyledComponents";
import { useAppDispatch } from "../../../../Hooks/useAppDispatch";
import { RootState } from "../../../../app/store/store";
import { useSelector } from "react-redux";
import { setDiaryFormQuantity } from "../../../../app/store/slices/searchSlice";

export function AddForm() {
  const dispatch = useAppDispatch();
  const diaryForm = useSelector((state: RootState) => state.search.diaryForm);
  return (
    <form>
      <Stack gap={3} marginY={2}>
        <FlexBox justifyContent={"space-between"}>
          <TextField
            label="Amount"
            InputProps={{
              inputComponent: NumberFormatCustom as never,
            }}
            id="standard-basic"
            variant="outlined"
            sx={{ width: "68%" }}
            value={diaryForm.quantity}
            onChange={(e) => dispatch(setDiaryFormQuantity(e.target.value))}
          />
          <TextField
            label="Unit"
            select
            variant="outlined"
            sx={{ width: "28%" }}
            SelectProps={{ MenuProps: { disablePortal: true, style: { cursor: "default" } } }}
          >
            {unitsForQuantity.map((unit) => (
              <MenuItem key={unit.type} value={unit.type}>
                {unit.name}s
              </MenuItem>
            ))}
          </TextField>
        </FlexBox>
        <TextField
          label="Time"
          type="time"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
        />
      </Stack>
    </form>
  );
}