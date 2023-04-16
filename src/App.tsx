import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { rootLoader } from "./pages/Root";
import ProductsList, { productsListLoader } from "./pages/ProductsList";
import ProductDetail, { productDetailLoader } from "./pages/ProductDetail";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    loader: rootLoader,
    element: <Root />,
    errorElement: <Error />,
    children: [
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
  return <RouterProvider router={router} />;
}

export default App;
