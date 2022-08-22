import styled from '@emotion/styled';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  InputAdornment,
  List,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { SearchListItem } from './SearchListItem';
import { TabPanel } from './TabPanel';
import { emptyProduct, Product, ProductMap } from '../Api/products/types';
import useOutsideClick from './useOutsideClick';
import { CircularProgressWithLabel } from './CircularProgressWithLabel';
import { LinearProgressWithLabel } from './LinearProgressWithLabel';

const InputContainer = styled(Paper)<{ isActive: boolean }>`
  position: absolute;
  z-index: 1000;
  width: 600px;
  min-height: 60px;
  max-height: 600px;
  border-radius: 5px;
  padding-top: 5px;

  ${(props) => (props.isActive ? `box-shadow: 0 0 50px rgba(0,0,0,0.5);` : `box-shadow: none;`)}

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CustomInput = styled(Input)`
  width: 600px;
  height: 60px;
  border: none;
  background: rgba(0, 0, 0, 0);
  font-size: 20px;
  padding-left: 50px;
`;

const ClearButton = styled(ClearIcon)<{ inputText: string }>`
  border: none;
  outline: none;
  font-weight: bold;
  padding: 4px;
  flex-shrink: 0;
  margin: 0 10px;
  text-decoration: underline;
  transition: 0.25s;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  &:hover {
    background: rgba(150, 150, 150, 0.15);
  }

  ${(props) => (props.inputText === '' ? `opacity:0%` : `opacity:100%; cursor:pointer;`)}
`;

const SearchContent = styled(Box)<{ isActive: boolean }>`
  opacity: 0;
  ${(props) =>
    props.isActive ? 'animation: fade-in 1s forwards;' : 'pointer-events: none; opacity: 0;'}
  position: absolute;
  width: 600px;
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  animation-delay: 0.15s;
  animation-duration: 0.35s;
