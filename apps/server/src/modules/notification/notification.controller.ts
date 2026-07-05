import type { Request, Response, NextFunction } from "express";
import * as service from "./notification.service.js";
import type { GetNotificationsQuery } from "./notification.types.js";

export const getNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const query = req.query as unknown as GetNotificationsQuery;
    const result = await service.getNotifications(userId, query);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const notificationId = parseInt(req.params.id as string);
    const result = await service.markNotificationAsRead(notificationId, userId);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const markAllAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const result = await service.markAllNotificationsAsRead(userId);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const deleteNotification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.id;
    const notificationId = parseInt(req.params.id as string);
    const result = await service.deleteNotification(notificationId, userId);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
