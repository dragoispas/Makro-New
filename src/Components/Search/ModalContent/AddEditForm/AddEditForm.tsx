import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { NutritionDataTable } from "../AddEntryFormModules/NutritionDataTable/NutritionDataTable";
import { FoodName, ModulesContainer, SubTitle, Wrapper } from "./AddEditFormStyle";
import { AmountAndUnit } from "../AddEntryFormModules/AmountAndUnit/AmountAndUnit";
import { FoodOverview } from "../AddEntryFormModules/Overview/FoodOverview";
import { useCurrentDayEntry } from "../../../../Hooks/useCurrentDayEntry";
import { useCreateFoodEntryMutation, useCreateProductMutation } from "../../../../app/api/api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store/store";
import { stringsToNumbers } from "../../../../app/helpers";
import { Product } from "../../../../app/api/types";
import {
  adjustMacrosFromReferenceAmount,
  adjustMacrosToQuantity,
  MacroNutrients,
  MacroNutrientType,
} from "../../../../app/macroNutrients";
import { convertUnit, unitsForQuantity, UnitType } from "../../../../app/units";
import {
  clearSelectedProduct,
  setDiaryFormActive,
  setDiaryFormMacro,
  setDiaryFormName,
} from "../../../../app/store/slices/searchSlice";
import { useAppDispatch } from "../../../../Hooks/useAppDispatch";
import { lineHeight, width } from "@mui/system";
import { CustomDivider, FlexBox } from "../../../UI/GeneralStyledComponents";
import EditIcon from "@mui/icons-material/Edit";
import { DiaryFormMacro } from "./DiaryFormMacro";
import { ReferenceAmount } from "./ReferenceAmount";
import { AddForm } from "./AddForm";
import { useState } from "react";

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

export function AddEditForm() {
  const dispatch = useAppDispatch();
  const dayEntry = useCurrentDayEntry();
  const selectedProduct = useSelector((state: RootState) => state.search.selectedProduct);
  const diaryForm = useSelector((state: RootState) => state.search.diaryForm);

  const [isFoodDirty, setIsFoodDirty] = useState(false);

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
      parseInt(diaryForm.referenceAmount)
    );

    const updatedMacroNutrients = adjustMacrosToQuantity(
      macroNutrients,
      parseInt(diaryForm.quantity)
    );

    const associatedProduct: Product =
      selectedProduct ?? (await createProductFromDiaryForm(macroNutrients));

    console.log(diaryForm.quantity);
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
        macroNutrients: updatedMacroNutrients,
      });

      enqueueSnackbar("Food entry saved!", { variant: "success" });

      dispatch(setDiaryFormActive(false));
      dispatch(clearSelectedProduct());
    } catch (error) {
      console.error("Failed to create food entry", error);
      enqueueSnackbar("Failed to save food entry", { variant: "error" });
    }
  };

  const handleFoodNameChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setDiaryFormName(e.target.value));
    console.log(selectedProduct?.name);
    console.log(e.target.value);
    if (selectedProduct?.name !== e.target.value) {
      setIsFoodDirty(true);
    } else {
      setIsFoodDirty(false);
    }
  };

  const handleFoodFieldDirtyChange = (isDirty: boolean) => {
    // Use the isDirty value in the parent component
    setIsFoodDirty(isDirty);
  };

  const backgroundColor = isFoodDirty ? "customBackground.success" : "customBackground.neutral";
  // TODO: change the color of the backround when editing something (to primary when editing, then to green when clicked on checkmark button, also provide undo button)
  return (
    <Wrapper>
      <Stack justifyContent={"space-between"} height={"615px"}>
        <Box padding={"0px 35px"}>
          <Box
            sx={{
              backgroundColor: backgroundColor,
              padding: "1rem",
              transition: "background-color 0.2s ease",
            }}
          >
            <FlexBox justifyContent={"space-between"}>
              <FoodName
                placeholder="Food name"
                value={diaryForm.name}
                onChange={handleFoodNameChange}
              ></FoodName>
            </FlexBox>
            <FlexBox gap={3} marginY={2} justifyContent={"space-between"} width={"100%"}>
              {nutritionFields.map((field) => {
                const fieldValue = diaryForm.macroNutrients[field.name];

                if (!field.mandatory) {
                  return;
                }
                return (
                  <DiaryFormMacro
                    key={field.label}
                    label={field.name}
                    value={fieldValue}
                    onFieldDirtyChange={handleFoodFieldDirtyChange}
                  ></DiaryFormMacro>
                );
              })}

              <CustomDivider bgcolor={"divider"} direction="vertical"></CustomDivider>
              <ReferenceAmount></ReferenceAmount>
            </FlexBox>
          </Box>
          <Box height={"30px"}></Box>
          <SubTitle>Add to Diary</SubTitle>
          <AddForm></AddForm>
        </Box>

        <Box marginBottom={"4px"}>
          <Button onClick={onSaveClick} sx={{ width: "100%" }}>
            ADD TO DIARY
          </Button>
        </Box>
      </Stack>
    </Wrapper>
  );
}
