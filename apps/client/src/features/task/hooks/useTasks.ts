import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTasks,
  fetchTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../api/task.api";
import type { GetTasksQuery } from "../types";
import { toast } from "sonner";

export const taskKeys = {
  all: ["tasks"] as const,
  list: (params: GetTasksQuery) => ["tasks", "list", params] as const,
  detail: (id: number) => ["tasks", "detail", id] as const,
};

export const useTasks = (params: GetTasksQuery) => {
  return useQuery({
    queryKey: taskKeys.list(params),
    queryFn: () => fetchTasks(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useTask = (id: number) => {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => fetchTaskById(id),
    enabled: !!id,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      toast.success("Task created successfully");
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      queryClient.invalidateQueries({ queryKey: taskKeys.detail(data.id) });
      toast.success("Task updated successfully");
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      toast.success("Task deleted successfully");
    },
  });
};
