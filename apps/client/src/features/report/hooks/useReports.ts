import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchReports,
  fetchSummary,
  exportReportExcel,
  exportReportCSV,
} from "../api/report.api";
import type { ReportFiltersParams } from "../types";
import { toast } from "sonner";

export const reportKeys = {
  all: ["reports"] as const,
  summary: ["reports", "summary"] as const,
  list: (type: string, params: ReportFiltersParams) =>
    ["reports", type, params] as const,
};

export const useReportSummary = () => {
  return useQuery({
    queryKey: reportKeys.summary,
    queryFn: fetchSummary,
  });
};

export const useReports = (
  type: "completed" | "pending" | "employee" | "all",
  params: ReportFiltersParams,
) => {
  return useQuery({
    queryKey: reportKeys.list(type, params),
    queryFn: () => fetchReports(type, params),
    placeholderData: (prev) => prev,
  });
};

export const useExportExcel = () => {
  return useMutation({
    mutationFn: exportReportExcel,
    onSuccess: () => toast.success("Excel report exported successfully"),
    onError: () => toast.error("Failed to export Excel report"),
  });
};

export const useExportCSV = () => {
  return useMutation({
    mutationFn: exportReportCSV,
    onSuccess: () => toast.success("CSV report exported successfully"),
    onError: () => toast.error("Failed to export CSV report"),
  });
};
