import { render, screen } from "@testing-library/react";
import ProductDetail from "./ProductDetail";

test("renders details for a product", () => {
  render(<ProductDetail />);
  const textElement = screen.getByText("Product Detail");
  expect(textElement).toBeInTheDocument();
});
