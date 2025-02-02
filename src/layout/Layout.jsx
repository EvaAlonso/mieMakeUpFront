import { ShoppingCartProvider } from "../context/ShoppingCartProvider";
import { Outlet } from 'react-router-dom';
import CheckoutSideMenu from "../components/CheckoutSideMenu/CheckoutSideMenu";
import Navbar from '../components/molecules/Navbar'
import ProductProvider from '../context/ProductProvider'
import Footer from '../components/molecules/Footer/Footer'

const Layout = () => {
  return (
    <ProductProvider>
      <ShoppingCartProvider>
      <div className='flex flex-col items-center'>
        <Navbar className="text-white" />
        <CheckoutSideMenu/>
        <Outlet />
        <Footer/>
      </div>
      </ShoppingCartProvider>
    </ProductProvider>


  )
}

export default Layout