import { Request, Response, NextFunction } from 'express';
import Joi from '@hapi/joi';
import baseValidator from '.';

export const phaseParams = (req: Request, res: Response, next: NextFunction): void => {
  const schema = Joi.object({
    phaseId: Joi.number().required(),
  });
  baseValidator(schema, req, res, next, 'params');
};
