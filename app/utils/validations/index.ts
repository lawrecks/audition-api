/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import { Error } from '../helpers/response.helpers';

const dynamicValidator = async (schema: any, req: Request, type: string) => {
  const requestTypes: any = {
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
  };
  requestTypes[type] = await schema.validateAsync(requestTypes[type]);
};

const baseValidator = async (
  schema: any,
  req: Request,
  res: Response,
  next: NextFunction,
  type: string,
) => {
  try {
    await dynamicValidator(schema, req, type);
    return next();
  } catch (error: any) {
    next(Error(error.message.replace(/["]/gi, ''), 400));
  }
};

export default baseValidator;
