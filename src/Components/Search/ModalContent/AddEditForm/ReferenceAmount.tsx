import { Stack, Box, InputBase, Select, MenuItem } from "@mui/material";
import { UnitType, unitsForQuantity } from "../../../../app/units";
import { FlexBox } from "../../../UI/GeneralStyledComponents";
import { useAppDispatch } from "../../../../Hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { setDiaryFormReferenceAmount } from "../../../../app/store/slices/searchSlice";
import { RootState } from "../../../../app/store/store";

export function ReferenceAmount() {
  const dispatch = useAppDispatch();
  const diaryForm = useSelector((state: RootState) => state.search.diaryForm);
  return (
    <FlexBox>
      <Stack textAlign="center" justifyContent={"space-between"}>
        <Box height={"5px"}></Box>
        <InputBase
          placeholder="0"
          inputProps={{ style: { textAlign: "center" } }}
          sx={{ width: "50px", fontWeight: "500", fontSize: "1.15rem" }}
          value={diaryForm.referenceAmount}
          onChange={(e) => dispatch(setDiaryFormReferenceAmount(e.target.value))}
        ></InputBase>
      </Stack>
      <Stack textAlign="center" justifyContent={"space-between"}>
        <Box height={"5px"}></Box>
        <Select
          MenuProps={{ disablePortal: true, style: { cursor: "default" } }}
          input={
            <InputBase
              inputProps={{ style: { textAlign: "center" } }}
              sx={{ width: "50px", fontWeight: "500", fontSize: "1.15rem" }}
            ></InputBase>
          }
          value={UnitType.Gram}
        >
          {unitsForQuantity.map((unit) => (
            <MenuItem key={unit.type} value={unit.type}>
              {unit.type}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </FlexBox>
  );
}
