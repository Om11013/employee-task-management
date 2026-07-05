import { Router } from "express";
import { authenticate } from "../../middleware/auth.middleware.js";
import * as controller from "./report.controller.js";

const router = Router();
router.use(authenticate);

router.get("/", controller.getReports);
router.get("/summary", controller.getSummary);
router.get("/completed", controller.getCompletedReports);
router.get("/pending", controller.getPendingReports);
router.get("/employee-summary", controller.getEmployeeReports);
router.get("/export/excel", controller.exportExcel);
router.get("/export/csv", controller.exportCSV);

export default router;
