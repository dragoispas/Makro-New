import {
  Box,
  Button,
  ButtonBase,
  Container,
  Divider,
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
  MacroNutrients,
  MacroNutrientType,
} from "../../../../app/macroNutrients";
import { convertUnit, unitsForQuantity, UnitType } from "../../../../app/units";
import {
  clearSelectedProduct,
  setDiaryFormActive,
  setDiaryFormMacro,
} from "../../../../app/store/slices/searchSlice";
import { useAppDispatch } from "../../../../Hooks/useAppDispatch";
import { lineHeight, width } from "@mui/system";
import { CustomDivider, FlexBox } from "../../../UI/GeneralStyledComponents";
import { NumberFormatCustom } from "../../../Helpers/Formatter";
import EditIcon from "@mui/icons-material/Edit";
import { DiaryFormMacro } from "./DiaryFormMacro";
import { ReferenceAmount } from "./ReferenceAmount";
import { AddForm } from "./AddForm";

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
      <Box padding={"0px 35px"} height={"570px"}>
        <FlexBox justifyContent={"space-between"}>
          <FoodName>Banana</FoodName>
          <IconButton>
            <EditIcon></EditIcon>
          </IconButton>
        </FlexBox>
        <FlexBox gap={3} marginY={2}>
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
              ></DiaryFormMacro>
            );
          })}

          <CustomDivider bgcolor={"divider"} direction="vertical"></CustomDivider>
          <ReferenceAmount></ReferenceAmount>
        </FlexBox>

        <Box height={"30px"}></Box>
        <SubTitle>Add to Diary</SubTitle>
        <AddForm></AddForm>
      </Box>

      <Button onClick={onSaveClick} sx={{ width: "100%", marginTop: "5px" }}>
        + ADD TO DIARY
      </Button>
    </Wrapper>
  );
}
