import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import { BackButton, CustomInput, ClearButton } from "./SearchBarStyle";
import { useProduct } from "../../../../Hooks/useProduct";
import { useSearch } from "../../../../Hooks/useSearch";

interface Props {
  focus: () => void;
}

export function SearchBar({ focus }: Props) {
  const { input, inputHandler: setInput } = useSearch();
  const [product, setProduct] = useProduct();

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
      {product ? (
        <BackButton
          onClick={() => setProduct(null)}
          sx={{
            transform: "translate(-248px, 1px)",
            position: "absolute",
            zIndex: "2000",
          }}
        />
      ) : (
        <SearchIcon sx={{ transform: "translate(-248px, 0px)", position: "absolute" }} />
      )}
      <CustomInput
        value={product ? "Back to search" : input}
        onMouseDown={() => focus()}
        onChange={(e) => setInput(e.target.value)}
        placeholder={"Search food"}
        disabled={!!product}
      />
      <ClearButton
        sx={{ transform: "translate(248px, 0px)", position: "absolute" }}
        color="inherit"
        visible={!product && !!input}
        onClick={() => setInput("")}
      />
    </Box>
  );
}
