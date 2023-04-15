import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, MenuItem, TextField, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { createFoodEntry } from "../../../../Api/food-entries/api";
import { createProduct } from "../../../../Api/products/api";
import { RootState } from "../../../../app/store";
import { NutritionDataTable } from "../AddEntryFormModules/NutritionDataTable/NutritionDataTable";
import { NumberFormatCustom } from "../../../Helpers/Formatter";
import { useCurrent } from "../../../../Hooks/useCurrent";
import { Product } from "../../../../Api/products/types";
import {
  ScrollableBox,
  ModuleWrapper,
  ModulesContainer,
  Wrapper,
  ModuleTitleStyle,
} from "./AddEditFormStyle";
import { AmountAndUnit } from "../AddEntryFormModules/AmountAndUnit/AmountAndUnit";
import { FoodOverview } from "../AddEntryFormModules/Overview/FoodOverview";

interface Props {
  product: Product;
}

export function AddEditForm({ product }: Props) {
  const themeMode = useSelector(({ general }: RootState) => general.themeMode);
  const dayEntry = useSelector((state: RootState) => state.diary.dayEntry);

  const [foodName, setFoodName] = useState<string>(""); // @TODO: way to edit this na dautomatically set if product is not new
  const [current, setCurrent] = useCurrent();

  const { enqueueSnackbar } = useSnackbar();

  const onSaveClick = async () => {
    if (!dayEntry) {
      return;
    }

    let newProduct;

    if (product.isNew) {
      newProduct = await createProduct({
        name: foodName,
        calories: current.calories,
        carbs: current.carbs,
        fat: current.fat,
        protein: current.protein,

        fiber: current.fiber,
        satFat: current.satFat,
        sugar: current.sugar,
        sodium: current.sodium,
        potassium: current.potassium,
      });
    }

    try {
      await createFoodEntry({
        dayEntryId: dayEntry.id,
        name: foodName,
        productId: product?.id ?? newProduct?.id,
        servingSize: "g", // @TODO: pass actual data here
        quantity: 0,

        // Calculated values here
        calories: current.calories,
        carbs: current.carbs,
        fat: current.fat,
        protein: current.protein,
        fiber: current.fiber,
        satFat: current.satFat,
        sugar: current.sugar,
        sodium: current.sodium,
        potassium: current.potassium,
      });
      enqueueSnackbar("Dumnezeu este cu tine", { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Dumnezeu nu e cu tine", { variant: "error" });
    }
  };

  return (
    <Wrapper>
      <ModulesContainer>
        {/* Components that will be in the AddEditForm @TODO: add visible and enable*/}
        <FoodOverview />
        <AmountAndUnit />

        <NutritionDataTable />
      </ModulesContainer>

      <Button onClick={onSaveClick} sx={{ width: "100%", marginTop: "5px" }}>
        + ADD TO DIARY
      </Button>
    </Wrapper>
  );
}