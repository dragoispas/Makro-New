import styled from '@emotion/styled';
import {
  Button, List, ListSubheader, Tab, Tabs,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emptyProduct, ProductMap } from '../../../Api/products/types';
import { RootState } from '../../../app/store';
import {
  setAmount, setContent, setInput, setProduct, setSearchTab,
} from '../../../modules/search/searchModalSlice';
import { SearchListItem } from '../../SearchListItem';
import { TabPanel } from '../../TabPanel';

const Content = styled(Box)`
  width: 600px;
  height: 520px;
`;

const listSx = {
  width: '100%',
  bgcolor: 'background.paper',
  position: 'relative',
  overflow: 'auto',
  maxHeight: 385,
  height: 385,
  '& ul': { padding: 0 },
};

export function SearchResults() {
  const dispatch = useDispatch();

  const searchTab = useSelector((state: RootState) => state.searchModal.searchTab);

  const [products] = useState<ProductMap>({
    test1: emptyProduct,
    test2: emptyProduct,
    test3: emptyProduct,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(setSearchTab(newValue));
  };

  const getSearchListItems = useMemo(() => Object.values(products).map((prod) => (
    <React.Fragment key={prod.id}>
      <Box
        onClick={() => {
          dispatch(setInput(prod.name));
          dispatch(setProduct(prod));
          dispatch(setContent('addEditForm'));
          dispatch(setAmount(''));
        }}
      >
        <SearchListItem name={prod.name} calories={prod.calories} />
      </Box>
    </React.Fragment>
  )), [products]);

  return (
    <Content>
      <Box sx={{ height: '470px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', padding: '0px 20px' }}>
          <Tabs
            value={searchTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons={false}
            aria-label="scrollable prevent tabs example"
          >
            <Tab label="All" />
            <Tab label="Custom" />
            <Tab label="Common" />
            <Tab label="Branded" />
          </Tabs>
        </Box>
        <TabPanel value={searchTab} index={0}>
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
        </TabPanel>
        <TabPanel value={searchTab} index={1}>
          <List sx={listSx} subheader={<li />}>
            {getSearchListItems}
          </List>
        </TabPanel>
        <TabPanel value={searchTab} index={2}>
          <List sx={listSx} subheader={<li />}>
            {getSearchListItems}
          </List>
        </TabPanel>
        <TabPanel value={searchTab} index={3}>
          <List sx={listSx} subheader={<li />}>
            {getSearchListItems}
          </List>
        </TabPanel>
      </Box>
      <Button
        onClick={() => {
          dispatch(setContent('addEditForm'));
          dispatch(setAmount(''));
        }}
        sx={{ width: '100%', marginTop: '5px' }}
      >
        CREATE NEW FOOD
      </Button>
    </Content>
  );
}
