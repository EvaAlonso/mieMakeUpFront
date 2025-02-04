import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import MyAccount from "../Pages/MyAccount";
import MyOrder from "../Pages/MyOrder";
import MyOrders from "../Pages/MyOrders";
import NotFound from "../Pages/NotFound";
import SignIn from "../Pages/SignIn";
import Layout from "../layout/Layout";
import React from 'react'
import ProductDetail from "../Pages/ProductDetail/ProductDetail";
import ProductTable from "../Pages/ProductTable/ProductTable";
import ProductCreateForm from "../Pages/CreateProductForm/ProductCreateForm";




export const router = createBrowserRouter([
  { 
    path: "/",
    element:<Layout/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/my-account",
        element: <MyAccount/>
      },
      {
        path: "/my-order",
        element: <MyOrder/>
      },
      {
        path: "/my-orders",
        element: <MyOrders/>
      },
      {
        path: "/signin",
        element: <SignIn/>
      },
      {
        path:"/:productId",
        element: <ProductDetail/>
      },
      {
        path:"/admin",
        element: <ProductTable/>
      },
      {
        path:"/create-product",
        element: <ProductCreateForm/>
      },
      {
        path: "/edit-product/:productId",
        element: <ProductCreateForm />,
      }
    ]
  },
  {
    path: "*",
    element:<NotFound/>
  }
])