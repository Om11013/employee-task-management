import { NotificationType } from "@prisma/client";

export interface GetNotificationsQuery {
  page: number;
  limit: number;
}

export interface CreateNotificationDTO {
  userId: number;
  taskId: number;
  type: NotificationType;
  message?: string;
}
