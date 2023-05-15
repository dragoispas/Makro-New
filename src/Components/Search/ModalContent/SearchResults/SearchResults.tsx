import { Box, Button, List, ListSubheader, styled, Tab, Tabs } from "@mui/material";
import React, { useMemo } from "react";
import { useSearch } from "../../../../Hooks/useSearch";
import { SearchListItem } from "../../../SearchListItem";
import { TabPanel } from "../../../TabPanel";
import { useSearchProductsByUsageQuery } from "../../../../app/api/api";
import {
  clearSelectedProduct,
  setDiaryFormActive,
  setDiaryFormName,
  setSelectedProduct,
} from "../../../../app/store/slices/searchSlice";
import { useAppDispatch } from "../../../../Hooks/useAppDispatch";

const Content = styled(Box)`
  width: 600px;
  height: 620px;
`;

const listSx = {
  width: "100%",
  bgcolor: "background.paper",
  position: "relative",
  overflow: "auto",
  maxHeight: 485,
  height: 485,
  "& ul": { padding: 0 },
};

export function SearchResults() {
  const dispatch = useAppDispatch();
  const { searchTerm, tab, tabHandler: setTab } = useSearch();
  const { data: products } = useSearchProductsByUsageQuery(searchTerm);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const onCreateNewFoodClick = () => {
    dispatch(clearSelectedProduct());
    dispatch(setDiaryFormName(searchTerm ?? ""));
    dispatch(setDiaryFormActive(true));
  };

  const searchListItems = useMemo(
    () =>
      products &&
      products.map((product) => (
        <React.Fragment key={product.id}>
          <Box onClick={() => dispatch(setSelectedProduct(product))}>
            <SearchListItem name={product.name} calories={product.macroNutrients.calories} />
          </Box>
        </React.Fragment>
      )),
    [products]
  );

  return (
    <Content>
      <Box sx={{ height: "570px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", padding: "0px 20px" }}>
          <Tabs value={tab} onChange={handleTabChange} variant="scrollable" scrollButtons={false}>
            <Tab label="All" />
            <Tab label="Custom" />
            <Tab label="Common" />
            <Tab label="Branded" />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <List sx={listSx} subheader={<li />}>
            <ListSubheader>RECENT</ListSubheader>
            {searchListItems}
            <ListSubheader>CUSTOM</ListSubheader>
            <ListSubheader>COMMON</ListSubheader>
            <ListSubheader>BRANDED</ListSubheader>
          </List>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <List sx={listSx} subheader={<li />}></List>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <List sx={listSx} subheader={<li />}></List>
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <List sx={listSx} subheader={<li />}></List>
        </TabPanel>
      </Box>
      <Button onClick={onCreateNewFoodClick} sx={{ width: "100%", marginTop: "5px" }}>
        CREATE NEW FOOD
      </Button>
    </Content>
  );
}
