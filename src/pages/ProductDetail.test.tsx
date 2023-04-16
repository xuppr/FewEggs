import { render, screen, waitFor } from "@testing-library/react";
import ProductDetail, { productDetailLoader } from "./ProductDetail";
import {
  LoaderFunctionArgs,
  Params,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { getProduct } from "../api";

jest.mock("../api/index.ts", () => {
  return {
    getProduct: jest.fn(),
  };
});

test("product page loader", async () => {
  (getProduct as jest.Mock).mockReturnValue({
    title: "Foo",
    price: 259,
    description: "Foo product by FooBrand",
    brand: "FooBrand",
    category: "FooCategory",
    images: ["srcA", "srcB"],
  });

  const value = await productDetailLoader({
    params: { productId: "1" } as Params,
  } as LoaderFunctionArgs);

  expect(value).toEqual({
    title: "Foo",
    price: 259,
    description: "Foo product by FooBrand",
    brand: "FooBrand",
    category: "FooCategory",
    images: ["srcA", "srcB"],
  });
});

test("renders details for a product", async () => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <ProductDetail />,
        loader: () => ({
          title: "FooTitle",
          price: 259,
          description: "Foo product by FooBrand",
          brand: "FooBrand",
          category: "FooCategory",
          images: [""],
        }),
      },
    ],
    { initialEntries: ["/"] }
  );

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    const titleElement = screen.getByText(/FooTitle/i);
    expect(titleElement).toBeInTheDocument();
  });

  const priceElement = screen.getByText(/259/i);
  expect(priceElement).toBeInTheDocument();

  const descriptionElement = screen.getByText(/Foo product by FooBrand/i);
  expect(descriptionElement).toBeInTheDocument();

  const categoryElement = screen.getByText(/FooCategory/i);
  expect(categoryElement).toBeInTheDocument();

  const imageElement = screen.getByAltText(/Foo/);
  expect(imageElement).toBeInTheDocument();
});
