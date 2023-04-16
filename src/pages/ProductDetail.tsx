import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { getProduct } from "../api";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/swiper-bundle.min.css";
import SliderController from "../components/sliderController/SliderController";
import { useState } from "react";
import { Controller, Autoplay } from "swiper";
import RatingBar from "../components/ratingBar/RatingBar";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperCore | null>(
    null
  );

  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:items-start gap-16 md:gap-24">
      <div className="flex flex-col md:self-auto w-250px lg:w-294px">
        <div className="shadow-3xl">
          <Swiper
            className="w-full"
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Controller, Autoplay]}
            onSwiper={setControlledSwiper}
          >
            {images.map((imageSrc) => (
              <SwiperSlide className="h-full w-full" key={imageSrc}>
                <img
                  className="bg-white w-full h-250px lg:h-294px object-contain "
                  alt={title}
                  src={imageSrc}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <SliderController
          className="self-center mt-6 lg:m-9"
          activeIndex={activeIndex}
          slidesCount={images.length}
          swiper={controlledSwiper}
        />
      </div>

      <div className="flex flex-col justify-center items-center md:items-start">
        <div className="flex flex-col items-center md:items-start">
          <div className="font-semibold text-2xl">{title}</div>
          <div className="font-extralight text-2xl">€{price}</div>
        </div>

        <ProductField name="DESCRIZIONE" value={description} />
        <ProductField name="BRAND" value={brand} />
        <ProductField name="CATEGORIA" value={category} />
        <div className="mt-6">
          <RatingBar value={rating} />
        </div>
        <div className="w-fit p-3.5 font-semibold text-xl mt-12 bg-black text-white rounded-3xl md:rounded cursor-pointer transition-transform hover:scale-105 active:scale-100">
          AGGIUNGI AL CARRELLO
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
