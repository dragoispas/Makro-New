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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tableCellClasses } from "@mui/material/TableCell";
import { RootState } from "../../../../../app/store";
import { setValue } from "../../../../../modules/search/currentSlice";
import { NumberFormatCustom } from "../../../../Helpers/Formatter";
import { ModuleWrapper } from "../../AddEditForm/AddEditFormStyle";
import { useProduct } from "../../../../../Hooks/useProduct";
import { useCurrent } from "../../../../../Hooks/useCurrent";

const ScrollableBox = styled(TableContainer)`
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  height: 300px;
`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "none",
    // backgroundColor: theme.palette.primary.main,
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
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
  const [advanced, setAdvanced] = useState(true);

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

  return (
    // <Box>
    <>
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

            if (!advanced && !field.mandatory) {
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
                  {field.label}
                  {field.unit && `(${field.unit})`}
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
    </>
  );
}
