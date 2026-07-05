import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

import dashboardRoutes from "./routes/dashboard.routes.js";
import employeeRoutes from "./modules/employee/employee.routes.js";
import taskRoutes from "./modules/task/task.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Vite default port
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);

app.use(errorHandler);

export default app;
