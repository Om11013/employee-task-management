import React, { useState, useEffect } from "react";
import { Input } from "../../../components/ui/Input";

interface EmployeeFiltersProps {
  onSearchChange: (search: string) => void;
  onSortChange: (sortBy: string, sortOrder: string) => void;
  currentSortBy?: string;
  currentSortOrder?: string;
}

export const EmployeeFilters: React.FC<EmployeeFiltersProps> = ({
  onSearchChange,
  onSortChange,
  currentSortBy = "createdAt",
  currentSortOrder = "desc",
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearchChange]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="w-full sm:w-64">
        <Input
          label=""
          placeholder="Search employees..."
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
          <option value="fullName-asc">Name (A-Z)</option>
          <option value="fullName-desc">Name (Z-A)</option>
          <option value="department-asc">Department (A-Z)</option>
        </select>
      </div>
    </div>
  );
};
