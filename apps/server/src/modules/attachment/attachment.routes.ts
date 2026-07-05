import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import * as controller from "./attachment.controller.js";

const router = Router();
router.use(authenticate);

router.delete("/:id", controller.deleteAttachment);

export default router;
