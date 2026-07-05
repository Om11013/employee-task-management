import { Status, Priority } from "@prisma/client";

export interface ReportQuery {
  page: number;
  limit: number;
  employeeId?: number;
  priority?: Priority;
  status?: Status;
  startDate?: string;
  endDate?: string;
}

export interface ReportFilters {
  employeeId?: number;
  priority?: Priority;
  status?: Status;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface ReportSummary {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
}

export interface EmployeeSummary {
  id: number;
  userId: number;
  fullName: string;
  department: string;
  designation: string;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
}
