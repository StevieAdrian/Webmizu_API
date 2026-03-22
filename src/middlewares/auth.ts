import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';

const auth = (req: Request, _res: Response, next: NextFunction): void => {
  // jwt verif (to be implemented)
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authentication required'));
  }

  try {
    // verify token & attach user to request (to be implemented)
    // const token = authHeader.split(' ')[1];
    // const decoded = jwt.verify(token, config.jwt.secret);
    // req.user = decoded;
    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};

export default auth;
