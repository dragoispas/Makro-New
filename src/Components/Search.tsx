import styled from '@emotion/styled';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  buildStyles,
  CircularProgressbar,
  CircularProgressbarWithChildren
} from 'react-circular-progressbar';
import {
  Box,
  Button,
  ButtonBase,
  Divider,
  Input,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/system';
import ReplayIcon from '@mui/icons-material/Replay';
import ClearIcon from '@mui/icons-material/Clear';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { TabPanel } from './TabPanel';
import { MiniChart } from './MiniChart';
import { emptyProduct, Product, ProductMap } from '../Api/products/types';
import DefaultFoodImage from '../Pgotos/DefaultFoodImage.png';
import useOutsideClick from './useOutsideClick';
import { SearchListItem } from './SearchListItem';

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
  background: inherit;
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

export const CustomFoodIcon = styled(LocalDiningIcon)`
  background: rgba(150, 150, 150, 0.2);
  border-radius: 50%;
  padding: 5px;
  opacity: 0.9;
`;

const AnimatedBox = styled(Box)<{ isActive: boolean }>`
  opacity: 0;
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  ${(props) => (props.isActive ? 'animation: fade-in 1s;' : '')}
  animation-delay: 0.25s;
`;

interface Props {}

export const Search: React.FC<Props> = ({}) => {
  const [content, setContent] = useState<string>('suggestions');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const [inputText, setInputText] = useState<string>('');
  const [isInputActive, setIsInputActive] = useState<boolean>(false);
  const [searchContentHeight, setSearchContentHeight] = useState<string>('0px');
  const [buttonsSlider, setButtonsSlider] = useState<string[]>(['38px', 'translate(0px, -3px)']);

  const [currentProduct, setCurrentProduct] = useState<Product>(emptyProduct);

  const [products, setProducts] = useState<ProductMap>({ test1: emptyProduct });

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

  const getIsCategoryActive = (categoryName: string) => {
    if (categoryName === activeCategory) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (isInputActive) {
      if (content === 'suggestions') {
        setSearchContentHeight('500px');
      } else if (content === 'addForm') {
        setSearchContentHeight('500px');
      }
    } else {
      setSearchContentHeight('0px');
    }
  }, [content, isInputActive]);

  const closeSearch = () => {
    setIsInputActive(false);
    // setInputText("");
    setContent('suggestions');
    setActiveCategory('All');
    setCurrentProduct({ ...emptyProduct });
  };

  const wrapperRef = useRef(null);
  useOutsideClick(() => closeSearch(), wrapperRef);

  // const getSearchResults = useMemo(() => {
  //     console.log(products)
  //     return Object.values(products).map(product => (
  //             <React.Fragment key = {product.id}>
  //                 <SearchListItem onClick={()=>{setInputText(product.name); setContent("addForm"); setActiveCategory("Add to Diary"); setCurrentProduct(product);}}>
  //                     <img src={"aa"} alt="." style={{height: "40px", width: "40px"}}/>
  //                     <div style={{fontWeight:"bold"}}>{product.name}</div>
  //                 </SearchListItem>
  //             </React.Fragment>
  //         ));

  // }, [products])

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
          <SearchIcon sx={{ transform: 'translate(41px, 0px)' }} />
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
              setContent('suggestions');
              setInputText('');
              setActiveCategory('All');
              setCurrentProduct({ ...emptyProduct });
            }}
          />
        </Box>
        <Box sx={{ width: '100%', height: searchContentHeight, transition: '0.25s' }}>
          <SearchContent isActive={isInputActive && content === 'suggestions'}>
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
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 355,
                  height: 355,
                  '& ul': { padding: 0 }
                }}
                subheader={<li />}>
                <li key="section-1">
                  <ul>
                    <ListSubheader>RECENT</ListSubheader>
                    <SearchListItem name="Test item" calories={120} />
                    <SearchListItem name="Test item" calories={120} />
                    <SearchListItem name="Test item" calories={120} />
                    <SearchListItem name="Test item" calories={120} />
                    <ListSubheader>CUSTOM</ListSubheader>
                    <SearchListItem name="Test item" calories={120} />
                    <SearchListItem name="Test item" calories={120} />
                    <SearchListItem name="Test item" calories={120} />
                    <SearchListItem name="Test item" calories={120} />
                    <ListSubheader>COMMON</ListSubheader>
                    <SearchListItem name="Test item" calories={120} />
                    <SearchListItem name="Test item" calories={120} />
                    <SearchListItem name="Test item" calories={120} />
                    <SearchListItem name="Test item" calories={120} />
                    <ListSubheader>BRANDED</ListSubheader>
                    <SearchListItem name="Test item" calories={120} />
                    <SearchListItem name="Test item" calories={120} />
                  </ul>
                </li>
              </List>
              <Button sx={{ width: '100%', marginTop: '10px' }}>CREATE NEW FOOD</Button>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 355,
                  height: 355,
                  '& ul': { padding: 0 }
                }}
                subheader={<li />}>
                <SearchListItem name="Test item" calories={120} />
              </List>
              <Button sx={{ width: '100%', marginTop: '10px' }}>CREATE NEW FOOD</Button>
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 355,
                  height: 355,
                  '& ul': { padding: 0 }
                }}
                subheader={<li />}>
                <SearchListItem name="Test item" calories={120} />
              </List>
              <Button sx={{ width: '100%', marginTop: '10px' }}>CREATE NEW FOOD</Button>
            </TabPanel>
            <TabPanel value={tab} index={3}>
              <List
                sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  position: 'relative',
                  overflow: 'auto',
                  maxHeight: 355,
                  height: 355,
                  '& ul': { padding: 0 }
                }}
                subheader={<li />}>
                <SearchListItem name="Test item" calories={120} />
              </List>
              <Button sx={{ width: '100%', marginTop: '10px' }}>CREATE NEW FOOD</Button>
            </TabPanel>
          </SearchContent>
        </Box>
      </InputContainer>
    </>
  );
};
