import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

export const rootLoader = async () => true;

const Root = () => (
  <div className="flex w-full justify-center">
    <div className="w-full px-4 py-4 md:py-6 md:max-w-screen-2xl">
      <Header />
      <Outlet />
    </div>
  </div>
);
export default Root;
