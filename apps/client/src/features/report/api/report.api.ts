import { rest as api } from "../../../api/rest";
import type {
  ReportFiltersParams,
  ReportSummary,
  EmployeeSummary,
} from "../types";
import type { TaskResponse } from "../../task/types";

export const fetchReports = async (
  type: "completed" | "pending" | "employee" | "all",
  params: ReportFiltersParams,
): Promise<TaskResponse | EmployeeSummary[]> => {
  const endpoint =
    type === "all"
      ? "/reports"
      : type === "employee"
        ? "/reports/employee-summary"
        : `/reports/${type}`;
  const { data } = await api.get(endpoint, { params });
  return data.data;
};

export const fetchSummary = async (): Promise<ReportSummary> => {
  const { data } = await api.get("/reports/summary");
  return data.data;
};

export const exportReportExcel = async (
  params: ReportFiltersParams,
): Promise<void> => {
  const response = await api.get("/reports/export/excel", {
    params,
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "report.xlsx");
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const exportReportCSV = async (
  params: ReportFiltersParams,
): Promise<void> => {
  const response = await api.get("/reports/export/csv", {
    params,
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "report.csv");
  document.body.appendChild(link);
  link.click();
  link.remove();
};
