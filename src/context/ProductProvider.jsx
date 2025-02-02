import { ProductContext } from "./ProductContext";
import useProduct from "../hooks/useProducts";



const ProductProvider = ({ children }) => {
  const {products, createProduct, updateProductById, deleteProductById} = useProduct();
  
  return(
    <ProductContext.Provider value={{ products, createProduct, updateProductById, deleteProductById}}>
     {children}
    </ProductContext.Provider>
  );
  
};

export default ProductProvider;