import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

export const CustomFoodIcon = styled(LocalDiningIcon)`
  background: rgba(150, 150, 150, 0.2);
  border-radius: 50%;
  padding: 5px;
  opacity: 0.9;
`;

interface Props {
  name: string;
  calories: number;
}

export function SearchListItem({ name, calories }: Props) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <CustomFoodIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
        <Typography>{calories} kcal</Typography>
      </ListItemButton>
    </ListItem>
  );
}