`;

const Overlay = styled(Box)<{ isActive: boolean }>`
  transition: 0.25s;
  background: ${(props) => (props.isActive ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0)')};
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

export default function Search() {
  const [content, setContent] = useState<string>('search results');

  const [inputText, setInputText] = useState<string>('');
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const [searchContentHeight, setSearchContentHeight] = useState<string>('0px');

  const [currentProduct, setCurrentProduct] = useState<Product>(emptyProduct);

  const [products, setProducts] = useState<ProductMap>({
    test1: emptyProduct,
    test2: emptyProduct,
    test3: emptyProduct
  });

  const [productQuantity, setProductQuantity] = useState<number>(0);
  const [productServingSize, setProductServingSize] = useState<string>('g');

  const [foodEntryQuantity, setFoodEntryQuantity] = useState<number>(0);
  const [foodEntryServingSize, setFoodEntryServingSize] = useState<string>('g');

  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    console.log(`CUUUUUUUUUUUUUUUUU${currentProduct}`);
  }, [currentProduct]);

  /**
   * Expands the search box when input is selected
   */
  useEffect(() => {
    if (isInputActive) {
      setSearchContentHeight('500px');
    } else {
      setSearchContentHeight('0px');
    }
  }, [content, isInputActive]);

  /**
   * Closes the search, goes back to results and drops the selected product
   */
  const closeSearch = () => {
    setIsInputActive(false);
    setContent('search results');
    setCurrentProduct({ ...emptyProduct });
  };

  /**
   * Allows user to click outside the search box to close it
   *
   *  TODO : fix an issue where it'll close the search box when clicking on a MUI select
   */
  const wrapperRef = useRef(null);
  useOutsideClick(() => closeSearch(), wrapperRef);

  /**
   * Takes all producs and returns react fragments for each of them
   */
  const getSearchListItems = useMemo(() => {
    console.log(products);
    return Object.values(products).map((product) => (
      <React.Fragment key={product.id}>
        <Box
          onClick={() => {
            setInputText(product.name);
            console.log(`clicked on ${product.name}`);
            setCurrentProduct(product);
            setContent('selected product');
          }}>
          <SearchListItem name="Test item" calories={120} />
        </Box>
      </React.Fragment>
    ));
  }, [products]);

  /**
   * Style applied to all <List> components
   */
  const listSx = {
    width: '100%',
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 355,
    height: 355,
    '& ul': { padding: 0 }
  };

  return (
    <>
      <Overlay isActive={isInputActive} />
      <InputContainer isActive={isInputActive} ref={wrapperRef}>
        <Box
          style={{
            width: '630px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
            marginLeft: '22px'
          }}>
          {content === 'search results' ? (
            <SearchIcon sx={{ transform: 'translate(41px, 0px)' }} />
          ) : (
            <EditIcon sx={{ transform: 'translate(41px, 0px)' }} />
          )}
          <CustomInput
            value={inputText}
            onClick={() => setIsInputActive(true)}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Search food"
          />
          <ClearButton
            sx={{ transform: 'translate(-60px, 0px)' }}
            color="inherit"
            inputText={inputText}
            onClick={() => {
              setContent('search results');
              setInputText('');
              setCurrentProduct({ ...emptyProduct });
            }}
          />
        </Box>
        <Box sx={{ width: '100%', height: searchContentHeight, transition: '0.25s' }}>
          <SearchContent isActive={isInputActive && content === 'search results'}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', padding: '0px 20px' }}>
              <Tabs
                value={tab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons={false}
                aria-label="scrollable prevent tabs example">
                <Tab label="All" />
                <Tab label="Custom" />
                <Tab label="Common" />
                <Tab label="Branded" />
              </Tabs>
            </Box>
            <TabPanel value={tab} index={0}>
              <List sx={listSx} subheader={<li />}>
                <li key="section-1">
                  <ul>
                    <ListSubheader>RECENT</ListSubheader>
                    {getSearchListItems}
                    <ListSubheader>CUSTOM</ListSubheader>
                    {getSearchListItems}
                    <ListSubheader>COMMON</ListSubheader>
                    {getSearchListItems}
                    <ListSubheader>BRANDED</ListSubheader>
                    {getSearchListItems}
                  </ul>
                </li>
              </List>
              <Button sx={{ width: '100%', marginTop: '10px' }}>CREATE NEW FOOD</Button>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <List sx={listSx} subheader={<li />}>
                {getSearchListItems}
              </List>
              <Button sx={{ width: '100%', marginTop: '10px' }}>CREATE NEW FOOD</Button>
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <List sx={listSx} subheader={<li />}>
                {getSearchListItems}
              </List>
              <Button sx={{ width: '100%', marginTop: '10px' }}>CREATE NEW FOOD</Button>
            </TabPanel>
            <TabPanel value={tab} index={3}>
              <List sx={listSx} subheader={<li />}>
                {getSearchListItems}
              </List>
              <Button sx={{ width: '100%', marginTop: '10px' }}>CREATE NEW FOOD</Button>
            </TabPanel>
          </SearchContent>

          <SearchContent isActive={isInputActive && content === 'selected product'}>
            <Stack
              sx={{ height: '455px', margin: '24px' }}
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              spacing={1}>
              <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>
                <Stack
                  gap={1}
                  sx={{
                    width: '180px',
                    borderRight: 1,
                    paddingRight: '24px',
                    borderColor: 'divider',
                    alignItems: 'flex-start'
                  }}>
                  <Typography sx={{ fontWeight: 'bold' }}>Nutrition Facts</Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '175px',
                      marginBottom: '5px'
                    }}>
                    <Typography sx={{ width: '25px' }}>per </Typography>
                    <FormControl variant="standard">
                      <Input
                        inputProps={{ style: { textAlign: 'end' } }}
                        sx={{ width: '75px' }}
                        size="small"
                        id="input-with-icon-adornment"
                        placeholder="0"
                      />
                    </FormControl>
                    <FormControl size="small">
                      <Select
                        variant="standard"
                        sx={{ width: '75px' }}
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value="g"
                        onChange={() => console.log()}>
                        <MenuItem value="g">g</MenuItem>
                        <MenuItem value="oz">oz</MenuItem>
                        <MenuItem value="lb">lb</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <FormControl variant="standard">
                    <Input
                      inputProps={{ style: { textAlign: 'end' } }}
                      sx={{ width: '175px' }}
                      size="small"
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <Typography color="text.primary" sx={{ opacity: 1 }}>
                            Calories
                          </Typography>
                        </InputAdornment>
                      }
                      endAdornment={<InputAdornment position="end">cal</InputAdornment>}
                      placeholder="0"
                    />
                  </FormControl>
                  <FormControl variant="standard">
                    <Input
                      inputProps={{ style: { textAlign: 'end' } }}
                      sx={{ width: '175px' }}
                      size="small"
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <Typography color="text.primary">Fat</Typography>
                        </InputAdornment>
                      }
                      endAdornment={<InputAdornment position="end">g</InputAdornment>}
                      placeholder="0"
                    />
                  </FormControl>
                  <FormControl variant="standard">
                    <Input
                      inputProps={{ style: { textAlign: 'end' } }}
                      sx={{ width: '175px' }}
                      size="small"
                      id="input-with-icon-adornment"
                      startAdornment={<InputAdornment position="end">Sat fat</InputAdornment>}
                      endAdornment={<InputAdornment position="end">g</InputAdornment>}
                      placeholder="0"
                    />
                  </FormControl>
                  <FormControl variant="standard">
                    <Input
                      inputProps={{ style: { textAlign: 'end' } }}
                      sx={{ width: '175px' }}
                      size="small"
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <Typography color="text.primary">Carbs</Typography>
                        </InputAdornment>
                      }
                      endAdornment={<InputAdornment position="end">g</InputAdornment>}
                      placeholder="0"
                    />
                  </FormControl>
                  <FormControl variant="standard">
                    <Input
                      inputProps={{ style: { textAlign: 'end' } }}
                      sx={{ width: '175px' }}
                      size="small"
                      id="input-with-icon-adornment"
                      startAdornment={<InputAdornment position="end">Fiber</InputAdornment>}
                      endAdornment={<InputAdornment position="end">g</InputAdornment>}
                      placeholder="0"
                    />
                  </FormControl>
                  <FormControl variant="standard">
                    <Input
                      inputProps={{ style: { textAlign: 'end' } }}
                      sx={{ width: '175px' }}
                      size="small"
                      id="input-with-icon-adornment"
                      startAdornment={<InputAdornment position="end">Sugar</InputAdornment>}
                      endAdornment={<InputAdornment position="end">g</InputAdornment>}
                      placeholder="0"
                    />
                  </FormControl>
                  <FormControl variant="standard">
                    <Input
                      inputProps={{ style: { textAlign: 'end' } }}
                      sx={{ width: '175px' }}
                      size="small"
                      id="input-with-icon-adornment"
                      startAdornment={
                        <InputAdornment position="start">
                          <Typography color="text.primary">Protein</Typography>
                        </InputAdornment>
                      }
                      endAdornment={<InputAdornment position="end">g</InputAdornment>}
                      placeholder="0"
                    />
                  </FormControl>
                  <FormControl variant="standard">
                    <Input
                      inputProps={{ style: { textAlign: 'end' } }}
                      sx={{ width: '175px' }}
                      size="small"
                      id="input-with-icon-adornment"
                      startAdornment={<InputAdornment position="end">Sodium</InputAdornment>}
                      endAdornment={<InputAdornment position="end">mg</InputAdornment>}
                      placeholder="0"
                    />
                  </FormControl>
                  <FormControl variant="standard">
                    <Input
                      inputProps={{ style: { textAlign: 'end' } }}
                      sx={{ width: '175px' }}
                      size="small"
                      id="input-with-icon-adornment"
                      startAdornment={<InputAdornment position="end">Potassium</InputAdornment>}
                      endAdornment={<InputAdornment position="end">mg</InputAdornment>}
                      placeholder="0"
                    />
                  </FormControl>
                </Stack>
                <Stack gap={1} sx={{ width: '100%', paddingLeft: '24px', alignItems: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      width: '300px',
                      marginBottom: '5px'
                    }}>
                    <Typography sx={{ fontWeight: 'bold' }}>Quantity: </Typography>
                    <FormControl variant="standard">
                      <Input
                        inputProps={{ style: { textAlign: 'end' } }}
                        sx={{ width: '75px' }}
                        size="small"
                        id="input-with-icon-adornment"
                        placeholder="0"
                        value={foodEntryQuantity}
                        onChange={(e) => setFoodEntryQuantity(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormControl size="small">
                      <Select
                        variant="standard"
                        sx={{ width: '75px' }}
                        labelId="demo-select-small"
                        id="demo-select-small"
                        value="g"
                        onChange={() => console.log()}>
                        <MenuItem value="g">g</MenuItem>
                        <MenuItem value="oz">oz</MenuItem>
                        <MenuItem value="lb">lb</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>

                  <Stack
                    direction="column"
                    justifyContent="space-around"
                    alignItems="center"
                    spacing={0}
                    sx={{
                      border: 1,
                      borderColor: 'divider',
                      height: '150px',
                      width: '280px',
                      padding: '10px'
                    }}>
                    <Typography sx={{ fontWeight: 'bold', marginBottom: '15px' }}>
                      Summary
                    </Typography>

                    <Stack
                      direction="row"
                      justifyContent="space-evenly"
                      alignItems="center"
                      spacing={0}
                      sx={{ width: '100%' }}>
                      <CircularProgressWithLabel
                        makro="protein"
                        size={60}
                        label={foodEntryQuantity}
                        value={foodEntryQuantity}
                      />
                      <CircularProgressWithLabel
                        makro="fat"
                        size={60}
                        label={foodEntryQuantity}
                        value={foodEntryQuantity}
                      />
                      <CircularProgressWithLabel
                        makro="carbs"
                        size={60}
                        label={foodEntryQuantity}
                        value={foodEntryQuantity}
                      />
                    </Stack>
                    <Box sx={{ width: '230px' }}>
                      <LinearProgressWithLabel
                        label={foodEntryQuantity}
                        value={foodEntryQuantity}
                      />
                    </Box>
                  </Stack>
                </Stack>
              </Box>
              <Button sx={{ width: '100%', marginTop: '10px', justifySelf: 'flex-end' }}>
                ADD TO DIARY
              </Button>
            </Stack>
          </SearchContent>
        </Box>
      </InputContainer>
    </>
  );
}
