import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import RootContext from "./context/RootContext";
import Root, { rootLoader } from "./pages/Root";
import ProductsList, { productsListLoader } from "./pages/ProductsList";
import ProductDetail, { productDetailLoader } from "./pages/ProductDetail";
import Error from "./pages/Error";
import { useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    loader: rootLoader,
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: async () => redirect("/products"),
      },
      {
        path: "/products",
        loader: productsListLoader,
        element: <ProductsList />,
      },
      {
        path: "/products/:productId",
        loader: productDetailLoader,
        element: <ProductDetail />,
      },
    ],
  },
]);

function App() {
  const [selectedProductsCount, setSelectedProductsCount] = useState(0);

  return (
    <RootContext.Provider
      value={{ selectedProductsCount, setSelectedProductsCount }}
    >
      <RouterProvider router={router} />
    </RootContext.Provider>
  );
}

export default App;
