import { rest as api } from "../../../api/rest";
import type { Attachment } from "../types";

export const uploadAttachment = async (
  taskId: number,
  file: File,
): Promise<Attachment> => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post(`/tasks/${taskId}/attachments`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data.data;
};

export const getAttachments = async (taskId: number): Promise<Attachment[]> => {
  const { data } = await api.get(`/tasks/${taskId}/attachments`);
  return data.data;
};

export const deleteAttachment = async (id: number): Promise<void> => {
  await api.delete(`/attachments/${id}`);
};
