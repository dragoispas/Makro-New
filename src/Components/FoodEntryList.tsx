import { List } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { FoodEntryItem } from './FoodEntryItem';
import { RootState } from '../app/store';

export function FoodEntryList() {
  const dayEntry = useSelector((state: RootState) => state.diary.dayEntry);
  return (
    <List dense sx={{ height: '350px' }}>
      {
        dayEntry?.foodEntries.map((foodEntry) => (
          <FoodEntryItem foodEntry={foodEntry} />
        ))
      }
    </List>
  );
}
