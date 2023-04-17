import { Outlet } from "react-router-dom";

export const rootLoader = async () => true;

const Root = () => (
  <div className="flex w-full justify-center">
    <div className="w-full max-w-screen-2xl">
      <Outlet />
    </div>
  </div>
);
export default Root;
