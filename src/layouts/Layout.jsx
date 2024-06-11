import { Outlet } from "react-router-dom";
import Navigation from "./common/Navigation/Navigation";

function Layout() {
  return (
    <div>
      <Navigation />
      <div className="max-w-[800px] mx-auto w-full mt-20">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
