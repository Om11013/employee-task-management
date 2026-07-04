import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken, isTokenExpired } from "../utils/auth.utils";

export const PublicRoute = () => {
  const token = getAccessToken();
  if (token && !isTokenExpired(token)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};
