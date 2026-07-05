import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../api/employee.api";
import type { GetEmployeesParams } from "../types";
import { toast } from "sonner";

export const employeeKeys = {
  all: ["employees"] as const,
  list: (params: GetEmployeesParams) => ["employees", "list", params] as const,
};

export const useEmployees = (params: GetEmployeesParams) => {
  return useQuery({
    queryKey: employeeKeys.list(params),
    queryFn: () => fetchEmployees(params),
    placeholderData: (previousData) => previousData,
  });
};

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
      toast.success("Employee created successfully");
    },
    onError: () => {
      // Error is already handled by interceptor, but we could do more here
    },
  });
};

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
      toast.success("Employee updated successfully");
    },
  });
};

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.all });
      toast.success("Employee deleted successfully");
    },
  });
};
