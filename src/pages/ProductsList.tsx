import { useLoaderData } from "react-router-dom";
import { getAllProducts } from "../api";
import ProductCard from "../components/productCard/ProductCard";

interface ProductType {
  title: string;
  brand: string;
  thumbnail: string;
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
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-9 md:gap-y-4 lg:grid-cols-3">
        {data.products.map(({ title, brand, thumbnail, id }) => (
          <ProductCard
            title={title}
            brand={brand}
            imageSrc={thumbnail}
            key={id}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
