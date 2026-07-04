import { pool } from "../config/db.js";
import type { RowDataPacket } from "mysql2";

export const getAdminStats = async () => {
  const query = `
    SELECT 
      (SELECT COUNT(*) FROM users WHERE role = 'EMPLOYEE') as totalEmployees,
      (SELECT COUNT(*) FROM tasks) as totalTasks,
      (SELECT COUNT(*) FROM tasks WHERE status = 'COMPLETED') as completedTasks,
      (SELECT COUNT(*) FROM tasks WHERE status != 'COMPLETED') as pendingTasks
  `;
  const [rows] = await pool.query<RowDataPacket[]>(query);
  return rows[0] as {
    totalEmployees: number | string;
    totalTasks: number | string;
    completedTasks: number | string;
    pendingTasks: number | string;
  };
};

export const getEmployeeStats = async (userId: number) => {
  const query = `
    SELECT 
      COUNT(t.id) as myTasks,
      COALESCE(SUM(CASE WHEN t.status = 'COMPLETED' THEN 1 ELSE 0 END), 0) as completedTasks,
      COALESCE(SUM(CASE WHEN t.status != 'COMPLETED' THEN 1 ELSE 0 END), 0) as pendingTasks,
      COALESCE(SUM(CASE WHEN t.status != 'COMPLETED' AND t.dueDate < CURRENT_DATE() THEN 1 ELSE 0 END), 0) as overdueTasks
    FROM tasks t
    JOIN employees e ON t.assignedEmployeeId = e.id
    WHERE e.userId = ?
  `;
  const [rows] = await pool.query<RowDataPacket[]>(query, [userId]);
  return rows[0] as {
    myTasks: number | string;
    completedTasks: number | string;
    pendingTasks: number | string;
    overdueTasks: number | string;
  };
};
