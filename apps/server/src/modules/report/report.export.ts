import ExcelJS from "exceljs";
import { createObjectCsvStringifier } from "csv-writer";

type ExportData = {
  id: number;
  title: string;
  status: string;
  priority: string;
  assignedEmployee?: {
    user?: {
      fullName: string;
    } | null;
  } | null;
  creator?: {
    fullName: string;
  } | null;
  createdAt?: string | Date | null;
  completedAt?: string | Date | null;
  [key: string]: unknown;
};

export const generateExcelReport = async (data: ExportData[]) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Report");

  sheet.columns = [
    { header: "Task ID", key: "id", width: 10 },
    { header: "Title", key: "title", width: 30 },
    { header: "Status", key: "status", width: 15 },
    { header: "Priority", key: "priority", width: 15 },
    { header: "Assigned To", key: "assignedEmployee", width: 25 },
    { header: "Created By", key: "creator", width: 25 },
    { header: "Created At", key: "createdAt", width: 20 },
    { header: "Completed At", key: "completedAt", width: 20 },
  ];

  data.forEach((task) => {
    sheet.addRow({
      id: task.id,
      title: task.title,
      status: task.status,
      priority: task.priority,
      assignedEmployee: task.assignedEmployee?.user?.fullName || "Unassigned",
      creator: task.creator?.fullName || "System",
      createdAt: task.createdAt
        ? new Date(task.createdAt as string).toLocaleString()
        : "",
      completedAt: task.completedAt
        ? new Date(task.completedAt as string).toLocaleString()
        : "N/A",
    });
  });

  return workbook.xlsx.writeBuffer();
};

export const generateCSVReport = (data: ExportData[]) => {
  const csvStringifier = createObjectCsvStringifier({
    header: [
      { id: "id", title: "Task ID" },
      { id: "title", title: "Title" },
      { id: "status", title: "Status" },
      { id: "priority", title: "Priority" },
      { id: "assignedEmployee", title: "Assigned To" },
      { id: "creator", title: "Created By" },
      { id: "createdAt", title: "Created At" },
      { id: "completedAt", title: "Completed At" },
    ],
  });

  const records = data.map((task) => ({
    id: task.id,
    title: task.title,
    status: task.status,
    priority: task.priority,
    assignedEmployee: task.assignedEmployee?.user?.fullName || "Unassigned",
    creator: task.creator?.fullName || "System",
    createdAt: task.createdAt ? new Date(task.createdAt).toLocaleString() : "",
    completedAt: task.completedAt
      ? new Date(task.completedAt).toLocaleString()
      : "N/A",
  }));

  return (
    csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records)
  );
};
