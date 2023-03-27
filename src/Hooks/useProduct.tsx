import { useDispatch, useSelector } from "react-redux";
import { Product } from "../Api/products/types";
import { RootState } from "../app/store";
import { setProduct } from "../modules/search/searchSlice";

export const useProduct = (): [Product | null, (product: Product | null) => void] => {
  const dispatch = useDispatch();
  const product: Product | null = useSelector((state: RootState) => state.search.product);

  const handler = (product: Product | null) => {
    dispatch(setProduct(product));
  };

  return [product, handler];
};
