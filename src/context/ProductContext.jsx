import { createContext, useContext } from "react";

const ProductContext = createContext(undefined);

const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};

export { ProductContext, useProductContext };
