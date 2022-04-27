import { Response } from 'express';

export const Error = (message: string, code: number) => ({
  status: 'error',
  message,
  code,
});

export const successResponse = (
  res: Response,
  message: string,
  code: number,
  data = {},
) => {
  res.status(code).json({
    status: 'success',
    message,
    code,
    data,
  });
};
