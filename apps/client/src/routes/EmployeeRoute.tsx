import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "../utils/auth.utils";

export const EmployeeRoute = () => {
  const user = getUser();
  if (user?.role !== "EMPLOYEE") {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};
