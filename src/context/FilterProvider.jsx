import React, {  useState} from 'react';



export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 100], 
    featured: false,
  });

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  );
};



