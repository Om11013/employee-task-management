import prisma from "../../../prisma/prisma.js";
import type { Prisma, Status } from "@prisma/client";
import type { ReportFilters, ReportQuery } from "./report.types.js";

const buildWhereClause = (
  filters: ReportFilters,
  role: string,
  userId: number,
  forcedStatus?: string,
): Prisma.TaskWhereInput => {
  const where: Prisma.TaskWhereInput = {};

  if (role === "EMPLOYEE") {
    where.assignedEmployee = { userId };
  } else if (filters.employeeId) {
    where.assignedEmployeeId = Number(filters.employeeId);
  }

  if (filters.priority) {
    where.priority = filters.priority;
  }

  if (forcedStatus) {
    where.status = forcedStatus as Status;
  } else if (filters.status) {
    where.status = filters.status;
  }

  if (filters.startDate || filters.endDate) {
    where.createdAt = {};
    if (filters.startDate) where.createdAt.gte = new Date(filters.startDate);
    if (filters.endDate) where.createdAt.lte = new Date(filters.endDate);
  }

  if (filters.search) {
    where.title = { contains: filters.search };
  }

  return where;
};

export const getReportData = async (
  query: ReportQuery,
  role: string,
  userId: number,
  forcedStatus?: string,
) => {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;

  const where = buildWhereClause(query, role, userId, forcedStatus);

  const [total, tasks] = await Promise.all([
    prisma.task.count({ where }),
    prisma.task.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
      include: {
        assignedEmployee: {
          include: {
            user: { select: { fullName: true } },
          },
        },
        creator: { select: { fullName: true } },
      },
    }),
  ]);

  return {
    items: tasks,
    total,
    page,
    pageSize: limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const getExportData = async (
  filters: ReportFilters,
  role: string,
  userId: number,
  forcedStatus?: string,
) => {
  const where = buildWhereClause(filters, role, userId, forcedStatus);
  return prisma.task.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      assignedEmployee: {
        include: {
          user: { select: { fullName: true } },
        },
      },
      creator: { select: { fullName: true } },
    },
  });
};

export const getSummaryData = async (role: string, userId: number) => {
  const baseWhere: Prisma.TaskWhereInput =
    role === "EMPLOYEE" ? { assignedEmployee: { userId } } : {};

  const [totalTasks, completedTasks, pendingTasks, overdueTasks] =
    await Promise.all([
      prisma.task.count({ where: baseWhere }),
      prisma.task.count({
        where: { ...baseWhere, status: "COMPLETED" },
      }),
      prisma.task.count({
        where: {
          ...baseWhere,
          status: { in: ["PENDING", "IN_PROGRESS"] },
        },
      }),
      prisma.task.count({
        where: {
          ...baseWhere,
          status: { not: "COMPLETED" },
          dueDate: { lt: new Date() },
        },
      }),
    ]);

  return {
    totalTasks,
    completedTasks,
    pendingTasks,
    overdueTasks,
  };
};

export const getEmployeeSummaryData = async () => {
  const employees = await prisma.employee.findMany({
    include: {
      user: { select: { fullName: true } },
      tasks: true,
    },
    orderBy: { user: { fullName: "asc" } },
  });

  const now = new Date();

  return employees.map((emp) => {
    const totalTasks = emp.tasks.length;
    const completedTasks = emp.tasks.filter(
      (t) => t.status === "COMPLETED",
    ).length;
    const pendingTasks = emp.tasks.filter((t) =>
      ["PENDING", "IN_PROGRESS"].includes(t.status),
    ).length;
    const overdueTasks = emp.tasks.filter(
      (t) => t.status !== "COMPLETED" && t.dueDate && new Date(t.dueDate) < now,
    ).length;

    return {
      id: emp.id,
      userId: emp.userId,
      fullName: emp.user.fullName,
      department: emp.department,
      designation: emp.designation,
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
    };
  });
};
