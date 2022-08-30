/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/function-component-definition */

import { List, ListItem, IconButton, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { FoodEntryItem } from './FoodEntryIten';

/* eslint-disable import/prefer-default-export */
export const FoodEntryList: React.FC = () => {
  function getFoodEntries(element: React.ReactElement) {
    return [0, 1, 2, 4, 5, 6].map((value) =>
      React.cloneElement(element, {
        key: value
      })
    );
  }
  return (
    <>
      <List dense sx={{ height: '350px' }}>
        {getFoodEntries(<FoodEntryItem />)}
      </List>
    </>
  );
};
