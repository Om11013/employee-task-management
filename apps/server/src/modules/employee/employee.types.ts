export interface CreateEmployeeDTO {
  fullName: string;
  email: string;
  password?: string;
  department: string;
  designation: string;
}

export interface UpdateEmployeeDTO {
  fullName?: string;
  email?: string;
  department?: string;
  designation?: string;
}

export interface GetEmployeesQuery {
  page: number;
  limit: number;
  search?: string;
  sortBy: "fullName" | "email" | "department" | "designation" | "createdAt";
  sortOrder: "asc" | "desc";
}

export interface EmployeeResponse {
  id: number;
  userId: number;
  fullName: string;
  email: string;
  department: string;
  designation: string;
  createdAt: Date;
}
