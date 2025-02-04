import { useProductContext } from "../../context/ProductContext"
import { useState, useEffect } from "react"
import TextDropdown from "../../components/molecules/TextDropDown"
import EditProductBtn from "../../components/atoms/EditProductBtn"
import { TrashIcon } from "@heroicons/react/24/outline"
import CreateProductBtn from "../../components/atoms/CreateProductBtn"
import { useNavigate } from "react-router-dom"


const ProductTable = () => {
  const { products, deleteProductById, createProduct, updateProduct } = useProductContext()
  const [ filteredProducts, setFilteredProducts ] = useState(products)
  const [ categoryFilter, setCategoryFilter ] = useState("")
  const [ minPrice, setMinPrice ] = useState("")
  const [ maxPrice, setMaxPrice ] = useState("")

  useEffect(() => {
    const filtered = products.filter((product) => {
      const categoryMatch = categoryFilter ? product.categoryName === categoryFilter : true
      const priceMatch =
        (!minPrice || product.price >= Number.parseFloat(minPrice)) &&
        (!maxPrice || product.price <= Number.parseFloat(maxPrice))
      return categoryMatch && priceMatch
    })
    setFilteredProducts(filtered)
  }, [ products, categoryFilter, minPrice, maxPrice ])

  const categories = [ ...new Set(products.map((product) => product.categoryName)) ]

  
  const navigate = useNavigate();

  const handleEditClick = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20">
      <div className="flex mb-5">
      <div className="p-4 bg-white dark:bg-gray-800 w-175">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="flex flex-wrap gap-4">
          <div>
            <label
              htmlFor="category-filter"
              className="block text-sm font-medium text-white mb-1"
            >
              Category
            </label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="min-price" className="block text-sm font-medium text-white mb-1">
              Min Price (€)
            </label>
            <input
              type="number"
              id="min-price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label htmlFor="max-price" className="block text-sm font-medium text-white mb-1">
              Max Price (€)
            </label>
            <input
              type="number"
              id="max-price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>
      <CreateProductBtn  onClick={() => navigate("/create-product") } className="absolute right-3"/>
      </div>
      <table
        className="w-full text-sm text-left text-gray-500 dark:text-white"
        aria-labelledby="product-table-title"
      >
        <caption id="product-table-title" className="sr-only">
          Product Table
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
          <tr>
            <th scope="col" className="p-4">
              <span className="sr-only">Featured</span>
              <input
                id="checkbox-all-search"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                aria-label="Select all products"
              />
            </th>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Image
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Ingredients
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr
              key={product.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4 ">
                <input
                  id={`checkbox-table-search-${product.id}`}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  aria-labelledby={`product-name-${product.id}`}
                />
              </td>
              <th scope="row" className="px-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <span id={`product-name-${product.id}`}>{product.name}</span>
              </th>
              <td className="px-6 py-4">
                <img
                  className="w-20 h-12 rounded-xl"
                  src={product.imageUrl || "/placeholder.svg"}
                  alt={`${product.name} product`}
                />
              </td>
              <td className="px-6 py-4">{product.categoryName}</td>
              <td className="px-6 py-4 text-white">
                <TextDropdown product={product} textProperty="description" />
              </td>
              <td className="px-6 py-4">
                <TextDropdown product={product} textProperty="ingredients" />
              </td>
              <td className="px-6 py-4 text-xl">{product.price} €</td>
              <td className="flex items-center px-6 py-4">
                <EditProductBtn productId={product.id} onClick={() => handleEditClick(product.id)} />
                <button
                  onClick={() => deleteProductById(product.id)}
                  aria-label={`Delete ${product.name}`}
                  className="text-red-600 hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable


