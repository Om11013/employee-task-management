import { requestV1 } from "../../../api/rest";
import type {
  Employee,
  PaginatedResponse,
  GetEmployeesParams,
  CreateEmployeePayload,
  UpdateEmployeePayload,
} from "../types";

export const fetchEmployees = async (
  params: GetEmployeesParams,
): Promise<PaginatedResponse<Employee>> => {
  const response = await requestV1<
    undefined,
    { data: PaginatedResponse<Employee> }
  >("GET", "/employees", undefined, { params });
  return response.data;
};

export const createEmployee = async (
  payload: CreateEmployeePayload,
): Promise<Employee> => {
  const response = await requestV1<CreateEmployeePayload, { data: Employee }>(
    "POST",
    "/employees",
    payload,
  );
  return response.data;
};

export const updateEmployee = async ({
  id,
  payload,
}: {
  id: number;
  payload: UpdateEmployeePayload;
}): Promise<Employee> => {
  const response = await requestV1<UpdateEmployeePayload, { data: Employee }>(
    "PUT",
    `/employees/${id}`,
    payload,
  );
  return response.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await requestV1<never, { success: boolean }>("DELETE", `/employees/${id}`);
};
