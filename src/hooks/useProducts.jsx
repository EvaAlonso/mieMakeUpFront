import { useState, useEffect } from "react";
import { createProducts, getAllProducts, updateProduct, deleteProduct, getProductById } from "../service/ProductService";


const useProduct = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  

  const getAllProductsFromApiService = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const getProductByIdFromApi = async (id) => {
    const data = await getProductById(id);
    setProduct(data);
  }

  const createProduct = async (newProduct) => {
    const createdProduct = await createProducts(newProduct);
    setProducts((prevProducts)=> [...prevProducts, createdProduct]);
  };

  const updateProductById = async (id, updatedProduct) => {
    const updated = await updateProduct(id, updatedProduct);
    setProducts((prevProducts) => 
    prevProducts.map((product) => (product.id === id ? updated : product))
    );
  };

  const deleteProductById = async (id) => {
    await deleteProduct(id);
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };


  useEffect(() => {
    getAllProductsFromApiService();
  }, []);

  return { 
    products, 
    createProduct, 
    updateProductById, 
    deleteProductById,
    product,
    getProductByIdFromApi
     
  };
};

export default useProduct;