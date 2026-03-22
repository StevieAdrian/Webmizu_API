import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { authService } from '../services';

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.register(req.body);
  res.status(201).json({ success: true, data: user });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.json({ success: true, data: result });
});

export default {
  register,
  login,
};
