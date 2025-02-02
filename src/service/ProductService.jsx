import axios from "axios";

const apiProductsUrl = "http://localhost:8080/api/products";

const getAllProducts = async() => {
  const response = await axios.get(apiProductsUrl);
  return response.data;
};

const getProductById = async(id) => {
  const response = await axios.get(`${apiProductsUrl}/${id}`);
  return response.data;
};

const createProducts = async (newProduct) => {
  const response = await axios.post(apiProductsUrl, newProduct);
  return response.data;
};

const updateProduct = async (id, updateProduct) => {
  const response = await axios.put(`${apiProductsUrl}/${id}`, updateProduct);
  return response.data;
};

const deleteProduct = async(id) =>{
  const response = await axios.delete(`${apiProductsUrl}/${id}`);
  return response.data;
};

export {
  getAllProducts,
  getProductById,
  createProducts,
  updateProduct,
  deleteProduct
};