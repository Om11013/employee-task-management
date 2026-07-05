import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import * as controller from "./task.controller.js";
import {
  CreateTaskSchema,
  UpdateTaskSchema,
  GetTasksQuerySchema,
} from "./task.validation.js";

const router = Router();

// All task routes require authentication
router.use(authenticate);

// Both ADMIN and EMPLOYEE can view tasks
router.get("/", validate(GetTasksQuerySchema), controller.getTasks);
router.get("/:id", controller.getTaskById);

import {
  uploadAttachment,
  getAttachments,
} from "../attachment/attachment.controller.js";
import { upload } from "../attachment/attachment.middleware.js";

// Attachment routes
router.post("/:taskId/attachments", upload.single("file"), uploadAttachment);
router.get("/:taskId/attachments", getAttachments);

// Only ADMIN can create, update, or delete tasks
router.post(
  "/",
  authorize("ADMIN"),
  validate(CreateTaskSchema),
  controller.createTask,
);
router.put(
  "/:id",
  authorize("ADMIN"),
  validate(UpdateTaskSchema),
  controller.updateTask,
);
router.delete("/:id", authorize("ADMIN"), controller.deleteTask);

export default router;
