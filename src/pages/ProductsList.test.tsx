import { render, screen, waitFor } from "@testing-library/react";
import ProductsList from "./ProductsList";
import { RouterProvider, createMemoryRouter } from "react-router-dom";

jest.mock("../api", () => {
  return {
    getAllProducts: jest.fn(),
    getProductsByCategory: jest.fn().mockResolvedValue({
      products: [
        { title: "title0", id: 0 },
        { title: "title1", id: 1 },
      ],
    }),
  };
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
