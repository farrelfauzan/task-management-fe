import { AppsOutline, LogOutOutline, SettingsOutline } from "react-ionicons";
import { useDispatch } from "react-redux";
import { sessionData, setSession } from "../../lib/features/session/session";
import { useCookies } from "react-cookie";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { Users2Icon } from "lucide-react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();

  const session = useSelector(sessionData);

  const [cookies, setCookie, removeCookie] = useCookies(["_auth_token"]);

  function onLogout() {
    dispatch(setSession({ user: null, role: null, isLoggedIn: false }));
    removeCookie("_auth_token");
  }
  const navLinksAdmin = [
    {
      title: "Boards",
      icon: <AppsOutline color="#555" width="22px" height="22px" />,
      active: window.location.pathname === "/app/boards",
      link: "/app/boards",
    },
    {
      title: "User Management",
      icon: <Users2Icon color="#555" width="22px" height="22px" />,
      active: window.location.pathname === "/app/user-management",
      link: "/app/user-management",
    },
    {
      title: "Settings",
      icon: <SettingsOutline color="#555" width="22px" height="22px" />,
      active: window.location.pathname === "/app/settings",
      link: "/app/settings",
    },
  ];

  const navLinksUser = [
    {
      title: "Boards",
      icon: <AppsOutline color="#555" width="22px" height="22px" />,
      active: window.location.pathname === "/app/boards",
      link: "/app/boards",
    },
    {
      title: "Settings",
      icon: <SettingsOutline color="#555" width="22px" height="22px" />,
      active: window.location.pathname === "/app/settings",
      link: "/app/settings",
    },
  ];
  return (
    <div className="fixed left-0 top-0 md:w-[230px] w-[60px] overflow-hidden h-full flex flex-col">
      <div className="w-full flex items-center md:justify-start justify-center md:pl-5 h-[70px] bg-[#fff]">
        <span className="text-orange-400 font-semibold text-2xl md:block hidden">
          EZ<span className="text-blue-400 font-semibold text-2xl">Task</span>
        </span>
        <span className="text-orange-400 font-semibold text-2xl md:hidden block">
          EZ
        </span>
      </div>
      <div className="w-full h-[calc(100vh-70px)] border-r flex flex-col md:items-start items-center gap-2 border-slate-300 bg-[#fff] py-5 md:px-3 px-3 relative">
        {session.role === "admin" &&
          navLinksAdmin.map((link) => (
            <Link
              to={link.link}
              key={link.title}
              className={`flex items-center gap-2 w-full rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer ${
                link.active ? "bg-orange-300" : "bg-transparent"
              }`}
            >
              {link.icon}
              <span className="font-medium text-[15px] md:block hidden">
                {link.title}
              </span>
            </Link>
          ))}
        {session.role === "user" &&
          navLinksUser.map((link) => (
            <Link
              to={link.link}
              key={link.title}
              className={`flex items-center gap-2 w-full rounded-lg hover:bg-orange-300 px-2 py-3 cursor-pointer ${
                link.active ? "bg-orange-300" : "bg-transparent"
              }`}
            >
              {link.icon}
              <span className="font-medium text-[15px] md:block hidden">
                {link.title}
              </span>
            </Link>
          ))}

        <div
          className="flex absolute bottom-4 items-center md:justify-start justify-center gap-2 md:w-[90%] w-[70%] rounded-lg hover:bg-red-300 px-2 py-3 cursor-pointer bg-gray-200"
          onClick={onLogout}
        >
          <LogOutOutline />
          <span className="font-medium text-[15px] md:block hidden">
            Log Out
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
