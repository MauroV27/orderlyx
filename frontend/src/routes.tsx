import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import OrdersPage from "./pages/home/orders";
import ProductsPage from "./pages/home/products";
import DashboardPage from "./pages/home/dashboard";
import HomePage from "./pages/home";

function PrivateRoute() {
  const isAuthenticated = !!localStorage.getItem("access_token");
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function PublicRoute() {
  const isAuthenticated = !!localStorage.getItem("access_token");
  return isAuthenticated ? <Navigate to="/home" replace /> : <Outlet />;
}

function DefaultRoute() {
  const isAuthenticated = !!localStorage.getItem("access_token");
  return <Navigate to={isAuthenticated ? "/home" : "/login"} replace />;
}

const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
    ],
  },
  {
    path: "/home",
    element: <PrivateRoute />, // 🔐 Protege as rotas privadas
    children: [
      {
        element: <HomePage />,
        children: [
          { path: "orders", element: <OrdersPage /> },
          { path: "products", element: <ProductsPage /> },
          { path: "dashboard", element: <DashboardPage /> },
          { index: true, element: <OrdersPage /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <DefaultRoute />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
