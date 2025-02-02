import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="flex justify-between items-center fixed w-full z-10 top-0 bg-black p-4">
      {/* Menú a la izquierda */}
      <ul className="flex items-center space-x-6">
        <li className='text-xl'>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-violet-500" : "text-white"
            }
          >
            MieMakeup
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-violet-500" : "text-white"
            }
          >
            All
          </NavLink>
        </li>       
        <li className="relative">
          <button
            onClick={toggleDropdown}
            className="text-white flex items-center focus:outline-none"
          >
            <span>Categories</span>
            <svg
              className="w-4 h-4  ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1L5 5l4-4"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 w-44 mt-2 bg-black text-white rounded-lg shadow-lg">
              <ul className="py-2 text-sm">
                <li>
                  <NavLink
                    to="/foundation"
                    className="block px-4 py-2 hover:bg-violet-500"
                  >
                    Foundation
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/lipstick"
                    className="block px-4 py-2 hover:bg-violet-500"
                  >
                    Lipstick
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/primer"
                    className="block px-4 py-2 hover:bg-violet-500"
                  >
                    Primer
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/bronzer"
                    className="block px-4 py-2 hover:bg-violet-500"
                  >
                    Bronzer
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/highlighter"
                    className="block px-4 py-2 hover:bg-violet-500"
                  >
                    Highlighter
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/setting-spray"
                    className="block px-4 py-2 hover:bg-violet-500"
                  >
                    Setting Spray
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/blush"
                    className="block px-4 py-2 hover:bg-violet-500"
                  >
                    Blush
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/eyeshadow"
                    className="block px-4 py-2 hover:bg-violet-500"
                  >
                    Eyeshadow
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/eyebrow"
                    className="block px-4 py-2 hover:bg-violet-500"
                  >
                    Eyebrow
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/concealer"
                    className="block px-4 py-2 hover:bg-violet-500"
                  >
                    Concealer
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/brow-pencil"
                    className="block px-4 py-2 hover:bg-violet-500"
                  >
                    Brow pencil
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ul>

      <ul className="flex items-center space-x-6">
        <li className="text-white">client@mail.com</li>
        <li className='hover:bg-violet-500'>
          <NavLink
            to="/my-orders"
            className={({ isActive }) =>
              isActive ? "bg-violet-800" : "text-white"
            } 
          >
            My Orders
          </NavLink>
        </li>
        <li className='hover:bg-violet-500'>
          <NavLink
            to="/my-account"
            className={({ isActive }) =>
              isActive ? "bg-violet-800" : "text-white"
            }
          >
            My Account
          </NavLink>
        </li>
        <li className='hover:bg-violet-500 '>
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              isActive ? "bg-violet-800" : "text-white"
            }
          >
            Sign In
          </NavLink>
        </li>
        <li className="text-white ">🛒 0</li>
      </ul>
    </nav>
  );
};

export default Navbar;
