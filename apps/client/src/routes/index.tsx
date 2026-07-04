import { createBrowserRouter, Navigate } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [{ path: "/dashboard", element: <Dashboard /> }],
  },
  {
    path: "*",
    element: <div className="p-8 text-red-500">404 Not Found</div>,
  },
]);
