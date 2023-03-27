import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { CurrentState, setValue, setValues } from "../modules/search/currentSlice";
import { useProduct } from "./useProduct";

export const useCurrent = (): [CurrentState, (name: string, value: number | string) => void] => {
  const dispatch = useDispatch();
  const [product] = useProduct();

  const current = useSelector((state: RootState) => state.current);

  useEffect(() => {
    if (product) {
      dispatch(setValues({ product: product }));
    }
  }, [product]);

  const handler = (name: string, value: number | string) => {
    dispatch(setValue({ name: name, value: value }));
  };

  return [current, handler];
};
