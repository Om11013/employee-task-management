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

// All employee routes are restricted to ADMIN only
router.use(authenticate, authorize("ADMIN"));

router.get("/", validate(GetEmployeesQuerySchema), controller.getEmployees);
router.get("/:id", controller.getEmployeeById);
router.post("/", validate(CreateEmployeeSchema), controller.createEmployee);
router.put("/:id", validate(UpdateEmployeeSchema), controller.updateEmployee);
router.delete("/:id", controller.deleteEmployee);

export default router;
