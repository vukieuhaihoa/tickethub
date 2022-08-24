import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { CustomError } from '../common/error.common';

export const ErrorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(error);
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      errors: error.serializeError(),
    });
    return;
  }
  res.status(400).json({
    errors: [
      {
        message: 'something went wrong',
      },
    ],
  });
};
