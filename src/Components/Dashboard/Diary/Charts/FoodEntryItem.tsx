import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useEffect, useState } from "react";
import { FoodEntry } from "../../../../app/api/types";
import {
  useProductQuery,
  useRemoveFoodEntryMutation,
  useUpdateFoodEntryMutation,
} from "../../../../app/api/api";
import { UnitType, getFoodEntryQuantity, unitsForQuantity } from "../../../../app/units";
import { FlexBox } from "../../../UI/GeneralStyledComponents";
import { useSnackbar } from "notistack";
import { stringsToNumbers } from "../../../../app/helpers";
import {
  MacroNutrients,
  adjustMacrosFromReferenceAmount,
  adjustMacrosToQuantity,
} from "../../../../app/macroNutrients";
import { NumberFormatCustom } from "../../../Helpers/Formatter";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
};

interface FoodEntryItemProps {
  foodEntry: FoodEntry;
}

export function FoodEntryItem({ foodEntry }: FoodEntryItemProps) {
  const [removeFoodEntry] = useRemoveFoodEntryMutation();

  const [quantity, setQuantity] = useState<string>();
  const [quantityUnit, setQuantityUnit] = useState<UnitType>();
  const [macroNutrients, setMacroNutrients] = useState<MacroNutrients>(foodEntry.macroNutrients);

  const [updateFoodEntry] = useUpdateFoodEntryMutation();

  const handleQuantity = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuantity(e.target.value);

    const updatedMacroNutrients = adjustMacrosToQuantity(
      foodEntry.product.macroNutrients,
      parseFloat(e.target.value)
    );
    setMacroNutrients(updatedMacroNutrients);
  };

  // useEffect(() => {
  //   const updatedMacroNutrients = adjustMacrosToQuantity(
  //     foodEntry.product.macroNutrients,
  //     foodEntry.quantity
  //   );
  //   setMacroNutrients(updatedMacroNutrients);
  // }, [quantity]);

  // TODO: add the selected food in state in order to recalculate the macronutrients

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setQuantity(foodEntry.quantity.toString());
    setQuantityUnit(foodEntry.quantityUnit);
    setOpen(true);
  };

  const submitChanges = () => {
    updateFoodEntry({
      id: foodEntry.id,
      data: {
        quantity: parseFloat(quantity ?? "0"),
        quantityUnit: quantityUnit,
        macroNutrients: macroNutrients, // TODO: parse the updated macronutrients
      },
    });
    setOpen(false);
  };
  const handleClose = () => setOpen(false);

  return (
    <>
      <ListItemButton
        onClick={handleOpen}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ListItemAvatar>
          <Avatar>
            <RestaurantIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography sx={{ fontWeight: "600", height: "20px" }}>{foodEntry.name}</Typography>
          }
          secondary={
            <Typography sx={{ fontWeight: "400" }}>{`${getFoodEntryQuantity(foodEntry)} ${
              foodEntry.quantityUnit
            }`}</Typography>
          }
        />
        <ListItemText
          sx={{ textAlign: "end" }}
          primary={<Typography sx={{ height: "20px" }}>{macroNutrients.calories}</Typography>}
          secondary={<Typography>kcal</Typography>}
        />
      </ListItemButton>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Stack gap={2} m={3}>
                <Typography color={"text.primary"} variant="h6">
                  {foodEntry.name}
                </Typography>
                <Box sx={{ backgroundColor: "#f5f5f5", padding: "1rem", borderRadius: "4px" }}>
                  <Stack>
                    <Typography>{macroNutrients.calories} kcal</Typography>
                    <Typography>{macroNutrients.protein} protein</Typography>
                    <Typography>{macroNutrients.fat} fat</Typography>
                    <Typography>{macroNutrients.carbs} carbs</Typography>
                  </Stack>
                </Box>
                <Typography fontWeight={500} color={"text.primary"}>
                  Update Item
                </Typography>
                <FlexBox gap={2}>
                  <TextField
                    value={quantity}
                    onChange={handleQuantity}
                    sx={{ width: "68%" }}
                    label="Amount"
                    InputProps={{
                      inputComponent: NumberFormatCustom as never,
                    }}
                  ></TextField>
                  <TextField
                    value={quantityUnit}
                    onChange={(e) => setQuantityUnit(e.target.value as UnitType)}
                    label="Unit"
                    select
                    variant="outlined"
                    sx={{ width: "28%" }}
                  >
                    {unitsForQuantity.map((unit) => (
                      <MenuItem key={unit.type} value={unit.type}>
                        {unit.name}s
                      </MenuItem>
                    ))}
                  </TextField>
                </FlexBox>
                <TextField
                  label="Time"
                  type="time"
                  variant="outlined"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                />
              </Stack>
              <FlexBox justifyContent={"space-between"} m={"20px 9px 20px 15px"}>
                <Button onClick={() => removeFoodEntry(foodEntry)} color="error">
                  DELETE
                </Button>
                <FlexBox>
                  <Button
                    onClick={() => setOpen(false)}
                    sx={{ color: "custom.neutral", opacity: 0.5 }}
                  >
                    CANCEL
                  </Button>
                  <Button onClick={submitChanges}>SAVE</Button>
                </FlexBox>
              </FlexBox>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
