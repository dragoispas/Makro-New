import {
  InputBase,
  Table,
  TableBody,
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  ToggleButton,
  tableClasses,
  ToggleButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tableCellClasses } from "@mui/material/TableCell";
import { RootState } from "../../../../../app/store";
import { setValue } from "../../../../../modules/search/currentSlice";
import { NumberFormatCustom } from "../../../../Helpers/Formatter";
import { ModuleHeader, ModuleTitleStyle, ModuleWrapper } from "../../AddEditForm/AddEditFormStyle";
import { useProduct } from "../../../../../Hooks/useProduct";
import { useCurrent } from "../../../../../Hooks/useCurrent";
import { StyledTableCell } from "./NutritionDataTableStyle";
import ManageSearchOutlinedIcon from "@mui/icons-material/ManageSearchOutlined";
import TwoStateToggleButton from "./TwoStateToggleButton";

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
  const [amount, setAmount] = useState<number>(100);
  const [unit, setUnit] = useState();
  const [product] = useProduct();
  const [current, setCurrent] = useCurrent();
  const themeMode = useSelector(({ general }: RootState) => general.themeMode);
  const [mode, setMode] = useState("basic");

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
  };

  const nutritionValues = useSelector((state: RootState) => state.search);

  const amountInGrams = () => {
    if (amount) {
      if (unit === "oz") {
        return amount * 28.3495;
      }
      if (unit === "lbs") {
        return amount * 453.592;
      }
    }
    return amount ? amount : 0;
  };

  const getTableAmount = () => {
    if (unit !== "g") {
      return `${amount ? amount : 0} ${unit} (${amountInGrams()} g)`;
    }
    return `${amount ? amount : 0} g`;
  };

  type NutritionField = {
    name: string;
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
      name: "satFat",
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

  useEffect(() => {
    console.log(mode);
  }, [mode]);

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
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                placeholder="0"
                size="small"
                sx={{ fontSize: "0.875rem" }}
                inputProps={{ style: { textAlign: "center" } }}
                inputComponent={NumberFormatCustom as any}
              />
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nutritionFields.map((field) => {
            const fieldValue = nutritionValues[field.name as keyof typeof nutritionValues];

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
                      dispatch(setValue({ name: field.name, value: e.target.value }))
                    }
                    placeholder="0"
                    size="small"
                    sx={{ fontSize: "0.875rem" }}
                    inputProps={{ style: { textAlign: "center" } }}
                    inputComponent={NumberFormatCustom as any}
                  />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* <Box
        sx={{
          background: "#ee5b46",
          color: "White",
          borderRadius: "0px 0px 10px 10px",
          padding: "5px",
        }}
      >
        Toggle
      </Box> */}
    </ModuleWrapper>
  );
}
