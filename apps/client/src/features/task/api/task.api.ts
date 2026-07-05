import { requestV1 } from "../../../api/rest";
import type {
  Task,
  TaskResponse,
  GetTasksQuery,
  CreateTaskDTO,
  UpdateTaskDTO,
} from "../types";

export const fetchTasks = async (
  params: GetTasksQuery,
): Promise<TaskResponse> => {
  const response = await requestV1<undefined, { data: TaskResponse }>(
    "GET",
    "/tasks",
    undefined,
    { params },
  );
  return response.data;
};

export const fetchTaskById = async (id: number): Promise<Task> => {
  const response = await requestV1<undefined, { data: Task }>(
    "GET",
    `/tasks/${id}`,
  );
  return response.data;
};

export const createTask = async (payload: CreateTaskDTO): Promise<Task> => {
  const response = await requestV1<CreateTaskDTO, { data: Task }>(
    "POST",
    "/tasks",
    payload,
  );
  return response.data;
};

export const updateTask = async ({
  id,
  payload,
}: {
  id: number;
  payload: UpdateTaskDTO;
}): Promise<Task> => {
  const response = await requestV1<UpdateTaskDTO, { data: Task }>(
    "PUT",
    `/tasks/${id}`,
    payload,
  );
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await requestV1<never, { success: boolean }>("DELETE", `/tasks/${id}`);
};
