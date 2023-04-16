export interface ProductCardProps {
  title: string;
  brand: string;
  imageSrc: string;
}

const ProductCard = ({ title, brand, imageSrc }: ProductCardProps) => (
  <div
    className={`
        flex flex-col 
        justify-center 
        items-center 
        w-250px 
        lg:w-294px 
        cursor-pointer 
        transition-transform ease-in-out 
        hover:scale-105
  `}
  >
    <img
      className="bg-white h-250px w-250px lg:h-294px lg:w-294px object-contain shadow-3xl"
      alt={title}
      src={imageSrc}
    />
    <div className="font-semibold mt-4">{title}</div>
    <div className="font-extralight">{brand}</div>
  </div>
);

export default ProductCard;
