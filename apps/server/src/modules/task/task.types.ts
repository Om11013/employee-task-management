import { Priority, Status } from "@prisma/client";

export interface CreateTaskDTO {
  title: string;
  description?: string;
  priority: Priority;
  startDate: string | Date;
  dueDate: string | Date;
  assignedEmployeeId: number;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  priority?: Priority;
  status?: Status;
  startDate?: string | Date;
  dueDate?: string | Date;
  assignedEmployeeId?: number;
}

export interface GetTasksQuery {
  page: number;
  limit: number;
  search?: string; // Search by title, description, employee name
  sortBy:
    "title" | "priority" | "status" | "startDate" | "dueDate" | "createdAt";
  sortOrder: "asc" | "desc";
  priority?: Priority;
  status?: Status;
  assignedEmployeeId?: number;
}

export interface TaskResponse {
  id: number;
  title: string;
  description: string | null;
  priority: Priority;
  status: Status;
  startDate: Date | null;
  dueDate: Date | null;
  assignedEmployeeId: number | null;
  createdBy: number;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  assignedEmployee?: {
    id: number;
    userId: number;
    user: {
      id: number;
      fullName: string;
      email: string;
    };
  } | null;
  creator?: {
    id: number;
    fullName: string;
    email: string;
  };
}
