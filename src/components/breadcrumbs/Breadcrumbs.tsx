import { ReactComponent as Arrow } from "../../icons/arrow.svg";

interface BreadcrumbsProps {
  className?: string;
  category: string;
  productTitle: string;
}

const Breadcrumbs = ({
  className,
  category,
  productTitle,
}: BreadcrumbsProps) => (
  <div className={`flex gap-2 items-center ${className ? className : ""}`}>
    <div className="font-light text-sm">CATEGORIA</div>
    <Arrow />
    <div className="font-light text-sm">{category.toUpperCase()}</div>
    <Arrow />
    <div className="font-light text-sm">{productTitle.toUpperCase()}</div>
  </div>
);

export default Breadcrumbs;
