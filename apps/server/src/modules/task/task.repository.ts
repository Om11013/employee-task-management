import prisma from "../../../prisma/prisma.js";
import type { Prisma } from "@prisma/client";
import type {
  CreateTaskDTO,
  UpdateTaskDTO,
  GetTasksQuery,
} from "./task.types.js";

export const findTasks = async (
  query: GetTasksQuery,
  role: "ADMIN" | "EMPLOYEE",
  userId: number,
) => {
  const { search, sortBy, sortOrder, priority, status, assignedEmployeeId } =
    query;
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;

  const where: Prisma.TaskWhereInput = {};

  if (role === "EMPLOYEE") {
    // Employees can only see tasks assigned to them (via employee relation)
    where.assignedEmployee = { userId: userId };
  } else if (assignedEmployeeId) {
    // Admin filtering by employee
    where.assignedEmployeeId = Number(assignedEmployeeId);
  }

  if (priority) {
    where.priority = priority;
  }

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
      { assignedEmployee: { user: { fullName: { contains: search } } } },
    ];
  }

  const orderBy: Prisma.TaskOrderByWithRelationInput = {};
  orderBy[sortBy] = sortOrder;

  const [total, tasks] = await Promise.all([
    prisma.task.count({ where }),
    prisma.task.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        assignedEmployee: {
          include: {
            user: {
              select: { id: true, fullName: true, email: true },
            },
          },
        },
        creator: {
          select: { id: true, fullName: true, email: true },
        },
      },
    }),
  ]);

  return { total, tasks };
};

export const findTaskById = async (id: number) => {
  return prisma.task.findUnique({
    where: { id },
    include: {
      assignedEmployee: {
        include: {
          user: {
            select: { id: true, fullName: true, email: true },
          },
        },
      },
      creator: {
        select: { id: true, fullName: true, email: true },
      },
    },
  });
};

export const createTaskRecord = async (
  data: CreateTaskDTO,
  createdBy: number,
) => {
  return prisma.task.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      priority: data.priority,
      startDate: new Date(data.startDate),
      dueDate: new Date(data.dueDate),
      assignedEmployeeId: data.assignedEmployeeId,
      createdBy: createdBy,
    },
    include: {
      assignedEmployee: {
        include: {
          user: { select: { id: true, fullName: true, email: true } },
        },
      },
      creator: { select: { id: true, fullName: true, email: true } },
    },
  });
};

export const updateTaskRecord = async (
  id: number,
  data: UpdateTaskDTO,
  completedAt?: Date | null,
) => {
  const updateData: Prisma.TaskUncheckedUpdateInput = {};

  if (data.title) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.priority) updateData.priority = data.priority;
  if (data.status) updateData.status = data.status;
  if (data.startDate) updateData.startDate = new Date(data.startDate);
  if (data.dueDate) updateData.dueDate = new Date(data.dueDate);
  if (data.assignedEmployeeId)
    updateData.assignedEmployeeId = data.assignedEmployeeId;

  if (completedAt !== undefined) {
    updateData.completedAt = completedAt;
  }

  return prisma.task.update({
    where: { id },
    data: updateData,
    include: {
      assignedEmployee: {
        include: {
          user: { select: { id: true, fullName: true, email: true } },
        },
      },
      creator: { select: { id: true, fullName: true, email: true } },
    },
  });
};

export const deleteTaskRecord = async (id: number) => {
  return prisma.task.delete({
    where: { id },
  });
};
