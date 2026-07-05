import { hashPassword } from "../../utils/password.util.js";
import { AppError } from "../../utils/AppError.js";
import {
  findEmployees,
  findEmployeeById,
  createEmployeeRecord,
  updateEmployeeRecord,
  deleteEmployeeRecord,
  checkEmailExists,
} from "./employee.repository.js";
import type {
  CreateEmployeeDTO,
  UpdateEmployeeDTO,
  GetEmployeesQuery,
  EmployeeResponse,
} from "./employee.types.js";

type FormattedUser = {
  id: number;
  fullName: string;
  email: string;
  createdAt: Date;
  employee?: {
    id: number;
    department: string;
    designation: string;
  } | null;
};

const formatEmployeeResponse = (user: FormattedUser): EmployeeResponse => ({
  id: user.employee?.id as number,
  userId: user.id,
  fullName: user.fullName,
  email: user.email,
  department: user.employee?.department as string,
  designation: user.employee?.designation as string,
  createdAt: user.createdAt,
});

export const getEmployees = async (query: GetEmployeesQuery) => {
  const { total, users } = await findEmployees(query);
  return {
    items: users.map(formatEmployeeResponse),
    total,
    page: query.page,
    pageSize: query.limit,
    totalPages: Math.ceil(total / query.limit),
  };
};

export const getEmployeeById = async (id: number) => {
  const user = await findEmployeeById(id);
  if (!user || !user.employee) {
    throw new AppError("Employee not found", 404);
  }
  return formatEmployeeResponse(user);
};

export const createEmployee = async (data: CreateEmployeeDTO) => {
  const emailExists = await checkEmailExists(data.email);
  if (emailExists) {
    throw new AppError("Email already in use", 400);
  }

  const passwordHash = await hashPassword(data.password || "Password123!");

  const newUser = await createEmployeeRecord({ ...data, passwordHash });
  return formatEmployeeResponse(newUser);
};

export const updateEmployee = async (id: number, data: UpdateEmployeeDTO) => {
  const user = await findEmployeeById(id);
  if (!user) {
    throw new AppError("Employee not found", 404);
  }

  if (data.email && data.email !== user.email) {
    const emailExists = await checkEmailExists(data.email, id);
    if (emailExists) {
      throw new AppError("Email already in use", 400);
    }
  }

  const updatedUser = await updateEmployeeRecord(id, data);
  return formatEmployeeResponse(updatedUser);
};

export const deleteEmployee = async (id: number) => {
  const user = await findEmployeeById(id);
  if (!user) {
    throw new AppError("Employee not found", 404);
  }

  await deleteEmployeeRecord(id);
  return { success: true };
};
