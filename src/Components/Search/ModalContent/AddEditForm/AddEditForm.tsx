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
import { adjustMacrosFromReferenceAmount, MacroNutrients } from "../../../../app/macroNutrients";
import { convertUnit, UnitType } from "../../../../app/units";
import { clearSelectedProduct, setDiaryFormActive } from "../../../../app/store/slices/searchSlice";
import { useAppDispatch } from "../../../../Hooks/useAppDispatch";

export function AddEditForm() {
  const dispatch = useAppDispatch();
  const dayEntry = useCurrentDayEntry();
  const selectedProduct = useSelector((state: RootState) => state.search.selectedProduct);
  const diaryForm = useSelector((state: RootState) => state.search.diaryForm);

  const [createProduct] = useCreateProductMutation();
  const [createFoodEntry] = useCreateFoodEntryMutation();

  const { enqueueSnackbar } = useSnackbar();

  const createProductFromDiaryForm = (macroNutrients: MacroNutrients): Promise<Product> => {
    return createProduct({
      name: diaryForm.name,
      macroNutrients,
    }).unwrap();
  };

  const onSaveClick = async () => {
    if (!dayEntry) {
      return;
    }

    const macroNutrients: MacroNutrients = adjustMacrosFromReferenceAmount(
      stringsToNumbers(diaryForm.macroNutrients),
      parseFloat(diaryForm.referenceAmount)
    );

    const associatedProduct: Product =
      selectedProduct ?? (await createProductFromDiaryForm(macroNutrients));

    try {
      await createFoodEntry({
        dayEntryId: dayEntry.id,
        name: diaryForm.name,
        productId: associatedProduct.id,
        quantity: convertUnit(
          parseFloat(diaryForm.quantity),
          diaryForm.quantityUnit,
          UnitType.Gram
        ),
        quantityUnit: diaryForm.quantityUnit,
        macroNutrients,
      });

      enqueueSnackbar("Food entry saved!", { variant: "success" });

      dispatch(setDiaryFormActive(false));
      dispatch(clearSelectedProduct());
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
