export type DashboardData = {
  totalEmployees?: number;
  totalTasks?: number;
  myTasks?: number;
  completedTasks: number;
  pendingTasks: number;
  overdueTasks?: number;
};

export type DashboardResponse = {
  success: boolean;
  data: DashboardData;
};
