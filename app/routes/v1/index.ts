import { Router, Request, Response } from 'express';
import * as phaseController from '../../controllers/phases.controllers';
import * as phaseValidator from '../../utils/validations/phase.validation';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Welcome to audition API!',
  });
});

router.get('/phase', phaseController.getPhases);

router.get('/phase/:phaseId', phaseValidator.phaseParams, phaseController.getPhase);

router.post('/phase', phaseValidator.createPhase, phaseController.createPhase);

router.post('/phase/task', phaseValidator.addTask, phaseController.addTaskToPhase);

router.get('/phase/task/:phaseId/:taskId', phaseValidator.phaseTaskParams, phaseController.getPhaseTask);

router.patch('/phase/task/:phaseId/:taskId', phaseValidator.phaseTaskParams, phaseController.updateTaskStatus);

export default router;
