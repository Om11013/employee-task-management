import type { Request, Response, NextFunction } from "express";
import * as employeeService from "./employee.service.js";
import type { GetEmployeesQuery } from "./employee.types.js";

export const getEmployees = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const query = req.query as unknown as GetEmployeesQuery;
    const data = await employeeService.getEmployees(query);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await employeeService.getEmployeeById(Number(req.params.id));
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await employeeService.createEmployee(req.body);
    res
      .status(201)
      .json({ success: true, data, message: "Employee created successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await employeeService.updateEmployee(
      Number(req.params.id),
      req.body,
    );
    res
      .status(200)
      .json({ success: true, data, message: "Employee updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await employeeService.deleteEmployee(Number(req.params.id));
    res
      .status(200)
      .json({ success: true, message: "Employee deleted successfully" });
  } catch (error) {
    next(error);
  }
};
