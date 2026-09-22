import { createBrowserRouter } from "react-router";
import RootLayout from "../../layouts/RootLayout/RootLayout";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import Home from "../../pages/Home/Home";
import AllProducts from "../../pages/AllProducts/AllProducts";
import MyProducts from "../../pages/MyProducts/MyProducts";
import MyBids from "../../pages/MyBids/MyBids";
import CreateProducts from "../../pages/CreateProducts/CreateProducts";
import Error from "../../pages/Error/Error";
import ProductDetails from "../../pages/ProductDetails/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "allproducts",
        loader:()=>fetch("http://localhost:3000/products"),
        Component: AllProducts,
      },
      {
        path: "myproducts",
        Component: MyProducts,
      },
      {
        path: "mybids",
        Component: MyBids,
      },
      {
        path: "createproducts",
        Component: CreateProducts,
      },
      {
        path:"productdetails/:id",
        loader:({params})=>fetch(`http://localhost:3000/products/${params.id}`),
        Component:ProductDetails
      }
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        index: true,
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/*",
    Component: Error,
  },
]);

export default router;
