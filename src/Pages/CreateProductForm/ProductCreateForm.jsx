import { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { useParams } from "react-router-dom";



function ProductCreateForm({productToEdit}) {
  const { productId } = useParams();
  const { products, createProduct, updateProductById} = useContext(ProductContext); 

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImage] = useState('');
  const [featured, setFeatured] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [imageUrlError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const categories = [
    { id: 1, name: 'Lipstick' },
    { id: 2, name: 'Mascara' },
    { id: 3, name: 'Blush' },
    { id: 4, name: 'Highlighter' },
    { id: 5, name: 'Eyeshadow' },
    { id: 6, name: 'Setting Spray' },
    { id: 7, name: 'Eyebrow Products' },
    { id: 8, name: 'Concealer' },
    { id: 9, name: 'Nail Polish' },
    { id: 10, name: 'Makeup Brushes' },
    { id: 11, name: 'Primer' },
    { id: 12, name: 'Brow Pencil' },
    { id: 13, name: 'Makeup Remover' },
  ];

  useEffect(() => {
    if (productId) {
      const foundProduct = products.find((p) => p.id === Number(productId));
      if (foundProduct) {
        setName(foundProduct.name);
        setPrice(foundProduct.price);
        setImage(foundProduct.imageUrl);
        setFeatured(foundProduct.featured);
        setCategoryId(foundProduct.categoryId);
        setDescription(foundProduct.description);
        setIngredients(foundProduct.ingredients);
      }
    }
  }, [productId, products]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price || !imageUrl || !categoryId) {
      setModalMessage('All fields are required.');
      setIsModalOpen(true);
      return;
    }

    if (isNaN(price) || price <= 0) {
      setModalMessage('Price must be a positive number.');
      setIsModalOpen(true);
      return;
    }

    const productData = {
      id: productId ? Number(productId) : Date.now(),
      name,
      price: parseFloat(price),
      imageUrl,
      featured,
      categoryId,
      description,
      ingredients,
      categoryName: categories.find((cat) => cat.id === categoryId)?.name || "",
    };

    if (productId) {
      updateProductById(productData); 
      setModalMessage('Product updated successfully.');
    } else {
      createProduct(productData);
      setModalMessage('Product created successfully.');
    }

    setName('');
    setPrice('');
    setImage('');
    setFeatured(false);
    setCategoryId('');
    setDescription('');
    setIngredients('');
    setImageError(false);
    setIsModalOpen(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-5 border border-gray-300 rounded-lg shadow-lg bg-gray-700">
      <h2 className="text-2xl font-semibold mb-5 text-center text-white">
        {productToEdit ? 'Edit Product' : 'Create New Product'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-white">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-white">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-white">Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {imageUrl && (
          <div className="mb-4">
            <img
              src={imageUrl}
              alt="Product Preview"
              className="w-full h-auto rounded-lg"
              onError={handleImageError}
              onLoad={handleImageLoad}
              style={{ display: imageUrlError ? 'none' : 'block' }}
            />
            {imageUrlError && <p className="text-red-500">Invalid image URL</p>}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="category" className="block bg-grey-600 text-white ">Category</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-4 py-2 mt-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
            required
          >
            <option value="" className='bg-grey-600 text-black'>Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id} className='bg-grey-900 text-black'>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-white">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-white">Ingredients</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter product ingredients"
            className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4 flex items-center">
          <label htmlFor="featured" className="mr-2 text-white">Featured</label>
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={() => setFeatured(!featured)}
            className="rounded-full w-6 h-6 border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {productId ? 'Update Product' : 'Create Product'}
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold text-center text-gray-800">{modalMessage === 'Product created successfully.' ? 'Success' : 'Error'}</h3>
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
}

export default ProductCreateForm;
