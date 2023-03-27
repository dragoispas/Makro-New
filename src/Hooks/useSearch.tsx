import { useDispatch, useSelector } from "react-redux";
import { Product } from "../Api/products/types";
import { RootState } from "../app/store";
import { setInput, setTab } from "../modules/search/searchSlice";

export const useSearch = () => {
  const dispatch = useDispatch();
  const input: string | null = useSelector((state: RootState) => state.search.input);
  const tab: number = useSelector((state: RootState) => state.search.tab);

  const inputHandler = (input: string | null) => {
    dispatch(setInput(input));
  };
  const tabHandler = (tab: number) => {
    dispatch(setTab(tab));
  };

  return { input, tab, inputHandler, tabHandler };
};
