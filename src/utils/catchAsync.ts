import { Request, Response, NextFunction } from 'express';

// gw buat wrapper, biar gaperlu try catch di tiap controller
const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default catchAsync;
