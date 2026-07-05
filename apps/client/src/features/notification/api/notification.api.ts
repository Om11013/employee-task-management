import { rest as api } from "../../../api/rest";
import type { GetNotificationsParams, PaginatedNotifications } from "../types";

export const fetchNotifications = async (
  params: GetNotificationsParams,
): Promise<PaginatedNotifications> => {
  const { data } = await api.get("/notifications", { params });
  return data.data;
};

export const markAsRead = async (id: number): Promise<void> => {
  await api.patch(`/notifications/${id}/read`);
};

export const markAllAsRead = async (): Promise<void> => {
  await api.patch("/notifications/read-all");
};

export const deleteNotification = async (id: number): Promise<void> => {
  await api.delete(`/notifications/${id}`);
};
