import React from "react";
import type { ReportFiltersParams } from "../types";
import { useAuth } from "../../../hooks/useAuth";
import { useEmployees } from "../../employee/hooks/useEmployees";

interface Props {
  filters: ReportFiltersParams;
  onFilterChange: (filters: ReportFiltersParams) => void;
}

export const ReportFilters = ({ filters, onFilterChange }: Props) => {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const { data: employeesData } = useEmployees(
    { page: 1, limit: 100 },
    { enabled: isAdmin },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    onFilterChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4 mb-6">
      <div className="flex items-center bg-gray-50 border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto">
        <svg
          className="w-4 h-4 text-gray-400 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          name="search"
          placeholder="Search task title..."
          value={filters.search || ""}
          onChange={handleChange}
          className="bg-transparent border-none outline-none text-sm w-full focus:ring-0 p-0"
        />
      </div>
      {isAdmin && (
        <select
          name="employeeId"
          value={filters.employeeId || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">All Employees</option>
          {employeesData?.items
            .filter((emp) => emp.id)
            .map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.fullName}
              </option>
            ))}
        </select>
      )}

      <select
        name="priority"
        value={filters.priority || ""}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Priorities</option>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>

      <select
        name="status"
        value={filters.status || ""}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Statuses</option>
        <option value="PENDING">Pending</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="COMPLETED">Completed</option>
      </select>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">From</span>
        <input
          type="date"
          name="startDate"
          value={filters.startDate || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">To</span>
        <input
          type="date"
          name="endDate"
          value={filters.endDate || ""}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <button
        onClick={() => onFilterChange({})}
        className="text-sm text-gray-600 hover:text-gray-900 px-3 py-2 underline"
      >
        Clear Filters
      </button>
    </div>
  );
};
