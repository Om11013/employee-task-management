import {
  getAdminStats,
  getEmployeeStats,
} from "../repositories/dashboard.repository.js";

export const getDashboardData = async (userId: number, role: string) => {
  if (role === "ADMIN") {
    const stats = await getAdminStats();
    return {
      totalEmployees: Number(stats.totalEmployees || 0),
      totalTasks: Number(stats.totalTasks || 0),
      completedTasks: Number(stats.completedTasks || 0),
      pendingTasks: Number(stats.pendingTasks || 0),
    };
  } else {
    const stats = await getEmployeeStats(userId);
    return {
      myTasks: Number(stats.myTasks || 0),
      completedTasks: Number(stats.completedTasks || 0),
      pendingTasks: Number(stats.pendingTasks || 0),
      overdueTasks: Number(stats.overdueTasks || 0),
    };
  }
};
