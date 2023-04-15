import { render, screen } from "@testing-library/react";
import ProductsList from "./ProductsList";

test("renders a list of products", () => {
  render(<ProductsList />);
  const textElement = screen.getByText("Products List");
  expect(textElement).toBeInTheDocument();
});
