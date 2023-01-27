import styled from '@emotion/styled';
import {
  Typography, TableContainer, Table, TableHead, TableRow, TableCell, InputBase, TableBody,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../app/store';
import {
  setCalories, setFat, setSatFat, setCarbs, setFiber, setSugar, setProtein, setSodium, setPotassium,
} from '../../../../modules/search/searchModalSlice';

const OuterBorder = styled(Box)`
    height: 412px;
    width: 210px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(0, 0, 0, 0.6);
    &:hover {
        border-color: rgba(0, 0, 0, 0.9);
    }
    border-radius: 5px;
`;

const TableWrapper = styled(Box)`
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;
    height: 410px;
    width: 210px;
    border: 1px solid;
    transition: 0.15s;
    border: 1px solid white;
    &:hover {
        border-color: rgba(0, 0, 0, 0.9);
    }
    border-radius: 5px;
    
`;

export function NutritionDataTable() {
  const dispatch = useDispatch();
  const amount = useSelector((state: RootState) => state.searchModal.amount);
  const unit = useSelector((state: RootState) => state.searchModal.unit);
  const product = useSelector((state: RootState) => state.searchModal.product);

  const calories = useSelector((state: RootState) => state.searchModal.calories);
  const fat = useSelector((state: RootState) => state.searchModal.fat);
  const satFat = useSelector((state: RootState) => state.searchModal.satFat);
  const carbs = useSelector((state: RootState) => state.searchModal.carbs);
  const fiber = useSelector((state: RootState) => state.searchModal.fiber);
  const sugar = useSelector((state: RootState) => state.searchModal.sugar);
  const protein = useSelector((state: RootState) => state.searchModal.protein);
  const sodium = useSelector((state: RootState) => state.searchModal.sodium);
  const potassium = useSelector((state: RootState) => state.searchModal.potassium);

  const getAmount = () => {
    if (amount) {
      if (amount === '') {
        return '100';
      }
      return amount;
    }
    return '100';
  };

  useEffect(() => {
    if (product) {
      setCalories(product.calories.toString());
      setFat(product.fat.toString());
      setSatFat(product.saturatedFat.toString());
      setCarbs(product.carbs.toString());
      setFiber(product.fiber.toString());
      setSugar(product.sugar.toString());
      setProtein(product.protein.toString());
      setSodium(product.sodium.toString());
      setPotassium(product.potassium.toString());
    }
  }, [product]);

  return (
    <OuterBorder>
      <TableWrapper>
        <Typography sx={{ margin: '5px', fontWeight: '500', fontSize: '0.875rem' }}>Nutrition Facts</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '180px' }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: '500' }}>Serving size</Typography>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: '500' }}>{`${getAmount()} ${unit}`}</Typography>
        </Box>
        <TableContainer component={Box} sx={{ width: '200px' }}>
          <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell padding="none" sx={{ paddingLeft: '10px', width: '90px' }}>Calories</TableCell>
                <TableCell align="right"><InputBase value={calories} onChange={(e) => dispatch(setCalories(e.target.value))} placeholder="0" size="small" sx={{ fontSize: '0.875rem', fontWeight: '500' }} inputProps={{ style: { textAlign: 'right' } }} /></TableCell>
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
                <TableCell align="right"><InputBase value={fat === '0' ? '' : fat} onChange={(e) => dispatch(setFat(e.target.value))} placeholder="0" size="small" sx={{ fontSize: '0.875rem' }} inputProps={{ style: { textAlign: 'right' } }} /></TableCell>
              </TableRow>
              <TableRow
                key="Fat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="none" sx={{ paddingLeft: '20px', width: '90px' }} component="th" scope="row">
                  Sat Fat(g)
                </TableCell>
                <TableCell align="right"><InputBase value={satFat === '0' ? '' : satFat} onChange={(e) => dispatch(setSatFat(e.target.value))} placeholder="0" size="small" sx={{ fontSize: '0.875rem' }} inputProps={{ style: { textAlign: 'right' } }} /></TableCell>
              </TableRow>
              <TableRow
                key="Fat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="none" sx={{ paddingLeft: '10px', width: '90px' }} component="th" scope="row">
                  Carbs(g)
                </TableCell>
                <TableCell align="right"><InputBase value={carbs === '0' ? '' : carbs} onChange={(e) => dispatch(setCarbs(e.target.value))} placeholder="0" size="small" sx={{ fontSize: '0.875rem' }} inputProps={{ style: { textAlign: 'right' } }} /></TableCell>
              </TableRow>
              <TableRow
                key="Fat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="none" sx={{ paddingLeft: '20px', width: '90px' }} component="th" scope="row">
                  Fiber(g)
                </TableCell>
                <TableCell align="right"><InputBase value={fiber === '0' ? '' : fiber} onChange={(e) => dispatch(setFiber(e.target.value))} placeholder="0" size="small" sx={{ fontSize: '0.875rem' }} inputProps={{ style: { textAlign: 'right' } }} /></TableCell>
              </TableRow>
              <TableRow
                key="Fat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="none" sx={{ paddingLeft: '20px', width: '90px' }} component="th" scope="row">
                  Sugar(g)
                </TableCell>
                <TableCell align="right"><InputBase value={sugar === '0' ? '' : sugar} onChange={(e) => dispatch(setSugar(e.target.value))} placeholder="0" size="small" sx={{ fontSize: '0.875rem' }} inputProps={{ style: { textAlign: 'right' } }} /></TableCell>
              </TableRow>
              <TableRow
                key="Fat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="none" sx={{ paddingLeft: '10px', width: '90px' }} component="th" scope="row">
                  Protein(g)
                </TableCell>
                <TableCell align="right"><InputBase value={protein === '0' ? '' : protein} onChange={(e) => dispatch(setProtein(e.target.value))} placeholder="0" size="small" sx={{ fontSize: '0.875rem' }} inputProps={{ style: { textAlign: 'right' } }} /></TableCell>
              </TableRow>
              <TableRow
                key="Fat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="none" sx={{ paddingLeft: '20px', width: '90px' }} component="th" scope="row">
                  Sodium(mg)
                </TableCell>
                <TableCell align="right"><InputBase value={sodium === '0' ? '' : sodium} onChange={(e) => dispatch(setSodium(e.target.value))} placeholder="0" size="small" sx={{ fontSize: '0.875rem' }} inputProps={{ style: { textAlign: 'right' } }} /></TableCell>
              </TableRow>
              <TableRow
                key="Fat"
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell padding="none" sx={{ paddingLeft: '20px', width: '90px' }} component="th" scope="row">
                  Potassium(mg)
                </TableCell>
                <TableCell align="right"><InputBase value={potassium === '0' ? '' : potassium} onChange={(e) => dispatch(setPotassium(e.target.value))} placeholder="0" size="small" sx={{ fontSize: '0.875rem' }} inputProps={{ style: { textAlign: 'right' } }} /></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>
    </OuterBorder>
  );
}
