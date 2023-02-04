import { List } from '@mui/material';
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FoodEntryItem } from './FoodEntryItem';
import { RootState } from '../app/store';
import { remove } from '../Api/food-entries/api';

import { setDayEntry } from '../modules/diary/diarySlice';
import { findOne } from '../Api/day-entries/api';
import { DayEntry } from '../Api/day-entries/types';

export function FoodEntryList() {
  const dayEntry = useSelector((state: RootState) => state.diary.dayEntry);

  const dispatch = useDispatch();
  console.log(dayEntry);

  // setItems((prev) => ([...prev, newItem]));

  // const removeItem = (itemID : number) => {
  //   // let newItems = [...items];
  //   // let index:number = getItemIndex(itemID);
  //   // newItems.splice(index, 1);
  //   // setItems(prev => (prev = newItems));
  //   setItems((prevItems) => prevItems.filter((item) => item.itemID !== itemID));
  // };

  const onDelete = async (id: number|string) => {
    try {
      await remove(id);
      // if (dayEntry) {
      //   dispatch(setDayEntry({
      //     ...dayEntry,
      //     foodEntries: dayEntry.foodEntries.filter((entry) => entry.id !== id),
      //   }));
      // }
      const newDayEntry = await findOne(Number(dayEntry?.id));
      dispatch(setDayEntry(newDayEntry));
    } catch (error) {
      console.log(error);
    }
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
