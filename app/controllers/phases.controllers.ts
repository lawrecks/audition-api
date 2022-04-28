import { Request, Response, NextFunction } from 'express';
import * as service from '../services/phase.services';
import { successResponse } from '../utils/helpers/response.helpers';

export const getPhases = (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = service.getPhases();
    return successResponse(res, 'Phases fetched successfully', 200, data);
  } catch (error) {
    return next(error);
  }
};

export const getPhase = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phaseId } = req.params;
    const data = service.getPhase(Number(phaseId));
    return successResponse(res, 'Phase fetched successfully', 200, data);
  } catch (error) {
    return next(error);
  }
};

export const createPhase = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const data = service.createPhase(name);
    return successResponse(res, 'Phase created successfully', 201, data);
  } catch (error) {
    return next(error);
  }
};

export const addTaskToPhase = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, phaseId } = req.body;
    const data = service.addTaskToPhase(name, Number(phaseId));
    return successResponse(res, 'Task added to phase successfully', 201, data);
  } catch (error) {
    return next(error);
  }
};

export const getPhaseTask = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId, phaseId } = req.params;
    const data = service.getPhaseTask(Number(taskId), Number(phaseId));
    return successResponse(res, 'Task fetched successfully', 200, data);
  } catch (error) {
    return next(error);
  }
};

export const updateTaskStatus = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phaseId, taskId } = req.params;
    const data = service.updateTaskStatus(Number(phaseId), Number(taskId));
    return successResponse(res, 'Task updated successfully', 200, data);
  } catch (error) {
    return next(error);
  }
};
