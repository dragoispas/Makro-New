import {
  InputBase,
  styled,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../app/store/store";
import { NumberFormatCustom } from "../../../../Helpers/Formatter";
import { ModuleHeader, ModuleTitleStyle, ModuleWrapper } from "../../AddEditForm/AddEditFormStyle";
import { StyledTableCell } from "./NutritionDataTableStyle";
import { TwoStateToggleButton } from "../../../../UI/TwoStateToggleButton";
import {
  setDiaryFormMacro,
  setDiaryFormReferenceAmount,
} from "../../../../../app/store/slices/searchSlice";
import { MacroNutrientType } from "../../../../../app/macroNutrients";

// why can't this be in a separate file?
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function NutritionDataTable() {
  const dispatch = useDispatch();
  const themeMode = useSelector(({ general }: RootState) => general.themeMode);
  const [mode, setMode] = useState("basic");
  const diaryForm = useSelector((state: RootState) => state.search.diaryForm);

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
  };

  type NutritionField = {
    name: MacroNutrientType;
    label: string;
    mandatory?: boolean;
    unit?: string;
  };

  const nutritionFields: NutritionField[] = [
    {
      name: "calories",
      label: "Calories",
      mandatory: true,
    },
    {
      name: "fat",
      label: "Total Fat",
      mandatory: true,
      unit: "g",
    },
    {
      name: "saturatedFat",
      label: "Sat Fat",
      unit: "g",
    },
    {
      name: "carbs",
      label: "Carbs",
      mandatory: true,
      unit: "g",
    },
    {
      name: "fiber",
      label: "Fiber",
      unit: "g",
    },
    {
      name: "sugar",
      label: "Sugar",
      unit: "g",
    },
    {
      name: "protein",
      label: "Protein",
      mandatory: true,
      unit: "g",
    },
    {
      name: "sodium",
      label: "Sodium",
      unit: "mg",
    },
    {
      name: "potassium",
      label: "Potassium",
      unit: "mg",
    },
  ];

  return (
    // <Box>
    <ModuleWrapper themeMode={themeMode}>
      <ModuleHeader>
        <Typography sx={ModuleTitleStyle} color={"primary"}>
          Nutrition Data
        </Typography>
        <TwoStateToggleButton
          value={mode}
          onChange={handleModeChange}
          options={[
            { value: "basic", label: "Basic" },
            { value: "advanced", label: "Advanced" },
          ]}
        />
      </ModuleHeader>
      <Table aria-label="sticky table" size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell padding="none" sx={{ paddingLeft: "12px" }}></StyledTableCell>
            <StyledTableCell align="right">
              <InputBase
                value={diaryForm.referenceAmount}
                onChange={(e) => dispatch(setDiaryFormReferenceAmount(e.target.value))}
                placeholder="0"
                size="small"
                sx={{ fontSize: "0.875rem" }}
                inputProps={{ style: { textAlign: "center" } }}
                inputComponent={NumberFormatCustom as never}
              />
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nutritionFields.map((field) => {
            const fieldValue = diaryForm.macroNutrients[field.name];

            if (mode == "basic" && !field.mandatory) {
              return;
            }
            return (
              <StyledTableRow
                key={field.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell
                  padding="none"
                  sx={{ paddingLeft: field.mandatory ? "12px" : "20px" }}
                  component="th"
                  scope="row"
                >
                  <Typography>
                    {field.label}
                    {field.unit && `(${field.unit})`}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="right">
                  <InputBase
                    key={field.name}
                    value={fieldValue ?? 0}
                    onChange={(e) =>
                      dispatch(
                        setDiaryFormMacro({ macroNutrient: field.name, value: e.target.value })
                      )
                    }
                    placeholder="0"
                    size="small"
                    sx={{ fontSize: "0.875rem" }}
                    inputProps={{ style: { textAlign: "center" } }}
                    inputComponent={NumberFormatCustom as never}
                  />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </ModuleWrapper>
  );
}
