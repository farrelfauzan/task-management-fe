import Layout from "../layout";
import Boards from "../pages/Boards";
import Login from "../components/auth/login";
import { Navigate, RouteObject } from "react-router-dom";
import AuthLayout from "../layout/auth";
import Register from "../components/auth/register";
import Settings from "../pages/Settings";

const routes = (isLoggedIn: boolean): RouteObject[] => {
  console.log(isLoggedIn);
  return [
    {
      path: "/", // Public route
      element: isLoggedIn ? (
        <Navigate to="/app/boards" />
      ) : (
        <Navigate to="/login" />
      ),
    },
    {
      path: "/app", // Protected route
      element: isLoggedIn ? <Layout /> : <Navigate to="/login" />,
      children: [
        {
          path: "boards",
          element: <Boards />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "user-management",
          element: <div>User Management</div>,
        },
      ],
    },
    {
      path: "/register",
      element: <AuthLayout />,
      children: [
        {
          path: "",
          element: <Register />,
        },
      ],
    },
    {
      path: "/login", // Public route
      element: isLoggedIn ? <Navigate to="/app/boards" /> : <AuthLayout />,
      children: [
        {
          path: "",
          element: <Login />,
        },
      ],
    },
  ];
};

export default routes;
