import { ButtonBase, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FoodMenuAction } from "../../../../app/api/types";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";

interface Props {
  onItemClick: (item: FoodMenuAction) => void;
}

export function FoodMenu({ onItemClick }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item: FoodMenuAction) => {
    onItemClick(item);
    handleCloseMenu();
  };

  return (
    <div>
      <ButtonBase disableRipple onClick={handleOpenMenu}>
        <MoreVertIcon />
      </ButtonBase>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ transform: "translate(50px, 0px)" }}
      >
        <MenuItem onClick={() => handleMenuItemClick(FoodMenuAction.Copy)}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Create Custom Food</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleMenuItemClick(FoodMenuAction.Delete)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Food</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
