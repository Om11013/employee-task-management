import prisma from "../../../prisma/prisma.js";
import type { CreateNotificationDTO } from "./notification.types.js";

export const createNotificationRecord = async (data: CreateNotificationDTO) => {
  return prisma.notification.create({
    data,
  });
};

export const findNotificationsByUserId = async (
  userId: number,
  page: number,
  limit: number,
) => {
  const skip = (page - 1) * limit;
  const [total, notifications] = await Promise.all([
    prisma.notification.count({ where: { userId } }),
    prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      include: {
        task: {
          select: { title: true },
        },
      },
    }),
  ]);
  return { total, notifications };
};

export const getUnreadCount = async (userId: number) => {
  return prisma.notification.count({
    where: { userId, isRead: false },
  });
};

export const markAsReadRecord = async (id: number, userId: number) => {
  const result = await prisma.notification.updateMany({
    where: { id, userId },
    data: { isRead: true },
  });
  return result.count > 0;
};

export const markAllAsReadRecord = async (userId: number) => {
  const result = await prisma.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
  return result.count;
};

export const deleteNotificationRecord = async (id: number, userId: number) => {
  const result = await prisma.notification.deleteMany({
    where: { id, userId },
  });
  return result.count > 0;
};
