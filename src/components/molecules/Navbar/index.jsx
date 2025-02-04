import { useContext } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCartContext } from '../../../context/ShoppingCartContext';


const Navbar = () => {
  const context = useContext(ShoppingCartContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  

  return (
    <nav className="flex justify-between items-center fixed w-full z-10 top-0 bg-black p-4">
      <ul className="flex items-center space-x-6">
        <li className='text-xl'>
          <NavLink
            to="/"
            className="text-white"
          >
            MieMakeup
          </NavLink>
        </li>
    
        
      </ul>

      <ul className="flex items-center space-x-6">
        <li className="text-white">client@mail.com</li>
        <li className='hover:bg-violet-900'>
          <NavLink
            to="/my-orders"
            className={({ isActive }) =>
              isActive ? "bg-violet-900" : "text-white"
            } 
          >
            My Orders
          </NavLink>
        </li>
        <li className='hover:bg-violet-900'>
          <NavLink
            to="/my-account"
            className={({ isActive }) =>
              isActive ? "bg-violet-900" : "text-white"
            }
          >
            My Account
          </NavLink>
        </li>
        <li className='hover:bg-violet-900 '>
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive ? "bg-violet-900" : "text-white"
            }
          >
            Sign In
          </NavLink>
        </li>
        <li className="text-white ">🛒 {context.count}</li>
      </ul>
    </nav>
  );
};

export default Navbar;
