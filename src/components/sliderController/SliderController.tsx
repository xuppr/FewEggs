import Swiper from "swiper";

interface SliderControllerProps {
  slidesCount: number;
  className?: string;
  activeIndex: number;
  swiper: Swiper | null;
}

const SliderController = ({
  slidesCount,
  className = "",
  activeIndex,
  swiper,
}: SliderControllerProps) => (
  <div className={`flex w-fit ${className}`}>
    {Array.from(Array(slidesCount).keys()).map((id) => (
      <div
        className={`${
          id > 0 ? "ml-2" : ""
        } w-2.5 h-2.5 rounded-full cursor-pointer ${
          activeIndex === id ? "bg-black" : "bg-slate-500"
        }`}
        key={id}
        onClick={() => swiper?.slideTo(id)}
      />
    ))}
  </div>
);

export default SliderController;
