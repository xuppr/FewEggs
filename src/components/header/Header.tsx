import { useContext } from "react";
import { ReactComponent as Bag } from "../../icons/bag.svg";

import { Link } from "react-router-dom";
import RootContext from "../../context/RootContext";

const Header = () => {
  const { selectedProductsCount } = useContext(RootContext);

  return (
    <header className="flex items-center justify-between py-7">
      <Link to="/products" className="font-semibold text-2xl cursor-pointer">
        FewEggs
      </Link>
      <div className="flex items-center gap-10">
        <Link to="/products" className="text-xl cursor-pointer">
          SHOP
        </Link>
        <div className="relative flex justify-center mb-1.5">
          <Bag />
          <label className="top-1 absolute">{selectedProductsCount}</label>
        </div>
      </div>
    </header>
  );
};

export default Header;
