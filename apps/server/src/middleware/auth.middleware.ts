import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.util.js";
import { AppError } from "../utils/AppError.js";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Unauthorized: No token provided", 401);
    }

    const token = authHeader.split(" ")[1] as string;
    const decoded = verifyAccessToken(token);

    req.user = decoded;
    next();
  } catch {
    next(new AppError("Unauthorized: Invalid token", 401));
  }
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Unauthorized", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError("Forbidden: Insufficient permissions", 403));
    }

    next();
  };
};
