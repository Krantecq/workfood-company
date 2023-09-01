import { lazy, Suspense } from "react";
import { Outlet, useRoutes, Navigate } from "react-router-dom";
import { Loader } from "../components";
import AuthGuard from "../components/guards/AuthGuard";
import GuestGuard from "../components/guards/GuestGuard";
import MainLayout from "../layout/MainLayout";
import { PATH_AUTH } from "./paths";

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          element: <Dashboard />,
          index: true,
        },
        { path: "orders", element: <Orders /> },
        { path: "menus", element: <Menu /> },
        { path: "employees", element: <User /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/",
      element: <Outlet />,
      children: [
        { element: <Navigate to={PATH_AUTH.login} replace />, index: true },
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
    { path: "404", element: <NotFound /> },
  ]);
}

const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
const User = Loadable(lazy(() => import("../pages/users")));
const Orders = Loadable(lazy(() => import("../pages/orders")));
const Menu = Loadable(lazy(() => import("../pages/menus")));

// AUTH

const Login = Loadable(lazy(() => import("../pages/auth/login")));

const NotFound = Loadable(lazy(() => import("../pages/notFound")));
