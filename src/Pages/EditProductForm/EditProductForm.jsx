import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiProductsUrl = "http://localhost:8080/api/products";

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    id: id,
    title: "",
    price: "",
    imageUrl: "",
    featured: false,
    categoryId: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [categories, setCategories] = useState([]);
  const [imageUrlError, setImageUrlError] = useState(false);

  useEffect(() => {
   
    axios
      .get(`${apiProductsUrl}/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));

 
    axios
      .get("http://localhost:8080/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setProduct((prevData) => ({
        ...prevData,
        [name]: checked,
    }));
};
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${apiProductsUrl}/${id}`, product)
      .then((res) => {
        setModalMessage("Producto modificado con éxito");
        setIsModalOpen(true);
      })
      .catch((err) => {
        setModalMessage("Error al modificar el producto.");
        setIsModalOpen(true);
      });
  };

  const handleImageError = () => {
    setImageUrlError(true);
  };

  const handleImageLoad = () => {
    setImageUrlError(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-5 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-semibold mb-5 text-center text-gray-800">
        Update Product
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-800">
            Name
          </label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            placeholder="Enter the product name"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-800">
            Price
          </label>
          <input
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            placeholder="Enter the price"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-800">
            Image Url
          </label>
          <input
            type="url"
            value={product.imageUrl}
            onChange={(e) =>
              setProduct({ ...product, imageUrl: e.target.value })
            }
            placeholder="Enter the image Url"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {product.imageUrl && (
          <div className="mb-4">
            <img
              src={product.imageUrl}
              alt="Preview"
              className="w-full h-auto rounded-lg"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ display: imageUrlError ? "none" : "block" }}
            />
            {imageUrlError && (
              <p className="text-red-500">URL image not valid</p>
            )}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-800">
            Category
          </label>
          <select
            id="category"
            value={product.categoryId}
            onChange={(e) =>
              setProduct({ ...product, categoryId: e.target.value })
            }
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex items-center">
          <label htmlFor="featured" className="mr-2 text-gray-800">
            Featured
          </label>
          <input
            type="checkbox"
            id="featured"
            checked={product.featured}
            onChange={() =>
              setProduct({ ...product, featured: !product.featured })
            }
            className="rounded-full w-6 h-6 border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Product
        </button>
      </form>

      <Link to={"/admin"}>
        <button className="w-full mt-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none">
          Cancel
        </button>
      </Link>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold text-center text-gray-800">
              {modalMessage === "Producto modificado con éxito"
                ? "Éxito"
                : "Error"}
            </h3>
            <p className="text-center text-gray-600 mt-2">{modalMessage}</p>
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProductForm;
