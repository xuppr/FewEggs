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
  activeFilter?: string[] | null;
  notFound?: boolean;
}

export const productsListLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<ProductListData> => {
  let listData = null;
  let activeFilter = null;

  const searchParams = new URL(request.url).searchParams;
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");

  if (category && ["laptops", "smartphones"].includes(category)) {
    listData = await getProductsByCategory(category);
    activeFilter = ["category", category];
  } else if (brand && ["Apple", "Oppo", "Samsung"].includes(brand)) {
    listData = await getProductsByBrand(brand);
    activeFilter = ["brand", brand];
  } else if (!category && !brand) {
    listData = await getAllProducts();
  }

  return listData
    ? {
        products: listData.products,
        activeFilter,
      }
    : { products: [], notFound: true };
};

const ProductsList = () => {
  const data = useLoaderData() as ProductListData;

  return (
    <div className="flex flex-col justify-center items-center w-full my-4 md:my-20">
      <Filters
        className="self-start"
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
          {
            name: "brand",
            filterValue: "brand",
            values: [
              { name: "apple", value: "Apple" },
              { name: "oppo", value: "Oppo" },
              { name: "samsung", value: "Samsung" },
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
