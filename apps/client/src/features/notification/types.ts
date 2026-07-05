export interface Notification {
  id: number;
  userId: number;
  taskId: number;
  type: "ASSIGNED" | "DUE" | "COMPLETED";
  message: string;
  isRead: boolean;
  createdAt: string;
  task?: {
    title: string;
  };
}

export interface GetNotificationsParams {
  page?: number;
  limit?: number;
}

export interface PaginatedNotifications {
  items: Notification[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  unreadCount: number;
}
