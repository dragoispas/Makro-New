import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { SearchModalState, setNutritionValue } from "../modules/search/searchModalSlice";

export const useCurrent = (): [
  SearchModalState,
  (name: string, value: number | string) => void
] => {
  const dispatch = useDispatch();

  const current = useSelector((state: RootState) => state.searchModal);

  const handler = (name: string, value: number | string) => {
    dispatch(setNutritionValue({ name: name, value: value }));
  };

  return [current, handler];
};
