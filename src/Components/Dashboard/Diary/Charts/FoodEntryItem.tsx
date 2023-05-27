import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Fade,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useState } from "react";
import { FoodEntry } from "../../../../app/api/types";
import { useRemoveFoodEntryMutation } from "../../../../app/api/api";
import { getFoodEntryQuantity } from "../../../../app/units";

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
  p: 4,
};

interface FoodEntryItemProps {
  foodEntry: FoodEntry;
}

export function FoodEntryItem({ foodEntry }: FoodEntryItemProps) {
  const [removeFoodEntry] = useRemoveFoodEntryMutation();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
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
          primary={
            <Typography sx={{ height: "20px" }}>{foodEntry.macroNutrients.calories}</Typography>
          }
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
              <Typography
                color={"text.primary"}
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {foodEntry.name}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
}
