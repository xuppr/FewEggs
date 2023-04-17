import { Dispatch, SetStateAction, createContext } from "react";

export type RootContextType = {
  selectedProductsCount: number;
  setSelectedProductsCount: Dispatch<SetStateAction<number>>;
};

const RootContext = createContext<RootContextType>({
  selectedProductsCount: 0,
  setSelectedProductsCount: () => {},
});

export default RootContext;
