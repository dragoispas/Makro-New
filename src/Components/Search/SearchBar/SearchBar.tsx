import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { BackButton, ClearButton, CustomInput, CustomInputBase } from "./SearchBarStyle";
import { useSearch } from "../../../Hooks/useSearch";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store/store";
import { useAppDispatch } from "../../../Hooks/useAppDispatch";
import { setDiaryFormActive } from "../../../app/store/slices/searchSlice";

interface Props {
  focus: () => void;
}

export function SearchBar({ focus }: Props) {
  const { searchTerm, searchTermHandler: setSearchTerm } = useSearch();
  const isDiaryFormActive = useSelector((state: RootState) => state.search.isDiaryFormActive);
  const dispatch = useAppDispatch();

  return (
    <Box
      style={{
        width: "630px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      {isDiaryFormActive ? (
        <>
          <BackButton
            onClick={() => dispatch(setDiaryFormActive(false))}
            sx={{
              transform: "translate(-248px, 1px)",
              position: "absolute",
              zIndex: "2000",
            }}
          />
          <CustomInputBase value={"Back to search"} disabled={true} color="primary" />
        </>
      ) : (
        <>
          <SearchIcon sx={{ transform: "translate(-248px, 0px)", position: "absolute" }} />
          <CustomInput
            value={isDiaryFormActive ? "Back to search" : searchTerm}
            onMouseDown={() => focus()}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={"Search food"}
            disabled={!!isDiaryFormActive}
          />
          <ClearButton
            sx={{ transform: "translate(248px, 0px)", position: "absolute" }}
            color="inherit"
            visible={!isDiaryFormActive && searchTerm.length > 0}
            onClick={() => setSearchTerm("")}
          />
        </>
      )}

      {/* <CustomInput
        value={isDiaryFormActive ? "Back to search" : searchTerm}
        onMouseDown={() => focus()}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={"Search food"}
        disabled={!!isDiaryFormActive}
      /> */}
      {/* <ClearButton
        sx={{ transform: "translate(248px, 0px)", position: "absolute" }}
        color="inherit"
        visible={!isDiaryFormActive && searchTerm.length > 0}
        onClick={() => setSearchTerm("")}
      /> */}
    </Box>
  );
}
