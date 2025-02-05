import { useState } from "react";

export default function ProductFilters({ minPrice, maxPrice, onFilterChange }) {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState(false);

  const availableCategories = [
    "Foundation", "Lipstick", "Mascara", "Blush", "Bronzer", "Highlighter", "Eyeshadow", 
    "Setting Spray", "Eyebrow Products", "Concealer", "Nail Polish", "Makeup Brushes", 
    "Primer", "Brow Pencil", "Makeup Remover"
  ];

  const handlePriceChange = (event, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(event.target.value);
    setPriceRange(newRange);
    onFilterChange({ 
      priceRange: newRange, 
      categories: [...categories], 
      featured 
    });
  };

  const handleCategoryChange = (category) => {
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category];
  
      onFilterChange({ 
        priceRange, 
        categories: updatedCategories, 
        featured 
      });
  
      return updatedCategories;
    });
  };
  
  const handleFeaturedChange = () => {
    setFeatured((prevFeatured) => {
      const newFeatured = !prevFeatured;
      
      onFilterChange({ 
        priceRange, 
        categories, 
        featured: newFeatured 
      });
  
      return newFeatured;
    });
  };
  

  return (
    <div className="space-y-6 p-4 w-full max-w-xs bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2 text-white">Filters</h2>
      
      <div>
        <h3 className="text-md font-medium text-white mb-1">Price Range</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min={minPrice}
            max={maxPrice}
            value={priceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className="w-16 p-1 text-white rounded-md"
          />
          <span className="text-white">-</span>
          <input
            type="number"
            min={minPrice}
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className="w-16 p-1 text-white rounded-md"
          />
        </div>
      </div>
      
      <div className="bg-gray-800">
        <h3 className="text-md font-medium text-white mb-1">Categories</h3>
        <div className="space-y-1 bg-gray-800 text-black">
          {availableCategories.map((category) => (
            <div key={category} className="flex items-center bg-gray-800 text-black">
              <input
                type="checkbox"
                id={category}
                checked={categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="w-4 h-4 bg-gray-800"
              />
              <label
                htmlFor={category}
                className="ml-2 text-sm font-medium text-white bg-gray-800"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-md font-medium text-white mb-1">Featured</h3>
        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="featured" 
            checked={featured} 
            onChange={handleFeaturedChange} 
            className="w-4 h-4"
          />
          <label
            htmlFor="featured"
            className="ml-2 text-sm font-medium text-white"
          >
            Show only featured products
          </label>
        </div>
      </div>
    </div>
  );
}