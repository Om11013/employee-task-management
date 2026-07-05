import { useState } from "react";
import { useEmployees } from "../hooks/useEmployees";
import { EmployeeTable } from "../components/EmployeeTable";
import { EmployeeModal } from "../components/EmployeeModal";
import { EmployeeFilters } from "../components/EmployeeFilters";
import type { Employee, GetEmployeesParams } from "../types";

const Employees = () => {
  const [params, setParams] = useState<GetEmployeesParams>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const { data, isLoading, isError } = useEmployees(params);

  const handleSearch = (search: string) => {
    setParams((prev) => ({ ...prev, search, page: 1 }));
  };

  const handleSort = (sortBy: string, sortOrder: string) => {
    setParams((prev) => ({
      ...prev,
      sortBy: sortBy as GetEmployeesParams["sortBy"],
      sortOrder: sortOrder as "asc" | "desc",
    }));
  };

  const handleCreate = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setIsModalOpen(true);
  };

  const handlePageChange = (newPage: number) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your team members and their roles.
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Employee
        </button>
      </div>

      <EmployeeFilters
        onSearchChange={handleSearch}
        onSortChange={handleSort}
        currentSortBy={params.sortBy}
        currentSortOrder={params.sortOrder}
      />

      {isError ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mt-6 border border-red-100">
          Failed to load employees. Please try again.
        </div>
      ) : (
        <>
          <EmployeeTable
            employees={data?.items || []}
            isLoading={isLoading}
            onEdit={handleEdit}
          />

          {data && data.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between bg-white px-4 py-3 sm:px-6 rounded-lg shadow-sm border border-gray-200">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {(data.page - 1) * data.pageSize + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(data.page * data.pageSize, data.total)}
                    </span>{" "}
                    of <span className="font-medium">{data.total}</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => handlePageChange(data.page - 1)}
                      disabled={data.page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {Array.from({ length: data.totalPages }).map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handlePageChange(idx + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          data.page === idx + 1
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(data.page + 1)}
                      disabled={data.page === data.totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {isModalOpen && (
        <EmployeeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          employee={editingEmployee}
        />
      )}
    </div>
  );
};

export default Employees;
