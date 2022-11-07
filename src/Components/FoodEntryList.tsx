import { List } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { FoodEntryItem } from './FoodEntryItem';
import { RootState } from '../app/store';
import { remove } from '../Api/food-entries/api';
import { setDayEntry } from '../modules/diary/diarySlice';
import { DayEntry } from '../Api/day-entries/types';

export function FoodEntryList() {
  const dayEntry = useSelector((state: RootState) => state.diary.dayEntry);

  const onDelete = async (id: number|string) => {
    await remove(id);
  };
  return (
    <List dense sx={{ height: '350px' }}>
      {
        dayEntry?.foodEntries.map((foodEntry) => (
          <FoodEntryItem onDelete={onDelete} foodEntry={foodEntry} />
        ))
      }
    </List>
  );
}
