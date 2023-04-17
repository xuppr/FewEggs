import { render, screen, waitFor } from "@testing-library/react";
import ProductsList, { productsListLoader } from "./ProductsList";
import {
  LoaderFunctionArgs,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { getAllProducts } from "../api";

jest.mock("../api", () => {
  return {
    getAllProducts: jest.fn(),
  };
});

test("product list page loader", async () => {
  (getAllProducts as jest.Mock).mockReturnValue({
    products: [
      { title: "title0", id: 0 },
      { title: "title1", id: 1 },
    ],
  });
  const result = await productsListLoader({
    request: new Request(""),
  } as LoaderFunctionArgs);
  expect(result).toEqual({
    products: [
      { title: "title0", id: 0 },
      { title: "title1", id: 1 },
    ],
  });
});

test("renders a list of products", async () => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <ProductsList />,
        loader: () => ({
          products: [
            { title: "Product One", id: 1 },
            { title: "Product Two", id: 2 },
          ],
        }),
      },
    ],
    { initialEntries: ["/"] }
  );

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    const listElementOne = screen.getByText("Product One");
    expect(listElementOne).toBeInTheDocument();
  });

  await waitFor(() => {
    const listElementTwo = screen.getByText("Product Two");
    expect(listElementTwo).toBeInTheDocument();
  });
});
