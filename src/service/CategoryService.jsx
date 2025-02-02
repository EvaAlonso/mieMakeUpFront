import axios from "axios";

const apiCategoriesUrl = "http://localhost:8080/api/categories";

const getAllCategories = async() => {
    const response = await axios.get(apiCategoriesUrl);
    return response.data;
};

const getCategoryById = async(id) => {
    const response = await axios.get(`${apiCategoriesUrl}/${id}`);
    return response.data;
}

const createCategory = async(newCategory) => {
    const response = await axios.post(apiCategoriesUrl, newCategory);
    return response.data;
};

const updateCategory = async(id, updateCategory) => {
    const response = await axios.put(`${apiCategoriesUrl}/${id}`, updateCategory);
    return response.data;
};

const deleteCategory = async(id) => {
    const response = await axios.delete(`${apiCategoriesUrl}/${id}`);
    return response.data;
};

export {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};