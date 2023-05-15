import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { clearSelectedProduct, setSelectedProduct } from "../app/store/slices/searchSlice";
import { Product } from "../app/api/types";

export const useSelectedProduct = (): [Product | null, (product: Product) => void, () => void] => {
  const dispatch = useDispatch();
  const product: Product | null = useSelector((state: RootState) => state.search.selectedProduct);

  const handler = (product: Product) => {
    dispatch(setSelectedProduct(product));
  };

  const clearHandler = () => {
    dispatch(clearSelectedProduct());
  };

  return [product, handler, clearHandler];
};
