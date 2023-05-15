import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { NutritionDataTable } from "../AddEntryFormModules/NutritionDataTable/NutritionDataTable";
import { ModulesContainer, Wrapper } from "./AddEditFormStyle";
import { AmountAndUnit } from "../AddEntryFormModules/AmountAndUnit/AmountAndUnit";
import { FoodOverview } from "../AddEntryFormModules/Overview/FoodOverview";
import { useCurrentDayEntry } from "../../../../Hooks/useCurrentDayEntry";
import { useCreateFoodEntryMutation, useCreateProductMutation } from "../../../../app/api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store/store";
import { stringsToNumbers } from "../../../../app/helpers";
import { Product } from "../../../../app/api/types";

export function AddEditForm() {
  const dayEntry = useCurrentDayEntry();
  const selectedProduct = useSelector((state: RootState) => state.search.selectedProduct);
  const diaryForm = useSelector((state: RootState) => state.search.diaryForm);

  const [createProduct] = useCreateProductMutation();
  const [createFoodEntry] = useCreateFoodEntryMutation();

  const { enqueueSnackbar } = useSnackbar();

  const createProductFromDiaryForm = (): Promise<Product> => {
    return createProduct({
      name: diaryForm.name,
      macroNutrients: stringsToNumbers(diaryForm.macroNutrients),
    }).unwrap();
  };

  const onSaveClick = async () => {
    if (!dayEntry) {
      return;
    }

    const associatedProduct: Product = selectedProduct ?? (await createProductFromDiaryForm());

    try {
      await createFoodEntry({
        dayEntryId: dayEntry.id,
        name: diaryForm.name,
        productId: associatedProduct.id,
        servingSize: "g", // @TODO: pass actual data here
        quantity: 0,

        // Calculated values here
        macroNutrients: stringsToNumbers(diaryForm.macroNutrients),
      });
      enqueueSnackbar("Food entry saved!", { variant: "success" });
    } catch (error) {
      console.error("Failed to create food entry", error);
      enqueueSnackbar("Failed to save food entry", { variant: "error" });
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
