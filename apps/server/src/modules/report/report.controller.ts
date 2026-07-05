import type { Request, Response, NextFunction } from "express";
import * as service from "./report.service.js";
import type { ReportQuery, ReportFilters } from "./report.types.js";

export const getReports = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const role = req.user!.role;
    const query = req.query as unknown as ReportQuery;
    const result = await service.getReports(query, role, userId);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getSummary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const role = req.user!.role;
    const result = await service.getReportSummary(role, userId);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getCompletedReports = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const role = req.user!.role;
    const query = req.query as unknown as ReportQuery;
    const result = await service.getCompletedReports(query, role, userId);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getPendingReports = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const role = req.user!.role;
    const query = req.query as unknown as ReportQuery;
    const result = await service.getPendingReports(query, role, userId);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeReports = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const role = req.user!.role;
    const query = req.query as unknown as ReportQuery;
    const result = await service.getEmployeeReports(query, role, userId);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const exportExcel = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const role = req.user!.role;
    const filters = req.query as unknown as ReportFilters;
    const buffer = await service.exportExcel(filters, role, userId);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader("Content-Disposition", "attachment; filename=report.xlsx");
    res.send(buffer);
  } catch (error) {
    next(error);
  }
};

export const exportCSV = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const role = req.user!.role;
    const filters = req.query as unknown as ReportFilters;
    const csvString = await service.exportCSV(filters, role, userId);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=report.csv");
    res.send(csvString);
  } catch (error) {
    next(error);
  }
};
