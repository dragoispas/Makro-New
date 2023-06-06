import { Box, Button, styled, Tab, Tabs } from "@mui/material";
import React from "react";
import { useSearch } from "../../../../Hooks/useSearch";
import { TabPanel } from "../../../TabPanel";
import {
  clearSelectedProduct,
  setDiaryFormActive,
  setDiaryFormName,
} from "../../../../app/store/slices/searchSlice";
import { useAppDispatch } from "../../../../Hooks/useAppDispatch";
import { SearchResultsList } from "./SearchResultsList";
import { ProductType } from "../../../../app/api/types";

const Content = styled(Box)`
  width: 600px;
  height: 620px;
`;

export function SearchResultsContainer() {
  const dispatch = useAppDispatch();
  const { searchTerm, tab, tabHandler: setTab } = useSearch();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const onCreateNewFoodClick = () => {
    dispatch(clearSelectedProduct());
    dispatch(setDiaryFormName(searchTerm));
    dispatch(setDiaryFormActive(true));
  };

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
          <SearchResultsList />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <SearchResultsList type={ProductType.CUSTOM} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <SearchResultsList type={ProductType.COMMON} />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <SearchResultsList type={ProductType.BRANDED} />
        </TabPanel>
      </Box>
      <Button onClick={onCreateNewFoodClick} sx={{ width: "100%", marginTop: "5px" }}>
        NEW FOOD
      </Button>
    </Content>
  );
}
