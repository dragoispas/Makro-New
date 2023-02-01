/* eslint-disable max-len */
import { Stack, Box, styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField, MenuItem, Button, Select, SelectChangeEvent, FormControl, InputLabel, Typography,
} from '@mui/material';
import { createFoodEntry } from '../../../Api/food-entries/api';
import { createProduct } from '../../../Api/products/api';
import { RootState } from '../../../app/store';
import { setAmount, setContent, setUnit } from '../../../modules/search/searchModalSlice';
import { NutritionDataTable } from './AddEntryFormComponents/NutritionDataTable';
import { setNotification } from '../../../modules/general/generalSlice';
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

  const [calories, setCalories] = useState<string>('');
  const [fat, setFat] = useState<string>('');
  const [saturatedFat, setSaturatedFat] = useState<string>('');
  const [carbs, setCarbs] = useState<string>('');
  const [fiber, setFiber] = useState<string>('');
  const [sugar, setSugar] = useState<string>('');
  const [protein, setProtein] = useState<string>('');
  const [sodium, setSodium] = useState<string>('');
  const [potassium, setPotassium] = useState<string>('');

  const [productQuantity, setProductQuantity] = useState<string>('');
  const [foodEntryQuantity, setFoodEntryQuantity] = useState<string>('');
  const [foodEntryServingSize, setFoodEntryServingSize] = useState<string>('g');

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
        calories: parseFloat(calories) / parseFloat(productQuantity),
        carbs: parseFloat(carbs) / parseFloat(productQuantity),
        fat: parseFloat(fat) / parseFloat(productQuantity),
        protein: parseFloat(protein) / parseFloat(productQuantity),

        fiber: parseFloat(fiber) / parseFloat(productQuantity),
        saturatedFat: parseFloat(saturatedFat) / parseFloat(productQuantity),
        sugar: parseFloat(sugar) / parseFloat(productQuantity),
        sodium: parseFloat(sodium) / parseFloat(productQuantity),
        potassium: parseFloat(potassium) / parseFloat(productQuantity),
      });
    }

    try {
      await createFoodEntry({
        dayEntryId: dayEntry.id,
        name: input,
        productId: product?.id ?? newProduct?.id,
        servingSize: foodEntryServingSize,
        quantity: parseFloat(foodEntryQuantity),

        // @TODO: add servingSize within the formulas - somehow
        // eslint-disable-next-line max-len
        calories: (parseFloat(foodEntryQuantity) * parseFloat(calories)) / parseFloat(productQuantity),
        fat: (parseFloat(foodEntryQuantity) * parseFloat(fat)) / parseFloat(productQuantity),
        carbs: (parseFloat(foodEntryQuantity) * parseFloat(carbs)) / parseFloat(productQuantity),
        protein: (parseFloat(foodEntryQuantity) * parseFloat(protein)) / parseFloat(productQuantity),
        fiber: (parseFloat(foodEntryQuantity) * parseFloat(fiber)) / parseFloat(productQuantity),
        // eslint-disable-next-line max-len
        saturatedFat: (parseFloat(foodEntryQuantity) * parseFloat(saturatedFat)) / parseFloat(productQuantity),
        sugar: (parseFloat(foodEntryQuantity) * parseFloat(sugar)) / parseFloat(productQuantity),
        sodium: (parseFloat(foodEntryQuantity) * parseFloat(sodium)) / parseFloat(productQuantity),
        // eslint-disable-next-line max-len
        potassium: (parseFloat(foodEntryQuantity) * parseFloat(potassium)) / parseFloat(productQuantity),
      });
    } catch (error) {
      console.log(error);
      dispatch(setNotification({ message: 'Dumnezeu nu e cu tine', variant: 'error' }));
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
