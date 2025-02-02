import { useState } from "react";
import {ShoppingCartContext } from "./ShoppingCartContext";

export const ShoppingCartProvider = ({children}) => {

  const [count, setCount] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);

  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

  

  return (
    <ShoppingCartContext.Provider value = {{
      count,
      setCount,
      cartProducts,
      setCartProducts,
      isCheckoutSideMenuOpen,
      openCheckoutSideMenu,
      closeCheckoutSideMenu
    }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

