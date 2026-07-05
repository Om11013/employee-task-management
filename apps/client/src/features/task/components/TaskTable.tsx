import React from "react";
import type { Task } from "../types";
import { TaskPriority, TaskStatus } from "../types";
import { useDeleteTask } from "../hooks/useTasks";
import { useAuth } from "../../../hooks/useAuth";

interface TaskTableProps {
  tasks: Task[];
  isLoading: boolean;
  onEdit: (task: Task) => void;
}

const PriorityBadge: React.FC<{ priority: TaskPriority }> = ({ priority }) => {
  const styles = {
    [TaskPriority.HIGH]: "bg-red-100 text-red-800",
    [TaskPriority.MEDIUM]: "bg-yellow-100 text-yellow-800",
    [TaskPriority.LOW]: "bg-blue-100 text-blue-800",
  };

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[priority]}`}
    >
      {priority}
    </span>
  );
};

const StatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  const styles = {
    [TaskStatus.COMPLETED]: "bg-green-100 text-green-800",
    [TaskStatus.IN_PROGRESS]: "bg-purple-100 text-purple-800",
    [TaskStatus.PENDING]: "bg-gray-100 text-gray-800",
  };

  const label = status.replace("_", " ");

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${styles[status]}`}
    >
      {label}
    </span>
  );
};

export const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  isLoading,
  onEdit,
}) => {
  const { isAdmin } = useAuth();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  const handleDelete = (id: number, title: string) => {
    if (
      window.confirm(`Are you sure you want to delete the task "${title}"?`)
    ) {
      deleteTask(id);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
        <div className="animate-pulse flex space-x-4 p-6">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tasks.length) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6 p-12 text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
        <p className="mt-1 text-sm text-gray-500">
          {isAdmin
            ? "Get started by creating a new task."
            : "You have no assigned tasks."}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            {isAdmin && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
            )}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dates
            </th>
            {isAdmin && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">
                  {task.title}
                </div>
                {task.description && (
                  <div className="text-sm text-gray-500 truncate max-w-xs">
                    {task.description}
                  </div>
                )}
              </td>
              {isAdmin && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                      {task.assignedEmployee?.user.fullName.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {task.assignedEmployee?.user.fullName}
                      </div>
                    </div>
                  </div>
                </td>
              )}
              <td className="px-6 py-4 whitespace-nowrap">
                <PriorityBadge priority={task.priority} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={task.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  <span className="font-medium text-gray-500 mr-1">Start:</span>
                  {new Date(task.startDate!).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-900">
                  <span className="font-medium text-gray-500 mr-1">Due:</span>
                  {new Date(task.dueDate!).toLocaleDateString()}
                </div>
              </td>
              {isAdmin && (
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(task)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.id, task.title)}
                    disabled={
                      isDeleting || task.status === TaskStatus.COMPLETED
                    }
                    className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    title={
                      task.status === TaskStatus.COMPLETED
                        ? "Completed tasks cannot be deleted"
                        : ""
                    }
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
