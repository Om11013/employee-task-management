export const TaskPriority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
} as const;
export type TaskPriority = (typeof TaskPriority)[keyof typeof TaskPriority];

export const TaskStatus = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
} as const;
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export interface Task {
  id: number;
  title: string;
  description: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  startDate: string | Date | null;
  dueDate: string | Date | null;
  assignedEmployeeId: number | null;
  createdBy: number;
  completedAt: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
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

export interface CreateTaskDTO {
  title: string;
  description?: string;
  priority: TaskPriority | "";
  startDate: string;
  dueDate: string;
  assignedEmployeeId: number | "";
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  startDate?: string;
  dueDate?: string;
  assignedEmployeeId?: number;
}

export interface GetTasksQuery {
  page: number;
  limit: number;
  search?: string;
  sortBy:
    "title" | "priority" | "status" | "startDate" | "dueDate" | "createdAt";
  sortOrder: "asc" | "desc";
  priority?: TaskPriority | "";
  status?: TaskStatus | "";
  assignedEmployeeId?: number | "";
}

export interface TaskResponse {
  items: Task[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
