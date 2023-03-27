import { Button, Box, List, ListSubheader, Tab, Tabs, styled } from "@mui/material";
import React, { useMemo, useState } from "react";
import { bananaProduct, emptyProduct, ProductMap } from "../../../../Api/products/types";
import { useProduct } from "../../../../Hooks/useProduct";
import { useSearch } from "../../../../Hooks/useSearch";
import { SearchListItem } from "../../../SearchListItem";
import { TabPanel } from "../../../TabPanel";

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
  const { tab, tabHandler: setTab } = useSearch();
  const [product, setProduct] = useProduct();

  const [products] = useState<ProductMap>({
    test1: bananaProduct,
    test2: bananaProduct,
    test3: bananaProduct,
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const getSearchListItems = useMemo(
    () =>
      Object.values(products).map((prod) => (
        <React.Fragment key={prod.id}>
          <Box onClick={() => setProduct(prod)}>
            <SearchListItem name={prod.name} calories={prod.calories} />
          </Box>
        </React.Fragment>
      )),
    [products]
  );

  return (
    <Content>
      <Box sx={{ height: "570px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", padding: "0px 20px" }}>
          <Tabs
            value={tab}
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
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <List sx={listSx} subheader={<li />}>
            {getSearchListItems}
          </List>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <List sx={listSx} subheader={<li />}>
            {getSearchListItems}
          </List>
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <List sx={listSx} subheader={<li />}>
            {getSearchListItems}
          </List>
        </TabPanel>
      </Box>
      <Button onClick={() => setProduct(emptyProduct)} sx={{ width: "100%", marginTop: "5px" }}>
        CREATE NEW FOOD
      </Button>
    </Content>
  );
}
