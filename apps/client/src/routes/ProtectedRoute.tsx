import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken, isTokenExpired, clearAuth } from "../utils/auth.utils";

export const ProtectedRoute = () => {
  const token = getAccessToken();
  if (!token || isTokenExpired(token)) {
    clearAuth();
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
