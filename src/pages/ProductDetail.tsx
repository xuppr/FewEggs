import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getProduct } from "../api";

interface ProductDetailData {
  id: number;
  title: string;
  price: number;
  description: string;
  brand: string;
  category: string;
  rating: number;
  images: string[];
}

export const productDetailLoader = async ({
  params: { productId },
}: LoaderFunctionArgs): Promise<ProductDetailData> => {
  const data = getProduct(productId!);

  return data;
};

const ProductDetail = () => {
  const { title, price, description, brand, category, rating, images } =
    useLoaderData() as ProductDetailData;

  return (
    <div>
      <img alt={title} src={images[0]} />
      <div>Product Detail</div>
      <div>title: {title}</div>
      <div>price: {price}$</div>
      <div>description: {description}</div>
      <div>brand: {brand}</div>
      <div>category: {category}</div>
      <div>rating: {rating}</div>
    </div>
  );
};

export default ProductDetail;
