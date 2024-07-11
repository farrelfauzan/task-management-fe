import { SettingsOutline } from "react-ionicons";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="md:w-[calc(100%-230px)] w-[calc(100%-60px)] fixed flex items-center justify-between pl-2 pr-6 h-[70px] top-0 md:left-[230px] left-[60px] border-b border-slate-300 bg-[#fff]">
      <div className="flex items-center gap-4">
        <Link to="/app">
          <h1 className="text-2xl font-semibold text-slate-900">
            {window.location.pathname === "/app/boards"
              ? "Boards"
              : window.location.pathname === "/app/user-management"
                ? "User Management"
                : "Settings"}
          </h1>
        </Link>
      </div>
      <div className="md:flex hidden items-center gap-4">
        <Link
          to="/app/settings"
          className="text-lg font-semibold text-slate-900"
        >
          <div className="grid place-items-center bg-gray-100 rounded-full p-2 cursor-pointer hover:bg-orange-300/50">
            <SettingsOutline color={"#444"} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
