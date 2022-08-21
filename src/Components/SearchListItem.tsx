import { ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { CustomFoodIcon } from './Search';

interface Props {
  name: string;
  calories: number;
}

export const SearchListItem: React.FC<Props> = ({ name, calories }) => {
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
};
