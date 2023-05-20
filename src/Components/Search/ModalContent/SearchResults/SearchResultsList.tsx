import { Box, List, ListSubheader } from "@mui/material";
import React, { useMemo } from "react";
import { useSearch } from "../../../../Hooks/useSearch";
import { SearchListItem } from "../../../SearchListItem";
import { useSearchProductsByUsageQuery } from "../../../../app/api/api";
import { setDiaryFormActive, setSelectedProduct } from "../../../../app/store/slices/searchSlice";
import { useAppDispatch } from "../../../../Hooks/useAppDispatch";
import { ProductType } from "../../../../app/api/types";

const listSx = {
  width: "100%",
  bgcolor: "background.paper",
  position: "relative",
  overflow: "auto",
  maxHeight: 485,
  height: 485,
  "& ul": { padding: 0 },
};

interface SearchResultsListProps {
  type?: ProductType;
  subHeader?: string;
}

export function SearchResultsList({ type, subHeader }: SearchResultsListProps) {
  const dispatch = useAppDispatch();
  const { searchTerm } = useSearch();
  const { data: products } = useSearchProductsByUsageQuery({ searchTerm, type });

  const searchListItems = useMemo(
    () =>
      products &&
      products.map((product) => (
        <React.Fragment key={`search-result-${type ?? "all"}-${product.id}`}>
          <Box
            onClick={() => {
              dispatch(setSelectedProduct(product));
              dispatch(setDiaryFormActive(true));
            }}
          >
            <SearchListItem name={product.name} calories={product.macroNutrients.calories} />
          </Box>
        </React.Fragment>
      )),
    [products]
  );

  return (
    <List sx={listSx} subheader={<li />}>
      {subHeader && <ListSubheader>{subHeader}</ListSubheader>}
      {searchListItems}
    </List>
  );
}
