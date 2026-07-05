import prisma from "../../../prisma/prisma.js";
import type { Prisma } from "@prisma/client";
import type {
  CreateEmployeeDTO,
  UpdateEmployeeDTO,
  GetEmployeesQuery,
} from "./employee.types.js";

export const findEmployees = async (query: GetEmployeesQuery) => {
  const { search, sortBy, sortOrder } = query;
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;

  const where: Prisma.UserWhereInput = {
    role: "EMPLOYEE",
    ...(search && {
      OR: [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { employee: { department: { contains: search } } },
        { employee: { designation: { contains: search } } },
      ],
    }),
  };

  const orderBy: Prisma.UserOrderByWithRelationInput = {};
  if (sortBy === "department" || sortBy === "designation") {
    orderBy.employee = { [sortBy]: sortOrder };
  } else {
    orderBy[sortBy] = sortOrder;
  }

  const [total, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        employee: true,
      },
    }),
  ]);

  return { total, users };
};

export const findEmployeeById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id, role: "EMPLOYEE" },
    include: { employee: true },
  });
};

export const createEmployeeRecord = async (
  data: CreateEmployeeDTO & { passwordHash: string },
) => {
  return prisma.user.create({
    data: {
      fullName: data.fullName,
      email: data.email,
      password: data.passwordHash,
      role: "EMPLOYEE",
      employee: {
        create: {
          department: data.department,
          designation: data.designation,
        },
      },
    },
    include: { employee: true },
  });
};

export const updateEmployeeRecord = async (
  id: number,
  data: UpdateEmployeeDTO,
) => {
  return prisma.user.update({
    where: { id },
    data: {
      ...(data.fullName && { fullName: data.fullName }),
      ...(data.email && { email: data.email }),
      ...(data.department || data.designation
        ? {
            employee: {
              upsert: {
                create: {
                  department: data.department || "Unassigned",
                  designation: data.designation || "Unassigned",
                },
                update: {
                  ...(data.department && { department: data.department }),
                  ...(data.designation && { designation: data.designation }),
                },
              },
            },
          }
        : {}),
    },
    include: { employee: true },
  });
};

export const deleteEmployeeRecord = async (id: number) => {
  return prisma.user.delete({
    where: { id },
  });
};

export const checkEmailExists = async (email: string, excludeId?: number) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
      ...(excludeId && { id: { not: excludeId } }),
    },
  });
  return !!user;
};
