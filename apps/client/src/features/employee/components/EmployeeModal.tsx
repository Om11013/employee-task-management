import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "../../../components/ui/Modal";
import { Input } from "../../../components/ui/Input";
import type {
  Employee,
  CreateEmployeePayload,
  UpdateEmployeePayload,
} from "../types";
import { useCreateEmployee, useUpdateEmployee } from "../hooks/useEmployees";

type FormData = {
  fullName: string;
  email: string;
  password?: string;
  department: string;
  designation: string;
};

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({
  isOpen,
  onClose,
  employee,
}) => {
  const isEditing = !!employee;
  const { mutateAsync: createEmployee, isPending: isCreating } =
    useCreateEmployee();
  const { mutateAsync: updateEmployee, isPending: isUpdating } =
    useUpdateEmployee();

  const dynamicSchema = z
    .object({
      fullName: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
      password: z.string().optional(),
      department: z.string().min(1, "Department is required"),
      designation: z.string().min(1, "Designation is required"),
    })
    .superRefine((data, ctx) => {
      if (!isEditing && (!data.password || data.password.length < 6)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["password"],
          message: "Password must be at least 6 characters",
        });
      }
    });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      department: "",
      designation: "",
    },
  });

  useEffect(() => {
    if (employee) {
      reset({
        fullName: employee.fullName,
        email: employee.email,
        password: "", // Don't populate password on edit
        department: employee.department,
        designation: employee.designation,
      });
    } else {
      reset({
        fullName: "",
        email: "",
        password: "",
        department: "",
        designation: "",
      });
    }
  }, [employee, reset, isOpen]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditing && employee) {
        const payload: UpdateEmployeePayload = {
          fullName: data.fullName,
          email: data.email,
          department: data.department,
          designation: data.designation,
        };
        await updateEmployee({ id: employee.userId, payload });
      } else {
        await createEmployee(data as CreateEmployeePayload);
      }
      onClose();
    } catch {
      // Error is handled by react-query mutation
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Employee" : "Create Employee"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="John Doe"
          {...register("fullName")}
          error={errors.fullName?.message}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          {...register("email")}
          error={errors.email?.message}
        />

        {!isEditing && (
          <Input
            label="Password"
            type="password"
            placeholder="Min 6 characters"
            {...register("password")}
            error={errors.password?.message}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Department"
            placeholder="Engineering"
            {...register("department")}
            error={errors.department?.message}
          />
          <Input
            label="Designation"
            placeholder="Frontend Developer"
            {...register("designation")}
            error={errors.designation?.message}
          />
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isPending
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Create Employee"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
