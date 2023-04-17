import { ReactComponent as Bag } from "../../icons/bag.svg";

import { Link } from "react-router-dom";

const Header = () => {
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
          <label className="top-1 absolute">0</label>
        </div>
      </div>
    </header>
  );
};

export default Header;
