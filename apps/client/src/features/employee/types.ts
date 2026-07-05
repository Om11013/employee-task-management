export interface Employee {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  department: string;
  designation: string;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface GetEmployeesParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "fullName" | "email" | "department" | "designation" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface CreateEmployeePayload {
  fullName: string;
  email: string;
  password?: string;
  department: string;
  designation: string;
}

export interface UpdateEmployeePayload {
  fullName?: string;
  email?: string;
  department?: string;
  designation?: string;
}
