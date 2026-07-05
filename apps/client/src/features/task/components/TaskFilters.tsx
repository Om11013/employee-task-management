import React, { useState, useEffect } from "react";
import { Input } from "../../../components/ui/Input";
import { TaskPriority, TaskStatus } from "../types";
import { useEmployees } from "../../employee/hooks/useEmployees";
import { useAuth } from "../../../hooks/useAuth";

interface TaskFiltersProps {
  onSearchChange: (search: string) => void;
  onSortChange: (sortBy: string, sortOrder: string) => void;
  onFilterChange: (key: string, value: string | number) => void;
  currentSortBy?: string;
  currentSortOrder?: string;
  currentPriority?: string;
  currentStatus?: string;
  currentAssignedEmployeeId?: number | "";
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  onSearchChange,
  onSortChange,
  onFilterChange,
  currentSortBy = "createdAt",
  currentSortOrder = "desc",
  currentPriority = "",
  currentStatus = "",
  currentAssignedEmployeeId = "",
}) => {
  const { isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  // Need employee list for filter, but only if Admin (employees only see their own anyway)
  const { data: employeeData } = useEmployees(
    {
      page: 1,
      limit: 100, // Fetch enough for a dropdown
      sortBy: "fullName",
      sortOrder: "asc",
    },
    { enabled: isAdmin },
  );

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearchChange]);

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:w-64">
          <Input
            label=""
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-0"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">
            Sort by:
          </label>
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={`${currentSortBy}-${currentSortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split("-");
              onSortChange(sortBy, sortOrder);
            }}
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="dueDate-asc">Due Date (Soonest)</option>
            <option value="dueDate-desc">Due Date (Latest)</option>
            <option value="priority-desc">Priority (High to Low)</option>
            <option value="priority-asc">Priority (Low to High)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none grow sm:grow-0 min-w-[140px]"
          value={currentPriority}
          onChange={(e) => onFilterChange("priority", e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value={TaskPriority.LOW}>Low</option>
          <option value={TaskPriority.MEDIUM}>Medium</option>
          <option value={TaskPriority.HIGH}>High</option>
        </select>

        <select
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none grow sm:grow-0 min-w-[140px]"
          value={currentStatus}
          onChange={(e) => onFilterChange("status", e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value={TaskStatus.PENDING}>Pending</option>
          <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
          <option value={TaskStatus.COMPLETED}>Completed</option>
        </select>

        {isAdmin && (
          <select
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none grow sm:grow-0 min-w-[180px]"
            value={currentAssignedEmployeeId}
            onChange={(e) =>
              onFilterChange(
                "assignedEmployeeId",
                e.target.value ? Number(e.target.value) : "",
              )
            }
          >
            <option value="">All Employees</option>
            {employeeData?.items.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.fullName}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};
