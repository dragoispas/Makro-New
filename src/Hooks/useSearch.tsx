import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { setSearchTerm, setTab } from "../app/store/slices/searchSlice";

export const useSearch = () => {
  const dispatch = useDispatch();
  const searchTerm: string | null = useSelector((state: RootState) => state.search.searchTerm);
  const tab: number = useSelector((state: RootState) => state.search.tab);

  const searchTermHandler = (input: string) => {
    dispatch(setSearchTerm(input));
  };
  const tabHandler = (tab: number) => {
    dispatch(setTab(tab));
  };

  return { searchTerm, tab, searchTermHandler, tabHandler };
};
