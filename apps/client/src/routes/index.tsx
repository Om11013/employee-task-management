import { createBrowserRouter, Navigate } from "react-router-dom";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminRoute } from "./AdminRoute";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import Dashboard from "../pages/Dashboard";
import { AppLayout } from "../components/layout/AppLayout";
import Employees from "../features/employee/pages/Employees";

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
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          {
            element: <AdminRoute />,
            children: [{ path: "/employees", element: <Employees /> }],
          },
          {
            path: "/tasks",
            element: <div className="p-8">Tasks (Coming Soon)</div>,
          },
          {
            path: "/reports",
            element: <div className="p-8">Reports (Coming Soon)</div>,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <div className="p-8 text-red-500">404 Not Found</div>,
  },
]);
