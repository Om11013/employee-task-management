import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

import dashboardRoutes from "./routes/dashboard.routes.js";
import employeeRoutes from "./modules/employee/employee.routes.js";
import taskRoutes from "./modules/task/task.routes.js";
import notificationRoutes from "./modules/notification/notification.routes.js";
import attachmentRoutes from "./modules/attachment/attachment.routes.js";
import reportRoutes from "./modules/report/report.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Vite default port
    credentials: true,
  }),
);

import path from "path";

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/attachments", attachmentRoutes);
app.use("/api/reports", reportRoutes);

app.use(errorHandler);

export default app;
