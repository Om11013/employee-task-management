import { z } from "zod";
import { Priority, Status } from "@prisma/client";

export const CreateTaskSchema = z.object({
  body: z
    .object({
      title: z.string().min(1, "Title is required"),
      description: z.string().optional(),
      priority: z.nativeEnum(Priority),
      assignedEmployeeId: z.number(),
      startDate: z
        .string()
        .or(z.date())
        .refine((val) => !isNaN(new Date(val).getTime()), {
          message: "Start Date must be a valid date",
        }),
      dueDate: z
        .string()
        .or(z.date())
        .refine((val) => !isNaN(new Date(val).getTime()), {
          message: "Due Date must be a valid date",
        }),
    })
    .refine(
      (data) =>
        new Date(data.dueDate).setHours(0, 0, 0, 0) >=
        new Date(data.startDate).setHours(0, 0, 0, 0),
      {
        message: "Due Date cannot be earlier than Start Date",
        path: ["dueDate"], // path of error
      },
    ),
});

export const UpdateTaskSchema = z.object({
  body: z
    .object({
      title: z.string().min(1, "Title is required").optional(),
      description: z.string().optional(),
      priority: z.nativeEnum(Priority).optional(),
      status: z.nativeEnum(Status).optional(),
      assignedEmployeeId: z.number().optional(),
      startDate: z
        .string()
        .or(z.date())
        .refine((val) => !isNaN(new Date(val).getTime()), {
          message: "Start Date must be a valid date",
        })
        .optional(),
      dueDate: z
        .string()
        .or(z.date())
        .refine((val) => !isNaN(new Date(val).getTime()), {
          message: "Due Date must be a valid date",
        })
        .optional(),
    })
    .refine(
      (data) => {
        if (data.startDate && data.dueDate) {
          return (
            new Date(data.dueDate).setHours(0, 0, 0, 0) >=
            new Date(data.startDate).setHours(0, 0, 0, 0)
          );
        }
        return true;
      },
      {
        message: "Due Date cannot be earlier than Start Date",
        path: ["dueDate"],
      },
    ),
});

const emptyStringToUndefined = (val: unknown) => (val === "" ? undefined : val);

export const GetTasksQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),
    search: z.preprocess(emptyStringToUndefined, z.string().optional()),
    sortBy: z
      .enum([
        "title",
        "priority",
        "status",
        "startDate",
        "dueDate",
        "createdAt",
      ])
      .default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
    priority: z.preprocess(
      emptyStringToUndefined,
      z.nativeEnum(Priority).optional(),
    ),
    status: z.preprocess(
      emptyStringToUndefined,
      z.nativeEnum(Status).optional(),
    ),
    assignedEmployeeId: z.preprocess(
      emptyStringToUndefined,
      z.coerce.number().optional(),
    ),
  }),
});
