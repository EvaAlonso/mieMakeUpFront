import { useContext } from 'react';
import { ShoppingCartContext } from '../../context/ShoppingCartContext';
import { XMarkIcon } from '@heroicons/react/16/solid';
import "./CheckoutSideMenu.css";


const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext)
  return (
    <aside className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0 border border-black rounded-lg bg-white`}>
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-black text-xl'>My Order</h2>
        <div>
          <XMarkIcon
            className='h-6 w-6 text-black cursor-pointer'
            onClick={() => context.closeCheckoutSideMenu()}></XMarkIcon>
        </div>
      </div>
    </aside>
  )
}

export default CheckoutSideMenu;