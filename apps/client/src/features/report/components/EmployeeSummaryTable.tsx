import type { EmployeeSummary } from "../types";

interface Props {
  summaries: EmployeeSummary[];
  isLoading: boolean;
}

export const EmployeeSummaryTable = ({ summaries, isLoading }: Props) => {
  if (isLoading) {
    return (
      <div className="text-center py-12 text-gray-500 flex flex-col items-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        Loading employee summary...
      </div>
    );
  }

  if (!summaries.length) {
    return (
      <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">
        No employee summary data available.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Designation
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Tasks
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Completed
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pending
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Overdue
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {summaries.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {emp.fullName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {emp.department}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {emp.designation}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                {emp.totalTasks}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                {emp.completedTasks}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                {emp.pendingTasks}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">
                {emp.overdueTasks}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
