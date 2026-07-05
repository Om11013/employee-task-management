import { AppError } from "../../utils/AppError.js";
import {
  findTasks,
  findTaskById,
  createTaskRecord,
  updateTaskRecord,
  deleteTaskRecord,
} from "./task.repository.js";
import type {
  CreateTaskDTO,
  UpdateTaskDTO,
  GetTasksQuery,
  TaskResponse,
} from "./task.types.js";
import prisma from "../../../prisma/prisma.js";

import { Status, NotificationType } from "@prisma/client";
import { createNotification } from "../notification/notification.service.js";

// Helper to format Prisma response to TaskResponse
const formatTaskResponse = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  task: any,
): TaskResponse => ({
  id: task.id,
  title: task.title,
  description: task.description,
  priority: task.priority,
  status: task.status,
  startDate: task.startDate,
  dueDate: task.dueDate,
  assignedEmployeeId: task.assignedEmployeeId,
  createdBy: task.createdBy,
  completedAt: task.completedAt,
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
  assignedEmployee: task.assignedEmployee,
  creator: task.creator,
});

export const getTasks = async (
  query: GetTasksQuery,
  role: "ADMIN" | "EMPLOYEE",
  userId: number,
) => {
  const { total, tasks } = await findTasks(query, role, userId);
  return {
    items: tasks.map(formatTaskResponse),
    total,
    page: query.page,
    pageSize: query.limit,
    totalPages: Math.ceil(total / query.limit),
  };
};

export const getTaskById = async (
  id: number,
  role: "ADMIN" | "EMPLOYEE",
  userId: number,
) => {
  const task = await findTaskById(id);
  if (!task) {
    throw new AppError("Task not found", 404);
  }

  if (role === "EMPLOYEE" && task.assignedEmployee?.userId !== userId) {
    throw new AppError("Forbidden: You can only access your own tasks", 403);
  }

  return formatTaskResponse(task);
};

export const createTask = async (data: CreateTaskDTO, createdBy: number) => {
  const employee = await prisma.employee.findUnique({
    where: { id: data.assignedEmployeeId },
  });
  if (!employee) {
    throw new AppError("Assigned Employee not found", 404);
  }

  const newTask = await createTaskRecord(data, createdBy);

  // Trigger Notification
  if (employee.userId) {
    await createNotification({
      userId: employee.userId,
      taskId: newTask.id,
      type: NotificationType.ASSIGNED,
      message: `You have been assigned a new task: "${newTask.title}"`,
    });
  }

  return formatTaskResponse(newTask);
};

export const updateTask = async (id: number, data: UpdateTaskDTO) => {
  const task = await findTaskById(id);
  if (!task) {
    throw new AppError("Task not found", 404);
  }

  if (task.status === Status.COMPLETED) {
    throw new AppError("Completed tasks cannot be edited", 400);
  }

  if (data.assignedEmployeeId) {
    const employee = await prisma.employee.findUnique({
      where: { id: data.assignedEmployeeId },
    });
    if (!employee) {
      throw new AppError("Assigned Employee not found", 404);
    }
  }

  let completedAt: Date | null | undefined = undefined;

  const isNewlyCompleted = data.status === Status.COMPLETED;

  if (data.status === Status.COMPLETED) {
    completedAt = new Date();
  }

  const updatedTask = await updateTaskRecord(id, data, completedAt);

  // Trigger Assignment Notification if reassigned
  if (
    data.assignedEmployeeId &&
    data.assignedEmployeeId !== task.assignedEmployeeId
  ) {
    const newEmployee = await prisma.employee.findUnique({
      where: { id: data.assignedEmployeeId },
    });
    if (newEmployee?.userId) {
      await createNotification({
        userId: newEmployee.userId,
        taskId: updatedTask.id,
        type: NotificationType.ASSIGNED,
        message: `You have been assigned to task: "${updatedTask.title}"`,
      });
    }
  }

  // Trigger Completion Notification to task creator
  if (isNewlyCompleted && task.creator?.id) {
    await createNotification({
      userId: task.creator.id,
      taskId: updatedTask.id,
      type: NotificationType.COMPLETED,
      message: `Task "${updatedTask.title}" has been completed by ${task.assignedEmployee?.user?.fullName || "an employee"}.`,
    });
  }

  return formatTaskResponse(updatedTask);
};

export const deleteTask = async (id: number) => {
  const task = await findTaskById(id);
  if (!task) {
    throw new AppError("Task not found", 404);
  }

  if (task.status === Status.COMPLETED) {
    throw new AppError("Completed tasks cannot be deleted", 400);
  }

  await deleteTaskRecord(id);
  return { success: true };
};
