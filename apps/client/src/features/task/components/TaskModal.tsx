import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../../../components/ui/Modal";
import { Input } from "../../../components/ui/Input";
import type { Task, CreateTaskDTO, UpdateTaskDTO } from "../types";
import { TaskPriority, TaskStatus } from "../types";
import { useCreateTask, useUpdateTask } from "../hooks/useTasks";
import { useEmployees } from "../../employee/hooks/useEmployees";
import { useAuth } from "../../../hooks/useAuth";

const schema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    priority: z.nativeEnum(TaskPriority),
    status: z.nativeEnum(TaskStatus),
    assignedEmployeeId: z.string().min(1, "Assigned Employee is required"),
    startDate: z
      .string()
      .refine(
        (val) => !isNaN(new Date(val).getTime()),
        "Start Date must be a valid date",
      ),
    dueDate: z
      .string()
      .refine(
        (val) => !isNaN(new Date(val).getTime()),
        "Due Date must be a valid date",
      ),
  })
  .refine(
    (data) =>
      new Date(data.dueDate).setHours(0, 0, 0, 0) >=
      new Date(data.startDate).setHours(0, 0, 0, 0),
    {
      message: "Due Date cannot be earlier than Start Date",
      path: ["dueDate"],
    },
  );

type FormData = z.infer<typeof schema>;

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  task,
}) => {
  const isEditing = !!task;
  const isCompleted = isEditing && task?.status === TaskStatus.COMPLETED;

  const { mutateAsync: createTask, isPending: isCreating } = useCreateTask();
  const { mutateAsync: updateTask, isPending: isUpdating } = useUpdateTask();

  const { isAdmin } = useAuth();

  const { data: employeeData } = useEmployees(
    {
      page: 1,
      limit: 100, // Fetch all active for dropdown
      sortBy: "fullName",
      sortOrder: "asc",
    },
    { enabled: isAdmin },
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      priority: TaskPriority.MEDIUM,
      status: TaskStatus.PENDING,
      startDate: new Date().toISOString().split("T")[0],
      dueDate: new Date().toISOString().split("T")[0],
      assignedEmployeeId: "",
    },
  });

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        status: task.status,
        startDate: new Date(task.startDate!).toISOString().split("T")[0],
        dueDate: new Date(task.dueDate!).toISOString().split("T")[0],
        assignedEmployeeId: String(task.assignedEmployeeId),
      });
    } else {
      reset({
        title: "",
        description: "",
        priority: TaskPriority.MEDIUM,
        status: TaskStatus.PENDING,
        startDate: new Date().toISOString().split("T")[0],
        dueDate: new Date().toISOString().split("T")[0],
        assignedEmployeeId: "",
      });
    }
  }, [task, reset, isOpen]);

  const onSubmit = async (data: FormData) => {
    if (isCompleted) return; // Cannot edit completed task

    try {
      if (isEditing && task) {
        const payload: UpdateTaskDTO = {
          title: data.title,
          description: data.description,
          priority: data.priority,
          status: data.status,
          startDate: data.startDate,
          dueDate: data.dueDate,
          assignedEmployeeId: Number(data.assignedEmployeeId),
        };
        await updateTask({ id: task.id, payload });
      } else {
        const payload: CreateTaskDTO = {
          title: data.title,
          description: data.description,
          priority: data.priority,
          startDate: data.startDate,
          dueDate: data.dueDate,
          assignedEmployeeId: Number(data.assignedEmployeeId),
        };
        await createTask(payload);
      }
      onClose();
    } catch {
      // Handled by react-query hook
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        isEditing
          ? isCompleted
            ? "View Task (Completed)"
            : "Edit Task"
          : "Create Task"
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Task Title"
          placeholder="Enter task title"
          {...register("title")}
          error={errors.title?.message}
          disabled={isCompleted || isPending}
        />

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className={`px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 min-h-[100px] ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter task description"
            {...register("description")}
            disabled={isCompleted || isPending}
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              className={`px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                errors.priority ? "border-red-500" : "border-gray-300"
              }`}
              {...register("priority")}
              disabled={isCompleted || isPending}
            >
              <option value={TaskPriority.LOW}>Low</option>
              <option value={TaskPriority.MEDIUM}>Medium</option>
              <option value={TaskPriority.HIGH}>High</option>
            </select>
            {errors.priority && (
              <p className="text-sm text-red-500">{errors.priority.message}</p>
            )}
          </div>

          {isEditing && (
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                className={`px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                  errors.status ? "border-red-500" : "border-gray-300"
                }`}
                {...register("status")}
                disabled={isCompleted || isPending}
              >
                <option value={TaskStatus.PENDING}>Pending</option>
                <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                <option value={TaskStatus.COMPLETED}>Completed</option>
              </select>
              {errors.status && (
                <p className="text-sm text-red-500">{errors.status.message}</p>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            {...register("startDate")}
            error={errors.startDate?.message}
            disabled={isCompleted || isPending}
          />
          <Input
            label="Due Date"
            type="date"
            {...register("dueDate")}
            error={errors.dueDate?.message}
            disabled={isCompleted || isPending}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Assigned To
          </label>
          <select
            className={`px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
              errors.assignedEmployeeId ? "border-red-500" : "border-gray-300"
            }`}
            {...register("assignedEmployeeId")}
            disabled={isCompleted || isPending}
          >
            <option value="">Select Employee</option>
            {employeeData?.items
              .filter((emp) => emp.id)
              .map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.fullName}
                </option>
              ))}
          </select>
          {errors.assignedEmployeeId && (
            <p className="text-sm text-red-500">
              {errors.assignedEmployeeId.message}
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isCompleted ? "Close" : "Cancel"}
          </button>
          {!isCompleted && (
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isPending
                ? "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Create Task"}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};
