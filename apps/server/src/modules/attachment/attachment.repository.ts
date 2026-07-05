import prisma from "../../../prisma/prisma.js";
import type { CreateAttachmentDTO } from "./attachment.types.js";

export const createAttachmentRecord = async (data: CreateAttachmentDTO) => {
  return prisma.attachment.create({ data });
};

export const getAttachmentsByTaskId = async (taskId: number) => {
  return prisma.attachment.findMany({
    where: { taskId },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteAttachmentRecord = async (id: number) => {
  return prisma.attachment.delete({
    where: { id },
  });
};

export const getAttachmentById = async (id: number) => {
  return prisma.attachment.findUnique({
    where: { id },
  });
};
