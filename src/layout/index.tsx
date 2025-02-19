import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";

const Layout = () => {
  return (
    <div className="w-screen h-screen relative">
      <Navbar />
      <Sidebar />
      <div className="md:pl-[250px] pl-[60px] pr-[20px] pt-[70px] w-fill h-full overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
