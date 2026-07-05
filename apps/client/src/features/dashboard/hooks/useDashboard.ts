import { useQuery } from "@tanstack/react-query";
import { fetchDashboardData } from "../api/dashboard.api";

export const useDashboard = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
    staleTime: 5 * 60 * 1000,
  });
};
