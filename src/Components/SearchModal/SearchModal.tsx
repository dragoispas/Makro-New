/* eslint-disable max-len */
/* eslint-disable react/jsx-no-duplicate-props */
import styled from '@emotion/styled';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Button,
  ClickAwayListener,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  Link,
  List,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fontSize, Stack, typography } from '@mui/system';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import NumberFormat, { InputAttributes } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { SearchListItem } from '../SearchListItem';
import CircularProgressWithLabel from '../CircularProgressWithLabel';
import LinearProgressWithLabel from '../LinearProgressWithLabel';
import { TabPanel } from '../TabPanel';
import { emptyProduct, Product, ProductMap } from '../../Api/products/types';
import CircularProgressNoLabel from '../CircularProgress';
import { createFoodEntry } from '../../Api/food-entries/api';
import { RootState } from '../../app/store';
import { createProduct } from '../../Api/products/api';
import { SearchBar } from './SearchModalComponents/SearchBar';
import {
  closeSearchModal,
  setActive, setCalories, setCarbs, setContent, setFat, setFiber, setInput, setPotassium, setProduct, setProtein, setSatFat, setSodium, setSugar,
} from '../../modules/search/searchModalSlice';
import { AddEditForm } from './SearchModalComponents/AddEditForm';
import { SearchResults } from './SearchModalComponents/SearchResults';

const InputContainer = styled(Paper)<{ isActive: boolean }>`
  position: absolute;
  width: 600px;
  height: 600px;
  border-radius: 5px;
  padding-top: 5px;
  transition: 0.25s;

  ${(props) => (props.isActive ? 'box-shadow: 0 0 50px rgba(0,0,0,0.3); z-index: 1000;' : 'box-shadow: none;')}

  display: flex;
  align-items: center;
  // justify-content: center;
  flex-direction: column;
`;

const Overlay = styled(Box)<{ isActive: boolean }>`
  transition: 0.25s;
  background: ${(props) => (props.isActive ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)')};
  pointer-events: ${(props) => (props.isActive ? '' : 'none')};
  position: fixed;
  // width: 100vw;
  // height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
`;

export function SearchModal() {
  const dispatch = useDispatch();
  const active = useSelector((state: RootState) => state.searchModal.active);
  const content = useSelector((state: RootState) => state.searchModal.content);
  const product = useSelector((state: RootState) => state.searchModal.product);

  useEffect(() => {
    if (content !== 'addEditForm') {
      dispatch(setProduct(null));
    }
  }, [content]);

  useEffect(() => {
    if (product) {
      dispatch(setCalories(product.calories.toString()));
      dispatch(setFat(product.fat.toString()));
      dispatch(setSatFat(product.saturatedFat.toString()));
      dispatch(setCarbs(product.carbs.toString()));
      dispatch(setFiber(product.fiber.toString()));
      dispatch(setSugar(product.sugar.toString()));
      dispatch(setProtein(product.protein.toString()));
      dispatch(setSodium(product.sodium.toString()));
      dispatch(setPotassium(product.potassium.toString()));
    }
  }, [product]);

  const getContent = () => {
    if (active) {
      if (content === 'searchResults') {
        return <SearchResults />;
      }
      return <AddEditForm />;
    }
    return null;
  };
  return (
    <>
      <Overlay isActive={active} />
      <Box sx={{ height: '60px' }} />
      <ClickAwayListener onClickAway={() => dispatch(closeSearchModal())}>
        <InputContainer isActive={active}>
          <SearchBar />
          {getContent()}
        </InputContainer>
      </ClickAwayListener>
    </>
  );
}
