import { AppError } from "../../utils/AppError.js";
import {
  createNotificationRecord,
  findNotificationsByUserId,
  getUnreadCount,
  markAsReadRecord,
  markAllAsReadRecord,
  deleteNotificationRecord,
} from "./notification.repository.js";
import type {
  CreateNotificationDTO,
  GetNotificationsQuery,
} from "./notification.types.js";

export const createNotification = async (data: CreateNotificationDTO) => {
  return createNotificationRecord(data);
};

export const getNotifications = async (
  userId: number,
  query: GetNotificationsQuery,
) => {
  const { total, notifications } = await findNotificationsByUserId(
    userId,
    query.page,
    query.limit,
  );
  const unreadCount = await getUnreadCount(userId);

  return {
    items: notifications,
    total,
    page: query.page,
    pageSize: query.limit,
    totalPages: Math.ceil(total / query.limit),
    unreadCount,
  };
};

export const markNotificationAsRead = async (id: number, userId: number) => {
  const success = await markAsReadRecord(id, userId);
  if (!success) {
    throw new AppError("Notification not found or access denied", 404);
  }
  return { success: true };
};

export const markAllNotificationsAsRead = async (userId: number) => {
  const count = await markAllAsReadRecord(userId);
  return { success: true, count };
};

export const deleteNotification = async (id: number, userId: number) => {
  const success = await deleteNotificationRecord(id, userId);
  if (!success) {
    throw new AppError("Notification not found or access denied", 404);
  }
  return { success: true };
};
