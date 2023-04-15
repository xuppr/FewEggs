import { Outlet } from "react-router-dom";

export const rootLoader = async () => true;

const Root = () => (
  <div>
    <Outlet />
  </div>
);
export default Root;
