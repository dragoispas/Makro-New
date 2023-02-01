/* eslint-disable max-len */
import { Stack, Box, styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField, MenuItem, Button, Select, SelectChangeEvent, FormControl, InputLabel, Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { createFoodEntry } from '../../../Api/food-entries/api';
import { createProduct } from '../../../Api/products/api';
import { RootState } from '../../../app/store';
import { setAmount, setContent, setUnit } from '../../../modules/search/searchModalSlice';
import { NutritionDataTable } from './AddEntryFormComponents/NutritionDataTable';
import { NumberFormatCustom } from '../../Helpers/Formatter';

const Content = styled(Box)`
  width: 600px;
  height: 520px;
`;

const NutritionDataStack = styled(Stack)<{ isactive: boolean, themeMode: string }>`
transition: 0.15s;
  &:hover {
    border: 1;
    border-color: rgba(0,0,0,0);
    box-shadow: 0px 1px 4px rgba(0,0,0,0.5);
    ${(props) => (props.themeMode === 'dark' ? 'box-shadow: 0px 1px 5px rgba(0,0,0,0.7); background:rgba(250,250,250,0.04);' : '')}
    ${(props) => (props.themeMode === 'light' ? 'box-shadow: 0px 1px 4px rgba(0,0,0,0.5);' : '')}
  }

  ${(props) => (props.isactive && props.themeMode === 'light' ? `border: 1;
  border-color: rgba(0,0,0,0);
  box-shadow: 0px 1px 4px rgba(0,0,0,0.5);` : '')}

  ${(props) => (props.isactive && props.themeMode === 'dark' ? `border: 1;
  border-color: rgba(0,0,0,0);
  background:rgba(250,250,250,0.04);
  box-shadow: 0px 1px 5px rgba(0,0,0,0.7);` : '')}
`;

export function AddEditForm() {
  const dispatch = useDispatch();
  const dayEntry = useSelector((state: RootState) => state.diary.dayEntry);
  const { themeMode } = useSelector((state: RootState) => state.general);
  const input = useSelector((state: RootState) => state.searchModal.input);
  const product = useSelector((state: RootState) => state.searchModal.product);

  const amount = useSelector((state: RootState) => state.searchModal.amount);
  const [amountInputError, setAmountInputError] = useState<string>(' ');
  const unit = useSelector((state: RootState) => state.searchModal.unit);

  const calories = useSelector((state: RootState) => state.searchModal.calories);
  const fat = useSelector((state: RootState) => state.searchModal.fat);
  const satFat = useSelector((state: RootState) => state.searchModal.satFat);
  const carbs = useSelector((state: RootState) => state.searchModal.carbs);
  const fiber = useSelector((state: RootState) => state.searchModal.fiber);
  const sugar = useSelector((state: RootState) => state.searchModal.sugar);
  const protein = useSelector((state: RootState) => state.searchModal.protein);
  const sodium = useSelector((state: RootState) => state.searchModal.sodium);
  const potassium = useSelector((state: RootState) => state.searchModal.potassium);

  const { enqueueSnackbar } = useSnackbar();

  const getPercentage = (x: number, y: number) => (x * 100) / y;

  useEffect(() => {
    setAmountInputError(' ');
  }, [amount]);

  const onSaveClick = async () => {
    if (!dayEntry) {
      return;
    }

    if (!amount) {
      setAmountInputError('required');
      return;
    }

    let newProduct;

    if (!product) {
      newProduct = await createProduct({
        name: input,
        calories: parseFloat(calories ?? '0'),
        carbs: parseFloat(carbs ?? '0'),
        fat: parseFloat(fat ?? '0'),
        protein: parseFloat(protein ?? '0'),

        fiber: parseFloat(fiber ?? '0'),
        satFat: parseFloat(satFat ?? '0'),
        sugar: parseFloat(sugar ?? '0'),
        sodium: parseFloat(sodium ?? '0'),
        potassium: parseFloat(potassium ?? '0'),
      });
    }

    try {
      await createFoodEntry({
        dayEntryId: dayEntry.id,
        name: input,
        productId: product?.id ?? newProduct?.id,
        servingSize: unit,
        quantity: parseFloat(amount),

        calories: parseFloat(calories || '0'),
        fat: parseFloat(fat || '0'),
        carbs: parseFloat(carbs || '0'),
        protein: parseFloat(protein || '0'),
        fiber: parseFloat(fiber || '0'),
        satFat: parseFloat(satFat || '0'),
        sugar: parseFloat(sugar || '0'),
        sodium: parseFloat(sodium || '0'),
        potassium: parseFloat(potassium || '0'),
      });
      enqueueSnackbar('Dumnezeu este cu tine', { variant: 'success' });
    } catch (error) {
      console.log(error);
      enqueueSnackbar('Dumnezeu nu e cu tine', { variant: 'error' });
    }
  };

  return (
    <Content>
      <Box sx={{
        height: '470px', display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Typography>{product?.name}</Typography>

          <FormControl variant="standard" sx={{ m: 0, minWidth: 120 }}>
            <TextField
              error={amountInputError !== ' '}
              helperText={amountInputError}
              InputProps={{
                inputComponent: NumberFormatCustom as any,
              }}
              id="standard-basic"
              label="Amount"
              variant="standard"
              size="medium"
              sx={{ width: '200px' }}
              value={amount}
              onChange={(e) => dispatch(setAmount(e.target.value))}
            />
            {/* <InputLabel variant="standard" id="demo-simple-select-filled-label" /> */}
            <Select
              sx={{ width: '200px' }}
              size="medium"
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={unit}
              onChange={(e) => dispatch(setUnit((e.target.value)))}
              label="Unit"
              MenuProps={{
                disablePortal: true,
                style: { cursor: 'default' },
              }}
            >
              <MenuItem value="g">grams</MenuItem>
              <MenuItem value="oz">ounces</MenuItem>
              <MenuItem value="lbs">pounds</MenuItem>
            </Select>
          </FormControl>

        </Box>
        <NutritionDataTable />
      </Box>

      <Button
        onClick={onSaveClick}
        sx={{ width: '100%', marginTop: '5px' }}
      >
        ADD TO DIARY
      </Button>
    </Content>
  );
}
