import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Box,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { createFoodEntry } from "../../../Api/food-entries/api";
import { createProduct } from "../../../Api/products/api";
import { RootState } from "../../../app/store";
import { setAmount, setUnit } from "../../../modules/search/searchModalSlice";
import { NutritionDataTable } from "./AddEntryFormComponents/NutritionDataTable";
import { NumberFormatCustom } from "../../Helpers/Formatter";

const Scrollable = styled(Box)`
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled(Box)`
  width: 600px;
  height: 520px;
`;

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

export function AddEditForm() {
  const dispatch = useDispatch();
  const dayEntry = useSelector((state: RootState) => state.diary.dayEntry);
  const input = useSelector((state: RootState) => state.searchModal.input);
  const product = useSelector((state: RootState) => state.searchModal.product);

  const amount = useSelector((state: RootState) => state.searchModal.amount);
  const [amountInputError, setAmountInputError] = useState<string>(" ");
  const unit = useSelector((state: RootState) => state.searchModal.unit);

  const calories = useSelector((state: RootState) => state.searchModal.calories);
  const fat = useSelector((state: RootState) => state.searchModal.fat);
  const satFat = useSelector((state: RootState) => state.searchModal.satFat);
  const carbs = useSelector((state: RootState) => state.searchModal.carbs);
  const fiber = useSelector((state: RootState) => state.searchModal.fiber);
  const sugar = useSelector((state: RootState) => state.searchModal.sugar);
  const protein = useSelector((state: RootState) => state.searchModal.protein);
  const sodium = useSelector((state: RootState) => state.searchModal.sodium);
  const potassium = useSelector((state: RootState) => state.searchModal.potassium);

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

    if (!product) {
      newProduct = await createProduct({
        name: input,
        calories: calories,
        carbs: carbs,
        fat: fat,
        protein: protein,

        fiber: fiber,
        satFat: satFat,
        sugar: sugar,
        sodium: sodium,
        potassium: potassium,
      });
    }

    try {
      await createFoodEntry({
        dayEntryId: dayEntry.id,
        name: input,
        productId: product?.id ?? newProduct?.id,
        servingSize: unit,
        quantity: amount,

        calories: calories,
        carbs: carbs,
        fat: fat,
        protein: protein,
        fiber: fiber,
        satFat: satFat,
        sugar: sugar,
        sodium: sodium,
        potassium: potassium,
      });
      enqueueSnackbar("Dumnezeu este cu tine", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Dumnezeu nu e cu tine", { variant: "error" });
    }
  };

  return (
    <Content>
      <Box
        sx={{
          height: "470px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography>{product?.name}</Typography>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
            onChange={(e) => dispatch(setAmount(parseFloat(e.target.value)))}
          />
          <TextField
            select
            label="Unit"
            defaultValue="EUR"
            helperText=" "
            variant="standard"
            value={unit}
            SelectProps={{ MenuProps: { disablePortal: true, style: { cursor: "default" } } }}
          >
            {unitBaseOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Scrollable>
          <Box sx={{ height: "200px" }}>
            <NutritionDataTable />
          </Box>
        </Scrollable>
      </Box>

      <Button onClick={onSaveClick} sx={{ width: "100%", marginTop: "5px" }}>
        ADD TO DIARY
      </Button>
    </Content>
  );
}
