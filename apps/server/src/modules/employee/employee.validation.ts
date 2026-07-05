import { z } from "zod";

export const CreateEmployeeSchema = z.object({
  body: z.object({
    fullName: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    department: z.string().min(1, "Department is required"),
    designation: z.string().min(1, "Designation is required"),
  }),
});

export const UpdateEmployeeSchema = z.object({
  body: z.object({
    fullName: z.string().min(1, "Name is required").optional(),
    email: z.string().email("Invalid email address").optional(),
    department: z.string().min(1, "Department is required").optional(),
    designation: z.string().min(1, "Designation is required").optional(),
  }),
});

export const GetEmployeesQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    search: z.string().optional(),
    sortBy: z
      .enum(["fullName", "email", "department", "designation", "createdAt"])
      .default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  }),
});
