import { requestV1 } from "../../../api/rest";
import type {
  DashboardResponse,
  DashboardData,
} from "../types/dashboard.types";

export const fetchDashboardData = async (): Promise<DashboardData> => {
  const response = await requestV1<never, DashboardResponse>(
    "GET",
    "/dashboard",
  );
  return response.data;
};
