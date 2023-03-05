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
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { setNutritionValue } from "../../../../modules/search/searchModalSlice";
import { NumberFormatCustom } from "../../../Helpers/Formatter";

const Scrollable = styled(TableContainer)`
  ::-webkit-scrollbar {
    display: none;
  }
`;

export function NutritionDataTable() {
  const dispatch = useDispatch();
  const amount = useSelector((state: RootState) => state.searchModal.amount);
  const unit = useSelector((state: RootState) => state.searchModal.unit);
  const product = useSelector((state: RootState) => state.searchModal.product);
  const themeMode = useSelector(({ general }: RootState) => general.themeMode);

  const calories = useSelector((state: RootState) => state.searchModal.calories);
  const fat = useSelector((state: RootState) => state.searchModal.fat);
  const satFat = useSelector((state: RootState) => state.searchModal.satFat);
  const carbs = useSelector((state: RootState) => state.searchModal.carbs);
  const fiber = useSelector((state: RootState) => state.searchModal.fiber);
  const sugar = useSelector((state: RootState) => state.searchModal.sugar);
  const protein = useSelector((state: RootState) => state.searchModal.protein);
  const sodium = useSelector((state: RootState) => state.searchModal.sodium);
  const potassium = useSelector((state: RootState) => state.searchModal.potassium);
  const nutritionValues = useSelector((state: RootState) => state.searchModal);

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
    calculated: number;
    label: string;
    mandatory?: boolean;
    unit?: string;
  };

  const nutritionFields: NutritionField[] = [
    {
      name: "calories",
      calculated: 0,
      label: "Calories",
      mandatory: true,
    },
    {
      name: "fat",
      calculated: 0,
      label: "Total Fat",
      mandatory: true,
      unit: "g",
    },
    {
      name: "satFat",
      calculated: 0,
      label: "Sat Fat",
      unit: "g",
    },
    {
      name: "carbs",
      calculated: 0,
      label: "Carbs",
      mandatory: true,
      unit: "g",
    },
    {
      name: "fiber",
      calculated: 0,
      label: "Fiber",
      unit: "g",
    },
    {
      name: "sugar",
      calculated: 0,
      label: "Sugar",
      unit: "g",
    },
    {
      name: "protein",
      calculated: 0,
      label: "Protein",
      mandatory: true,
      unit: "g",
    },
    {
      name: "sodium",
      calculated: 0,
      label: "Sodium",
      unit: "mg",
    },
    {
      name: "potassium",
      calculated: 0,
      label: "Potassium",
      unit: "mg",
    },
  ];

  return (
    // <Box>
    <Scrollable sx={{ maxHeight: "100%" }}>
      <Table stickyHeader aria-label="sticky table" size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="none" sx={{ paddingLeft: "2px" }}>
              Serving size
            </TableCell>
            <TableCell align="right">
              <Typography align="center">100 g</Typography>
            </TableCell>
            <TableCell align="right">
              {/* <InputBase
                    key="amount"
                    value={amount}
                    // onChange={(e) => dispatch(setCalories(e.target.value))}
                    placeholder="0"
                    size="small"
                    sx={{ fontSize: "0.875rem", fontWeight: "500" }}
                    inputProps={{ style: { textAlign: "center" } }}
                    inputComponent={NumberFormatCustom as any}
                  /> */}
              <Typography align="center" sx={{ textAlign: "center" }}>
                {getTableAmount()}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nutritionFields.map((field) => {
            const fieldValue = nutritionValues[field.name as keyof typeof nutritionValues];

            return (
              <TableRow key={field.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell
                  padding="none"
                  sx={{ paddingLeft: field.mandatory ? "2px" : "10px" }}
                  component="th"
                  scope="row"
                >
                  {field.label}
                  {field.unit && `(${field.unit})`}
                </TableCell>
                <TableCell align="right">
                  <InputBase
                    key={field.name}
                    value={fieldValue ?? 0}
                    onChange={(e) =>
                      dispatch(setNutritionValue({ name: field.name, value: e.target.value }))
                    }
                    placeholder="0"
                    size="small"
                    sx={{ fontSize: "0.875rem" }}
                    inputProps={{ style: { textAlign: "center" } }}
                    inputComponent={NumberFormatCustom as any}
                  />
                </TableCell>
                <TableCell align="right">
                  <InputBase
                    key={field.name}
                    value={field.calculated}
                    placeholder="0"
                    size="small"
                    sx={{ fontSize: "0.875rem" }}
                    inputProps={{ style: { textAlign: "center" } }}
                    inputComponent={NumberFormatCustom as any}
                  />
                  {/* <Typography align="center">{calculatedFieldValue ?? 0}</Typography> */}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Scrollable>
  );
}
