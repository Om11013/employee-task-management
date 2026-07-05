import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  uploadAttachment,
  getAttachments,
  deleteAttachment,
} from "../api/attachment.api";
import { toast } from "sonner";

export const attachmentKeys = {
  all: ["attachments"] as const,
  list: (taskId: number) => ["attachments", "list", taskId] as const,
};

export const useAttachments = (taskId: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: attachmentKeys.list(taskId),
    queryFn: () => getAttachments(taskId),
    enabled: enabled && !!taskId,
  });
};

import type { AxiosError } from "axios";

export const useUploadAttachment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, file }: { taskId: number; file: File }) =>
      uploadAttachment(taskId, file),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: attachmentKeys.list(variables.taskId),
      });
      toast.success("Attachment uploaded successfully");
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<{ message: string }>;
      toast.error(
        axiosError?.response?.data?.message || "Failed to upload attachment",
      );
    },
  });
};

export const useDeleteAttachment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAttachment,
    onSuccess: () => {
      // Invalidate all attachments since we might not have the taskId here easily
      queryClient.invalidateQueries({ queryKey: attachmentKeys.all });
      toast.success("Attachment deleted");
    },
    onError: () => {
      toast.error("Failed to delete attachment");
    },
  });
};
