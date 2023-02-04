/* eslint-disable max-len */
import styled from '@emotion/styled';
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  InputBase,
  TableBody,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import {
  setProductCopy,
} from '../../../../modules/search/searchModalSlice';
import { NumberFormatCustom } from '../../../Helpers/Formatter';
import { getRounded } from '../../../Helpers/parsers';

const OuterBorder = styled(Box)<{themeMode:string}>`
    height: 412px;
    width: 210px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: ${(props) => (props.themeMode === 'light' ? '1px solid rgba(0, 0, 0, 0.5)' : '1px solid rgba(255, 255, 255, 0.7)')};
    &:hover {
        border-color: ${(props) => (props.themeMode === 'light' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)')};
    }
    border-radius: 5px;
`;

const TableWrapper = styled(Box)<{themeMode:string}>`
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
    height: 410px;
    width: 210px;
    border: 1px solid;
    transition: 0.15s;
    border: ${(props) => (props.themeMode === 'light' ? '1px solid white' : '1px solid black')};
    &:hover {
        border-color: ${(props) => (props.themeMode === 'light' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)')};
    }
    border-radius: 5px;
    
`;

export function NutritionDataTable() {
  const themeMode = useSelector(({ general }: RootState) => general.themeMode);

  const dispatch = useDispatch();
  const amount = useSelector((state: RootState) => state.searchModal.amount);
  // const [previousAmount, setPreviousAmount] = useState<number>(amount);
  const unit = useSelector((state: RootState) => state.searchModal.unit);
  const product = useSelector((state: RootState) => state.searchModal.product);

  const productCopy = useSelector((state: RootState) => state.searchModal.productCopy);

  // const getAmount = () => {
  //   if (amount) {
  //     return amount;
  //   }
  //   return 100;
  // };

  // useEffect(() => {
  //   dispatch(setProductCopy({
  //     calories: productCopy.calories,
  //     fat: productCopy.fat,
  //     satFat: productCopy.satFat,
  //     carbs: productCopy.carbs,
  //     fiber: productCopy.fiber,
  //     sugar: productCopy.sugar,
  //     protein: productCopy.protein,
  //     sodium: productCopy.sodium,
  //     potassium: productCopy.potassium,
  //   }));
  //   // Object.entries(productCopy).map(([key, value]) => {
  //   //   console.log(key, value);
  //   //   return productCopy[key];
  //   // });
  // }, [amount]);

  useEffect(() => {
    if (product) {
      dispatch(setProductCopy({
        calories: product.calories,
        fat: product.fat,
        satFat: product.satFat,
        carbs: product.carbs,
        fiber: product.fiber,
        sugar: product.sugar,
        protein: product.protein,
        sodium: product.sodium,
        potassium: product.potassium,
      }));
    }
  }, [product]);

  return (
    <OuterBorder themeMode={themeMode.toString()}>
      <TableWrapper themeMode={themeMode.toString()}>
        <Typography sx={{ margin: '5px', fontWeight: '500', fontSize: '0.875rem' }}>Nutrition Facts</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '180px' }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: '500' }}>Serving size</Typography>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: '500' }}>{`${amount} ${unit}`}</Typography>
        </Box>
        <TableContainer component={Box} sx={{ width: '200px' }}>
          <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell padding="none" sx={{ paddingLeft: '10px', width: '90px' }}>Calories</TableCell>
                <TableCell align="right">
                  <InputBase
                    type="number"
                    key="calories"
                    value={getRounded(productCopy.calories)}
                    onChange={(e) => dispatch(setProductCopy({ ...productCopy, calories: parseFloat(e.target.value) }))}
                    placeholder="0"
                    size="small"
                    sx={{ fontSize: '0.875rem', fontWeight: '500' }}
                    inputProps={{ style: { textAlign: 'right' } }}
                    inputComponent={NumberFormatCustom as any}
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                key="Fat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="none" sx={{ paddingLeft: '10px', width: '90px' }} component="th" scope="row">
                  Total Fat(g)
                </TableCell>
                <TableCell align="right">
                  <InputBase
                    key="fat"
                    value={getRounded(productCopy.fat)}
                    onChange={(e) => dispatch(setProductCopy({ ...productCopy, fat: parseFloat(e.target.value) }))}
                    placeholder="0"
                    size="small"
                    sx={{ fontSize: '0.875rem', color: product && product?.fat !== productCopy.fat / amount ? '#ee5b46' : '' }}
                    inputProps={{ style: { textAlign: 'right' } }}
                    inputComponent={NumberFormatCustom as any}
                  />
                </TableCell>
              </TableRow>
              <TableRow
                key="Fat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="none" sx={{ paddingLeft: '20px', width: '90px' }} component="th" scope="row">
                  Sat Fat(g)
                </TableCell>
                <TableCell align="right">
                  <InputBase
                    key="satFat"
                    value={getRounded(productCopy.satFat)}
                    onChange={(e) => dispatch(setProductCopy({ ...productCopy, satFat: parseFloat(e.target.value) }))}
                    placeholder="0"
                    size="small"
                    sx={{ fontSize: '0.875rem', color: product && product?.satFat !== productCopy.satFat / amount ? '#ee5b46' : '' }}
                    inputProps={{ style: { textAlign: 'right' } }}
                    inputComponent={NumberFormatCustom as any}
                  />

                </TableCell>
              </TableRow>
              <TableRow
                key="Fat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="none" sx={{ paddingLeft: '10px', width: '90px' }} component="th" scope="row">
                  Carbs(g)
                </TableCell>
                <TableCell align="right">
                  <InputBase
                    key="carbs"
                    value={getRounded(productCopy.carbs)}
                    onChange={(e) => dispatch(setProductCopy({ ...productCopy, carbs: parseFloat(e.target.value) }))}
                    placeholder="0"
                    size="small"
                    sx={{ fontSize: '0.875rem', color: product && product?.carbs !== productCopy.carbs / amount ? '#ee5b46' : '' }}
                    inputProps={{ style: { textAlign: 'right' } }}
                    inputComponent={NumberFormatCustom as any}
                  />

                </TableCell>
              </TableRow>
              <TableRow
                key="Fat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="none" sx={{ paddingLeft: '20px', width: '90px' }} component="th" scope="row">
                  Fiber(g)
                </TableCell>
                <TableCell align="right">
                  <InputBase
                    key="fiber"
                    value={getRounded(productCopy.fiber)}
                    onChange={(e) => dispatch(setProductCopy({ ...productCopy, fiber: parseFloat(e.target.value) }))}
                    placeholder="0"
                    size="small"
                    sx={{ fontSize: '0.875rem', color: product && product?.fiber !== productCopy.fiber / amount ? '#ee5b46' : '' }}
                    inputProps={{ style: { textAlign: 'right' } }}
                    inputComponent={NumberFormatCustom as any}
                  />

                </TableCell>
              </TableRow>
              <TableRow
                key="Fat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="none" sx={{ paddingLeft: '20px', width: '90px' }} component="th" scope="row">
                  Sugar(g)
                </TableCell>
                <TableCell align="right">
                  <InputBase
                    key="sugar"
                    value={getRounded(productCopy.sugar)}
                    onChange={(e) => dispatch(setProductCopy({ ...productCopy, sugar: parseFloat(e.target.value) }))}
                    placeholder="0"
                    size="small"
                    sx={{ fontSize: '0.875rem', color: product && getRounded(product?.sugar) !== getRounded(productCopy.sugar / amount) ? '#ee5b46' : '' }}
                    inputProps={{ style: { textAlign: 'right' } }}
                    inputComponent={NumberFormatCustom as any}
                  />

                </TableCell>
              </TableRow>
              <TableRow
                key="Fat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="none" sx={{ paddingLeft: '10px', width: '90px' }} component="th" scope="row">
                  Protein(g)
                </TableCell>
                <TableCell align="right">
                  <InputBase
                    key="protein"
                    value={getRounded(productCopy.protein)}
                    onChange={(e) => dispatch(setProductCopy({ ...productCopy, protein: parseFloat(e.target.value) }))}
                    placeholder="0"
                    size="small"
                    sx={{ fontSize: '0.875rem', color: product && product?.protein !== productCopy.protein / amount ? '#ee5b46' : '' }}
                    inputProps={{ style: { textAlign: 'right' } }}
                    inputComponent={NumberFormatCustom as any}
                  />

                </TableCell>
              </TableRow>
              <TableRow
                key="Fat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="none" sx={{ paddingLeft: '20px', width: '90px' }} component="th" scope="row">
                  Sodium(mg)
                </TableCell>
                <TableCell align="right">
                  <InputBase
                    key="sodium"
                    value={getRounded(productCopy.sodium)}
                    onChange={(e) => dispatch(setProductCopy({ ...productCopy, sodium: parseFloat(e.target.value) }))}
                    placeholder="0"
                    size="small"
                    sx={{ fontSize: '0.875rem', color: product && product?.sodium !== productCopy.sodium / amount ? '#ee5b46' : '' }}
                    inputProps={{ style: { textAlign: 'right' } }}
                    inputComponent={NumberFormatCustom as any}
                  />

                </TableCell>
              </TableRow>
              <TableRow
                key="Fat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="none" sx={{ paddingLeft: '20px', width: '90px' }} component="th" scope="row">
                  Potassium(mg)
                </TableCell>
                <TableCell align="right">
                  <InputBase
                    key="potassium"
                    value={getRounded(productCopy.potassium)}
                    onChange={(e) => dispatch(setProductCopy({ ...productCopy, potassium: parseFloat(e.target.value) }))}
                    placeholder="0"
                    size="small"
                    sx={{ fontSize: '0.875rem', color: product && product?.potassium !== productCopy.potassium / amount ? '#ee5b46' : '' }}
                    inputProps={{ style: { textAlign: 'right' } }}
                    inputComponent={NumberFormatCustom as any}
                  />

                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>
    </OuterBorder>
  );
}
