
import { Outlet } from 'react-router-dom'
import Navbar from '../components/molecules/Navbar'
import ProductProvider from '../context/ProductProvider'

const Layout = () => {
  return (
    <ProductProvider>
      <div className='flex flex-col items-center'>

        <Navbar className="text-white" />
        <Outlet />
      </div>
    </ProductProvider>


  )
}

export default Layout