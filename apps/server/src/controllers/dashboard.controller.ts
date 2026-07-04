import type { Request, Response, NextFunction } from "express";
import { getDashboardData } from "../services/dashboard.service.js";
import type { UserPayload } from "../types/auth.js";

export const getDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = req.user as UserPayload;
    if (!user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const data = await getDashboardData(user.id, user.role);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
