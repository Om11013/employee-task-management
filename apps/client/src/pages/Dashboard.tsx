import { useDashboard } from "../features/dashboard/hooks/useDashboard";
import { StatCard } from "../features/dashboard/components/StatCard";

const LABEL_MAP: Record<string, string> = {
  totalEmployees: "Total Employees",
  totalTasks: "Total Tasks",
  myTasks: "My Tasks",
  completedTasks: "Completed Tasks",
  pendingTasks: "Pending Tasks",
  overdueTasks: "Overdue Tasks",
};

export default function Dashboard() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-8 text-center text-red-500">
        <p>Failed to load dashboard data. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(data).map(([key, value]) => {
          const label = LABEL_MAP[key];
          if (!label) return null;

          return <StatCard key={key} title={label} value={value as number} />;
        })}
      </div>
    </div>
  );
}
