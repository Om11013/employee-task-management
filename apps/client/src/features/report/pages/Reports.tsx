import { useState } from "react";
import { ReportFilters } from "../components/ReportFilters";
import { ReportTable } from "../components/ReportTable";
import { EmployeeSummaryTable } from "../components/EmployeeSummaryTable";
import { SummaryCard } from "../components/SummaryCard";
import { TabNavigation, type TabType } from "../components/TabNavigation";
import { ExportButtons } from "../components/ExportButtons";
import {
  useReports,
  useReportSummary,
  useExportExcel,
  useExportCSV,
} from "../hooks/useReports";
import type { ReportFiltersParams } from "../types";
import { useAuth } from "../../../hooks/useAuth";
import type { Task } from "../../task/types";
import type { EmployeeSummary } from "../types";

export const Reports = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [filters, setFilters] = useState<ReportFiltersParams>({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useReports(activeTab, filters);
  const { data: summaryData, isLoading: isLoadingSummary } = useReportSummary();
  const { mutate: exportExcel, isPending: isExportingExcel } = useExportExcel();
  const { mutate: exportCSV, isPending: isExportingCSV } = useExportCSV();

  const handleExportExcel = () => exportExcel(filters);
  const handleExportCSV = () => exportCSV(filters);

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Reports
          </h1>
          <p className="text-gray-500 mt-1">View and export task analytics</p>
        </div>
        <ExportButtons
          onExportCSV={handleExportCSV}
          onExportExcel={handleExportExcel}
          isExportingCSV={isExportingCSV}
          isExportingExcel={isExportingExcel}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title={isAdmin ? "Total Tasks" : "My Tasks"}
          value={summaryData?.totalTasks || 0}
          isLoading={isLoadingSummary}
          colorClass="bg-blue-500"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          }
        />
        <SummaryCard
          title="Completed Tasks"
          value={summaryData?.completedTasks || 0}
          isLoading={isLoadingSummary}
          colorClass="bg-green-500"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          }
        />
        <SummaryCard
          title="Pending Tasks"
          value={summaryData?.pendingTasks || 0}
          isLoading={isLoadingSummary}
          colorClass="bg-yellow-500"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <SummaryCard
          title="Overdue Tasks"
          value={summaryData?.overdueTasks || 0}
          isLoading={isLoadingSummary}
          colorClass="bg-red-500"
          icon={
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          }
        />
      </div>

      <TabNavigation
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setFilters({ page: 1, limit: 10 });
        }}
        isAdmin={isAdmin}
      />

      {activeTab !== "employee" && (
        <ReportFilters
          filters={filters}
          onFilterChange={(f) => setFilters({ ...f, page: 1, limit: 10 })}
        />
      )}

      {activeTab === "employee" ? (
        <EmployeeSummaryTable
          summaries={(data as EmployeeSummary[]) || []}
          isLoading={isLoading}
        />
      ) : (
        <ReportTable
          tasks={(data as { items: Task[] })?.items || []}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
