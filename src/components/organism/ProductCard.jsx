import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import {ShoppingCartContext} from "../../context/ShoppingCartContext";
import { PlusIcon } from '@heroicons/react/16/solid';
import {CheckIcon }from '@heroicons/react/16/solid';

const ProductCard = ({product}) => {

  const [rating, setRating] = useState(0);

  const [averageRating, setAverageRating] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);

  const context = useContext(ShoppingCartContext)

  const handleRating = (star) => {
    setRating(star);

    const newTotalRating = averageRating * ratingsCount + star;
    const newRatingsCount = ratingsCount + 1;
    setAverageRating(newTotalRating / newRatingsCount);
    setRatingsCount(newRatingsCount);
  };

  const addProductsToCart = (event, product) => {
    event.stopPropagation()
    context.setCount(context.count + 1)
    context.setCartProducts([...context.cartProducts,product ])
    context.openCheckoutSideMenu()
    console.log("Cart ", context.cartProducts)

  }
  const renderIcon = (id) => {
    const isInCart = context.cartProducts.filter(product => product.id === id).length > 0

    if (isInCart) {
      return (
        <div
          className='absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1'>
          <CheckIcon className='h-6 w-6 text-white'></CheckIcon>
        </div>
      )
    } else {
      return (
        <div
          className='absolute top-0 right-0 flex justify-center items-center bg-black w-6 h-6 rounded-full m-2 p-1'
          onClick={(event) => addProductsToCart(event, product)}>
          <PlusIcon className='h-10 w-10 text-white'></PlusIcon>
        </div>
      )
    }
  }

  return (
    <div className="max-w-sm h-[640px] bg-black border border-gray-700 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="relative ">
        <img
          className="rounded-t-lg w-full"
          src={product.imageUrl}
          alt={product.name}
        />
        {renderIcon(product.id)}
      </div>

      <div className="p-5 text-white">
        
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{product.name}</h5>
        
        <p className="mb-3 text-sm font-normal">{product.description}</p>
        <div className="flex mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              xmlns="http://www.w3.org/2000/svg"
              fill={star <= rating ? "currentColor" : "none"}
              stroke="currentColor"
              className={`w-4 h-4 cursor-pointer ms-1.5 ${star <= rating ? "text-yellow-300" : "text-gray-400"}`}
              viewBox="0 0 22 20"
              strokeWidth="2"
              onClick={() => handleRating(star)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
              />
            </svg>
          ))}
        </div>
        <p className="text-2xl font-semibold mb-4">{product.price} €</p>
        <Link 
        to={`/${product.id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-lime-950 rounded-lg hover:bg-lime-950 focus:ring-4 focus:outline-none focus:ring-violet-300 dark:bg-violet-900 dark:hover:bg-violet-700 dark:focus:ring-violet-800">
        Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
        <p className="mt-3 text-sm text-white">Average rating: {averageRating.toFixed(1)} ({ratingsCount} votes)</p>
      </div>
    </div>
  );
};

export default ProductCard;