import React, { useEffect } from "react";
import { Box, ClickAwayListener, Paper, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { SearchBar } from "./SearchModalComponents/SearchBar";
import {
  closeSearchModal,
  setCalories,
  setCarbs,
  setFat,
  setFiber,
  setPotassium,
  setProduct,
  setProtein,
  setSatFat,
  setSodium,
  setSugar,
} from "../../modules/search/searchModalSlice";
import { AddEditForm } from "./SearchModalComponents/AddEditForm";
import { SearchResults } from "./SearchModalComponents/SearchResults";

const InputContainer = styled(Paper)<{ isActive: boolean }>`
  position: absolute;
  width: 600px;
  height: 700px;
  border-radius: 10px;
  padding-top: 5px;
  transition: 0.25s;

  ${(props) =>
    props.isActive ? "box-shadow: 0 0 50px rgba(0,0,0,0.3); z-index: 1000;" : "box-shadow: none;"}

  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Overlay = styled(Box)<{ isActive: boolean }>`
  transition: 0.25s;
  background: ${(props) => (props.isActive ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0)")};
  pointer-events: ${(props) => (props.isActive ? "" : "none")};
  position: fixed;
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
    if (content !== "addEditForm") {
      dispatch(setProduct(null));
    }
  }, [content]);

  useEffect(() => {
    if (product) {
      dispatch(setCalories(product.calories));
      dispatch(setFat(product.fat));
      dispatch(setSatFat(product.satFat));
      dispatch(setCarbs(product.carbs));
      dispatch(setFiber(product.fiber));
      dispatch(setSugar(product.sugar));
      dispatch(setProtein(product.protein));
      dispatch(setSodium(product.sodium));
      dispatch(setPotassium(product.potassium));
    }
  }, [product]);

  const getContent = () => {
    if (active) {
      if (content === "searchResults") {
        return <SearchResults />;
      }
      return <AddEditForm />;
    }
    return null;
  };
  return (
    <>
      <Overlay isActive={Boolean(active)} />
      <Box sx={{ height: "60px" }} />
      <ClickAwayListener onClickAway={() => dispatch(closeSearchModal())}>
        <InputContainer isActive={Boolean(active)}>
          <SearchBar />
          {getContent()}
        </InputContainer>
      </ClickAwayListener>
    </>
  );
}
