import type { Request, Response, NextFunction } from "express";
import * as service from "./attachment.service.js";
import { AppError } from "../../utils/AppError.js";

export const uploadAttachment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.file) {
      throw new AppError("No file uploaded", 400);
    }

    const taskId = parseInt(req.params.taskId as string);
    if (isNaN(taskId)) {
      throw new AppError("Invalid task ID", 400);
    }

    const userId = req.user!.id;
    const role = req.user!.role;

    const attachment = await service.uploadAttachment(
      taskId,
      userId,
      role,
      req.file,
    );
    res.status(201).json({ success: true, data: attachment });
  } catch (error) {
    next(error);
  }
};

export const getAttachments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const taskId = parseInt(req.params.taskId as string);
    if (isNaN(taskId)) {
      throw new AppError("Invalid task ID", 400);
    }

    const userId = req.user!.id;
    const role = req.user!.role;

    const attachments = await service.getAttachments(taskId, userId, role);
    res.json({ success: true, data: attachments });
  } catch (error) {
    next(error);
  }
};

export const deleteAttachment = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const attachmentId = parseInt(req.params.id as string);
    if (isNaN(attachmentId)) {
      throw new AppError("Invalid attachment ID", 400);
    }

    const userId = req.user!.id;
    const role = req.user!.role;

    const result = await service.deleteAttachment(attachmentId, userId, role);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};
