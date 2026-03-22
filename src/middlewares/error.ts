import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import logger from '../utils/logger';
import config from '../config';

const errorConverter = (err: Error & { statusCode?: number }, _req: Request, _res: Response, next: NextFunction): void => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

const errorHandler = (err: ApiError, _req: Request, res: Response, _next: NextFunction): void => {
  let { statusCode, message } = err;

  if (config.env === 'production' && !err.isOperational) {
    statusCode = 500;
    message = 'Internal Server Error';
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).json(response);
};

export { errorConverter, errorHandler };
