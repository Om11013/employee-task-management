import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import * as controller from "./employee.controller.js";
import {
  CreateEmployeeSchema,
  UpdateEmployeeSchema,
  GetEmployeesQuerySchema,
} from "./employee.validation.js";

const router = Router();

// All employee routes require authentication
router.use(authenticate);

// Both ADMIN and EMPLOYEE can view employees
router.get("/", validate(GetEmployeesQuerySchema), controller.getEmployees);
router.get("/:id", controller.getEmployeeById);

// Only ADMIN can create, update, or delete employees
router.post(
  "/",
  authorize("ADMIN"),
  validate(CreateEmployeeSchema),
  controller.createEmployee,
);
router.put(
  "/:id",
  authorize("ADMIN"),
  validate(UpdateEmployeeSchema),
  controller.updateEmployee,
);
router.delete("/:id", authorize("ADMIN"), controller.deleteEmployee);

export default router;
