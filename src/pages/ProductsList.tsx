import { useLoaderData } from "react-router-dom";
import { getAllProducts } from "../api";

interface ProductType {
  title: string;
  id: number;
}

interface ProductListData {
  products: ProductType[];
}

export const productsListLoader = async (): Promise<ProductListData> => {
  const productsListData = await getAllProducts();
  return productsListData;
};

const ProductsList = () => {
  const data = useLoaderData() as ProductListData;
  return (
    <div>
      {data.products.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
};

export default ProductsList;
