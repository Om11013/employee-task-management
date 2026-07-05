import { getUser } from "../utils/auth.utils";

export const useAuth = () => {
  const user = getUser();
  return {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    isEmployee: user?.role === "EMPLOYEE",
  };
};
