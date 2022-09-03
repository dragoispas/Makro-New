/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
import {
  ListItem, IconButton, ListItemAvatar, Avatar, ListItemText,
} from '@mui/material';
import { Stack } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useState } from 'react';

export const FoodEntryItem: React.FC = () => {
  const [makrosOpacity, setMakrosOpacity] = useState<number>(0);
  return (
    <ListItem
      sx={{
        borderTop: 1,
        borderColor: 'divider',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
      }}
      secondaryAction={(
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      )}
    >
      <ListItemAvatar>
        <Avatar>
          <RestaurantIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary="Food name" secondary="123 g" />
      <ListItemText sx={{ textAlign: 'end' }} primary="123" secondary="cal" />
      <Stack
        onMouseOver={() => setMakrosOpacity(1)}
        onMouseLeave={() => setMakrosOpacity(0)}
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{
          position: 'absolute',
          width: '24%',
          margin: '0 38%',
          height: '100%',
          opacity: makrosOpacity,
          transition: '0.15s',
        }}
      >
        <ListItemText
          sx={{ textAlign: 'center', userSelect: 'none' }}
          primaryTypographyProps={{ sx: { color: '#83b28d' } }}
          secondaryTypographyProps={{ sx: { color: '#83b28d' } }}
          primary="123"
          secondary="protein"
        />
        <ListItemText
          sx={{ textAlign: 'center', userSelect: 'none' }}
          primaryTypographyProps={{ sx: { color: '#EF4444' } }}
          secondaryTypographyProps={{ sx: { color: '#EF4444' } }}
          primary="123"
          secondary="fat"
        />
        <ListItemText
          sx={{ textAlign: 'center', userSelect: 'none' }}
          primaryTypographyProps={{ sx: { color: '#ef9a44' } }}
          secondaryTypographyProps={{ sx: { color: '#ef9a44' } }}
          primary="123"
          secondary="carbs"
        />
      </Stack>
    </ListItem>
  );
};
