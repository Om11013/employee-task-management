import { TaskPriority, TaskStatus } from "../task/types";

export interface ReportFiltersParams {
  employeeId?: string;
  priority?: TaskPriority | "";
  status?: TaskStatus | "";
  startDate?: string;
  endDate?: string;
  search?: string;
  page?: number;
  limit?: number;
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
