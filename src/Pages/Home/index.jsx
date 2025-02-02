import { useContext } from "react";
import ProductCard from "../../components/organism/ProductCard";

import { ProductContext } from "../../context/ProductContext";

const Home = () => {
  const {products} = useContext(ProductContext);
  return (
   
      <div className="mt-20 text-white">
        <div className="grid grid-cols-3 gap-5 md:grid-cols-2 sm:grid-cols-1 xl:grid-cols-3">
          {products.map(product => (
            <div key={product.id}>
              <ProductCard product = {product}/>
            </div>
            
          ))}
        </div>
        
        
      </div>
    
    
  )
}

export default Home;