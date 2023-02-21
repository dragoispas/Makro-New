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

const OuterBorder = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 412px;
  // width: 210px;
  // border: 1px solid rgba(0, 0, 0, 0.6);
  // &:hover {
  //   border-color: rgba(0, 0, 0, 0.9);
  // }
  // border-radius: 5px;
`;

const TableWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  // height: 410px;
  // width: 210px;
  border: 1px solid;
  transition: 0.15s;
  border: 1px solid white;
  &:hover {
    border-color: rgba(0, 0, 0, 0.9);
  }
  border-radius: 5px;
`;

export function NutritionDataTable() {
  const dispatch = useDispatch();
  const amount = useSelector((state: RootState) => state.searchModal.amount);
  const unit = useSelector((state: RootState) => state.searchModal.unit);
  const product = useSelector((state: RootState) => state.searchModal.product);

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
    <OuterBorder>
      <TableWrapper>
        <Typography sx={{ margin: "5px", fontWeight: "500", fontSize: "0.875rem" }}>
          Nutrition Facts
        </Typography>

        <TableContainer component={Box} sx={{ width: "280px" }}>
          <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell padding="none" sx={{ paddingLeft: "2px" }}>
                  Serving size
                </TableCell>
                <TableCell align="right">
                  <InputBase
                    key="100g"
                    value={`100 g`}
                    // onChange={(e) => dispatch(setCalories(e.target.value))}
                    placeholder="0"
                    size="small"
                    sx={{ fontSize: "0.875rem", fontWeight: "500" }}
                    inputProps={{ style: { textAlign: "center" } }}
                    inputComponent={NumberFormatCustom as any}
                  />
                </TableCell>
                <TableCell align="right">
                  <InputBase
                    key="amount"
                    value={amount}
                    // onChange={(e) => dispatch(setCalories(e.target.value))}
                    placeholder="0"
                    size="small"
                    sx={{ fontSize: "0.875rem", fontWeight: "500" }}
                    inputProps={{ style: { textAlign: "center" } }}
                    inputComponent={NumberFormatCustom as any}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nutritionFields.map((field) => {
                const fieldValue = nutritionValues[field.name as keyof typeof nutritionValues];

                return (
                  <TableRow
                    key={field.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
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
                        value={fieldValue === "0" ? "" : fieldValue}
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
                        value={fieldValue === "0" ? "" : fieldValue}
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
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>
    </OuterBorder>
  );
}
