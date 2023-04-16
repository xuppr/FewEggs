import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getProduct } from "../api";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
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

interface ProductFieldProps {
  name: string;
  value: string;
}

const ProductField = ({ name, value }: ProductFieldProps) => (
  <div className="mt-6 flex flex-col items-center md:items-start">
    <div className="font-semibold text-xl">{name}</div>
    <div className="font-extralight text-xl">{value}</div>
  </div>
);

const ProductDetail = () => {
  const { title, price, description, brand, category, rating, images } =
    useLoaderData() as ProductDetailData;

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:items-start gap-24">
      <div className="md:self-auto bg-white h-250px w-250px lg:h-294px lg:w-294px object-contain shadow-3xl">
        <Swiper className="h-full w-full">
          {images.map((imageSrc) => (
            <SwiperSlide className="h-full w-full" key={imageSrc}>
              <img
                className="h-full w-full object-contain"
                alt={title}
                src={imageSrc}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="flex flex-col justify-center items-center md:items-start">
        <div className="flex flex-col items-center md:items-start">
          <div className="font-semibold text-2xl">{title}</div>
          <div className="font-extralight text-2xl">€{price}</div>
        </div>

        <ProductField name="DESCRIZIONE" value={description} />
        <ProductField name="BRAND" value={brand} />
        <ProductField name="CATEGORIA" value={category} />
        <div className="mt-6">rating: {rating}</div>
        <div className="w-fit p-3.5 font-semibold text-xl mt-12 bg-black text-white rounded cursor-pointer transition-transform hover:scale-105 active:scale-100">
          AGGIUNGI AL CARRELLO
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
