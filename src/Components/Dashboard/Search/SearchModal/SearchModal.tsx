import { useMemo, useState } from "react";
import { Box, ClickAwayListener, Paper, styled } from "@mui/material";
import { SearchBar } from "../SearchBar/SearchBar";
import { AddEditForm } from "../ModalContent/AddEditForm/AddEditForm";
import { SearchResults } from "../ModalContent/SearchResults/SearchResults";
import { InputContainer, Overlay } from "./SearchModalStyle";
import { useProduct } from "../../../../Hooks/useProduct";

export function SearchModal() {
  const [active, setActive] = useState<boolean>(false);
  const [product, setProduct] = useProduct();

  // If "Create new" is selected, a temporary product should be generated
  const content = useMemo(() => {
    console.log(active);
    if (active) return product ? <AddEditForm product={product} /> : <SearchResults />;

    return null;
  }, [active, product]);

  const focus = () => {
    if (!active) setActive(true);
  };

  // This is getting called on click outside the modal
  //
  // @TODO: perform a check in case unsaved changes are made
  //
  const closeSearch = () => {
    setActive(false);
    setProduct(null);
  };

  return (
    <>
      <Overlay isActive={Boolean(active)} />
      <Box sx={{ height: "60px" }} />
      <ClickAwayListener onClickAway={() => closeSearch()}>
        <InputContainer isActive={active}>
          <SearchBar focus={focus} />
          {content}
        </InputContainer>
      </ClickAwayListener>
    </>
  );
}
