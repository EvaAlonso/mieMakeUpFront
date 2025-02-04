import { useState, useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import ProductFilters from "../../components/organism/Productfilters";
import ProductCard from "../../components/organism/ProductCard";


const Home = () => {
  const { products } = useContext(ProductContext);
  const [ filters, setFilters ] = useState({
    priceRange: [ 0, 100 ],
    categories: [],
    featured: false,
  });

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  const filteredProducts = products.filter((product) => {
    const inPriceRange =
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1];
    
    const inCategory =
      filters.categories.length === 0 || 
      filters.categories.includes(product.categoryName);
  
    const isFeatured = !filters.featured || product.featured;
  
    return inPriceRange && inCategory && isFeatured;
  });

  return (
    <div className="mt-20 text-white">
      <div className="grid grid-cols-3 gap-5 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3">
        <ProductFilters
          minPrice={0}
          maxPrice={100}
          onFilterChange={handleFilterChange}
        />
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-white col-span-3">No products found</p>
        )
        }
      </div>
    </div>
  );
};

;

export default Home;