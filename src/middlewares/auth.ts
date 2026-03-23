import { Request, Response, NextFunction } from 'express';
import ApiError from '../utils/ApiError';
import supabase from '../lib/supabase';

const auth = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authentication required'));
  }

  try {
    const token = authHeader.split(' ')[1];
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) return next(new ApiError(401, 'Invalid or expired token'));

    (req as any).user = data.user;
    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired token'));
  }
};

export default auth;
