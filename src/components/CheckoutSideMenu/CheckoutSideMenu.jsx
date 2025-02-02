import { useContext } from 'react';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import OrderCard from '../organism/OrderCard';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { totalPrice } from '../../utils';
import "./CheckoutSideMenu.css";


const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);

  const handleDelete = (id) =>{
    const filteredProducts = context.cartProducts.filter(product => product.id != id)
    context.setCartProducts(filteredProducts)
  }
 
  return (
    <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-gray-900`}>
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-white text-xl'>My Order</h2>
        <div>
          <XMarkIcon
            className='h-6 w-6 text-white cursor-pointer'
            onClick={() => context.closeCheckoutSideMenu()}></XMarkIcon>
        </div>
      </div>
      <div className='px-6 overflow-y-scroll'>
        {
          context.cartProducts.map(product => (
            <OrderCard
              key={product.id }
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.price}
              handleDelete={handleDelete}
            />
          ))
        }
      </div>
      <div className='px-6'>
        <p className='flex justify-between items-center text-white'>
          <span className='font-light text-white text-2xl'>Total:</span>
          <span className='font-medium text-2xl'>{totalPrice(context.cartProducts)} €</span>
        </p>
      </div>
    </aside>
  )
}

export default CheckoutSideMenu;