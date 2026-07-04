import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../utils/auth.utils";

export const AdminRoute = () => {
  const user = getUser();
  if (user?.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};
