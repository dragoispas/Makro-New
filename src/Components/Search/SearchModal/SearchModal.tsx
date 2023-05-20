import { useState } from "react";
import { Box, ClickAwayListener } from "@mui/material";
import { SearchBar } from "../SearchBar/SearchBar";
import { AddEditForm } from "../ModalContent/AddEditForm/AddEditForm";
import { SearchResultsContainer } from "../ModalContent/SearchResults/SearchResultsContainer";
import { InputContainer, Overlay } from "./SearchModalStyle";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { setDiaryFormActive } from "../../../app/store/slices/searchSlice";
import { useAppDispatch } from "../../../Hooks/useAppDispatch";

export function SearchModal() {
  const [active, setActive] = useState<boolean>(false);
  const isDiaryFormActive = useSelector((state: RootState) => state.search.isDiaryFormActive);
  const dispatch = useAppDispatch();

  // This is getting called on click outside the modal
  //
  // @TODO: perform a check in case unsaved changes are made
  //
  const closeSearch = () => {
    setActive(false);
    dispatch(setDiaryFormActive(false));
  };

  return (
    <>
      <Overlay isActive={active} />
      <Box sx={{ height: "60px" }} />
      <ClickAwayListener onClickAway={closeSearch}>
        <InputContainer isActive={active}>
          <SearchBar focus={() => setActive(true)} />
          {active ? isDiaryFormActive ? <AddEditForm /> : <SearchResultsContainer /> : null}
        </InputContainer>
      </ClickAwayListener>
    </>
  );
}
