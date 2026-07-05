import type { Request, Response, NextFunction } from "express";
import * as taskService from "./task.service.js";
import type { GetTasksQuery } from "./task.types.js";

export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const query = req.query as unknown as GetTasksQuery;
    const data = await taskService.getTasks(
      query,
      req.user!.role,
      req.user!.id,
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await taskService.getTaskById(
      Number(req.params.id),
      req.user!.role,
      req.user!.id,
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await taskService.createTask(req.body, req.user!.id);
    res
      .status(201)
      .json({ success: true, data, message: "Task created successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await taskService.updateTask(Number(req.params.id), req.body);
    res
      .status(200)
      .json({ success: true, data, message: "Task updated successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await taskService.deleteTask(Number(req.params.id));
    res
      .status(200)
      .json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
