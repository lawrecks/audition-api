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

router.get('/phases', phaseController.getPhases);

router.get('/phases/:phaseId', phaseValidator.phaseParams, phaseController.getPhase);

export default router;
