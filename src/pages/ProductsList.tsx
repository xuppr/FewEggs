import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import {
  getAllProducts,
  getProductsByBrand,
  getProductsByCategory,
} from "../api";
import ProductCard from "../components/productCard/ProductCard";
import Filters from "../components/filters/Filters";

interface ProductType {
  title: string;
  brand: string;
  thumbnail: string;
  id: number;
}

interface ProductListData {
  products: ProductType[];
  activeFilter?: string[];
  notFound?: boolean;
}

export const productsListLoader = async (): Promise<ProductListData> => {
  const productsListData = await getAllProducts();
  return productsListData;
};

export const productsListFilterLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<ProductListData> => {
  let listData = null;

  if (
    params.filterName === "category" &&
    params.filterId &&
    ["laptops", "smartphones"].includes(params.filterId)
  ) {
    listData = await getProductsByCategory(params.filterId);
  } else if (
    params.filterName === "brand" &&
    params.filterId &&
    ["apple", "oppo", "samsung"].includes(params.filterId)
  ) {
    listData = await getProductsByBrand(params.filterId);
  }

  return listData
    ? {
        products: listData.products,
        activeFilter: [params.filterName!, params.filterId!],
      }
    : { products: [], notFound: true };
};

const ProductsList = () => {
  const data = useLoaderData() as ProductListData;

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Filters
        activeFilter={data.activeFilter}
        filters={[
          {
            name: "categoria",
            filterValue: "category",
            values: [
              { name: "informatica", value: "laptops" },
              { name: "telefonia", value: "smartphones" },
            ],
          },
        ]}
      />
      <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-9 md:gap-y-4 lg:grid-cols-3">
        {data.products.map(({ title, brand, thumbnail, id }) => (
          <ProductCard
            title={title}
            brand={brand}
            imageSrc={thumbnail}
            key={id}
            productId={id}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
