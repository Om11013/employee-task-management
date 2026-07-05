import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validate.middleware.js";
import * as controller from "./notification.controller.js";
import { GetNotificationsQuerySchema } from "./notification.validation.js";

const router = Router();

router.use(authenticate);

router.get(
  "/",
  validate(GetNotificationsQuerySchema),
  controller.getNotifications,
);
router.patch("/read-all", controller.markAllAsRead);
router.patch("/:id/read", controller.markAsRead);
router.delete("/:id", controller.deleteNotification);

export default router;
