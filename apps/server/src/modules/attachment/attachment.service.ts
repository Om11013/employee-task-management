import { AppError } from "../../utils/AppError.js";
import {
  createAttachmentRecord,
  getAttachmentsByTaskId,
  deleteAttachmentRecord,
  getAttachmentById,
} from "./attachment.repository.js";
import { findTaskById } from "../task/task.repository.js";
import fs from "fs";
import path from "path";

const verifyTaskAccess = async (
  taskId: number,
  userId: number,
  role: string,
) => {
  const task = await findTaskById(taskId);
  if (!task) {
    throw new AppError("Task not found", 404);
  }

  if (role === "EMPLOYEE" && task.assignedEmployee?.userId !== userId) {
    throw new AppError("Forbidden: You can only access your own tasks", 403);
  }

  return task;
};

export const uploadAttachment = async (
  taskId: number,
  userId: number,
  role: string,
  file: Express.Multer.File,
) => {
  await verifyTaskAccess(taskId, userId, role);

  const fileUrl = `/uploads/tasks/${file.filename}`;

  const attachment = await createAttachmentRecord({
    taskId,
    fileName: file.originalname,
    fileUrl,
    fileType: file.mimetype,
    fileSize: file.size,
  });

  return attachment;
};

export const getAttachments = async (
  taskId: number,
  userId: number,
  role: string,
) => {
  await verifyTaskAccess(taskId, userId, role);
  return getAttachmentsByTaskId(taskId);
};

export const deleteAttachment = async (
  id: number,
  userId: number,
  role: string,
) => {
  const attachment = await getAttachmentById(id);
  if (!attachment) {
    throw new AppError("Attachment not found", 404);
  }

  await verifyTaskAccess(attachment.taskId, userId, role);

  // Delete physical file
  if (attachment.fileUrl) {
    const filename = path.basename(attachment.fileUrl);
    const filepath = path.join(process.cwd(), "uploads", "tasks", filename);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }

  await deleteAttachmentRecord(id);
  return { success: true };
};
