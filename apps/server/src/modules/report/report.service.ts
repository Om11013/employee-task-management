import {
  getReportData,
  getExportData,
  getSummaryData,
  getEmployeeSummaryData,
} from "./report.repository.js";
import { generateExcelReport, generateCSVReport } from "./report.export.js";
import type { ReportFilters, ReportQuery } from "./report.types.js";
import { Status } from "@prisma/client";

export const getReports = async (
  query: ReportQuery,
  role: string,
  userId: number,
) => {
  return getReportData(query, role, userId);
};

export const getCompletedReports = async (
  query: ReportQuery,
  role: string,
  userId: number,
) => {
  return getReportData(query, role, userId, Status.COMPLETED);
};

export const getPendingReports = async (
  query: ReportQuery,
  role: string,
  userId: number,
) => {
  return getReportData(query, role, userId, Status.PENDING);
};

export const getReportSummary = async (role: string, userId: number) => {
  return getSummaryData(role, userId);
};

export const getEmployeeReports = async (
  _query: ReportQuery,
  role: string,
  _userId: number,
) => {
  if (role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return getEmployeeSummaryData();
};

export const exportExcel = async (
  filters: ReportFilters,
  role: string,
  userId: number,
) => {
  const data = await getExportData(filters, role, userId);
  return generateExcelReport(data);
};

export const exportCSV = async (
  filters: ReportFilters,
  role: string,
  userId: number,
) => {
  const data = await getExportData(filters, role, userId);
  return generateCSVReport(data);
};
