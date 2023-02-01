import { List } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FoodEntryItem } from './FoodEntryItem';
import { RootState } from '../app/store';
import { remove } from '../Api/food-entries/api';

export function FoodEntryList() {
  const dayEntry = useSelector((state: RootState) => state.diary.dayEntry);
  console.log(dayEntry);

  const onDelete = async (id: number|string) => {
    await remove(id);
  };
  const getFoodEntries = useMemo(() => dayEntry?.foodEntries.map((entry) => (
    <React.Fragment key={entry.id}>
      <FoodEntryItem onDelete={onDelete} foodEntry={entry} />
    </React.Fragment>
  )), [dayEntry]);

  return (
    <List dense sx={{ height: '350px' }}>
      {getFoodEntries}
    </List>
  );
}
