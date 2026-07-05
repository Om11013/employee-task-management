import cron from "node-cron";
import prisma from "../../../prisma/prisma.js";
import { NotificationType } from "@prisma/client";
import { createNotification } from "./notification.service.js";

export const startNotificationCron = () => {
  // Run every hour at minute 0
  cron.schedule("0 * * * *", async () => {
    try {
      const start = new Date();
      const end = new Date();
      end.setHours(end.getHours() + 24);

      const dueTasks = await prisma.task.findMany({
        where: {
          status: { not: "COMPLETED" },
          dueDate: {
            gte: start,
            lte: end,
          },
          notifications: {
            none: {
              type: NotificationType.DUE,
            },
          },
          assignedEmployeeId: {
            not: null,
          },
        },
        include: {
          assignedEmployee: {
            select: { userId: true },
          },
        },
      });

      for (const task of dueTasks) {
        if (task.assignedEmployee?.userId) {
          await createNotification({
            userId: task.assignedEmployee.userId,
            taskId: task.id,
            type: NotificationType.DUE,
            message: `Task "${task.title}" is due within 24 hours!`,
          });
        }
      }
    } catch (error) {
      console.error("Failed to run notification cron job:", error);
    }
  });
};
