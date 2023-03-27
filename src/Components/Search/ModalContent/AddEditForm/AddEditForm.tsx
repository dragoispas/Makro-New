import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, MenuItem, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { createFoodEntry } from "../../../../Api/food-entries/api";
import { createProduct } from "../../../../Api/products/api";
import { RootState } from "../../../../app/store";
import { NutritionDataTable } from "../AddEntryFormComponents/NutritionDataTable";
import { NumberFormatCustom } from "../../../Helpers/Formatter";
import { useCurrent } from "../../../../Hooks/useCurrent";
import { Product } from "../../../../Api/products/types";
import { Scrollable, AddEntryFormBox } from "./AddEditFormStyle";

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

interface Props {
  product: Product;
}

export function AddEditForm({ product }: Props) {
  const dispatch = useDispatch();
  const themeMode = useSelector(({ general }: RootState) => general.themeMode);
  const dayEntry = useSelector((state: RootState) => state.diary.dayEntry);

  const [foodName, setFoodName] = useState<string>(""); // @TODO: way to edit this na dautomatically set if product is not new
  const [amount, setAmount] = useState<number>(0);
  const [unit, setUnit] = useState<string>("g");
  const [amountInputError, setAmountInputError] = useState<string>(" ");

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setAmountInputError(" ");
  }, [amount]);

  const onSaveClick = async () => {
    if (!dayEntry) {
      return;
    }

    if (!amount) {
      setAmountInputError("required");
      return;
    }

    let newProduct;

    if (product.isNew) {
      newProduct = await createProduct({
        name: foodName,
        calories: product.calories,
        carbs: product.carbs,
        fat: product.fat,
        protein: product.protein,

        fiber: product.fiber,
        satFat: product.satFat,
        sugar: product.sugar,
        sodium: product.sodium,
        potassium: product.potassium,
      });
    }

    try {
      await createFoodEntry({
        dayEntryId: dayEntry.id,
        name: foodName,
        productId: product?.id ?? newProduct?.id,
        servingSize: unit,
        quantity: amount,

        // Calculated values here
        calories: product.calories * 1,
        carbs: product.carbs,
        fat: product.fat,
        protein: product.protein,
        fiber: product.fiber,
        satFat: product.satFat,
        sugar: product.sugar,
        sodium: product.sodium,
        potassium: product.potassium,
      });
      enqueueSnackbar("Dumnezeu este cu tine", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Dumnezeu nu e cu tine", { variant: "error" });
    }
  };

  return (
    <Box>
      <Typography
        fontSize={20}
        sx={{ height: "50px", width: "100%", display: "flex", justifyContent: "center" }}
      >
        {product?.name}
      </Typography>
      <Scrollable
        sx={{
          height: "520px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          padding: "0px 10px",
          // boxShadow: "0px 0px 5px black",
        }}
      >
        <AddEntryFormBox themeMode={themeMode}>
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
        </AddEntryFormBox>
        {/* <Scrollable> */}
        <AddEntryFormBox themeMode={themeMode}>
          <NutritionDataTable />
        </AddEntryFormBox>
        <AddEntryFormBox themeMode={themeMode}>
          <NutritionDataTable />
        </AddEntryFormBox>

        {/* </Scrollable> */}
      </Scrollable>

      <Button onClick={onSaveClick} sx={{ width: "100%", marginTop: "5px" }}>
        ADD TO DIARY
      </Button>
    </Box>
  );
}
