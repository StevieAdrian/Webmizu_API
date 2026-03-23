import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { authService } from '../services';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  res.status(201).json({ success: true, data: result });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.json({ success: true, data: result });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) await authService.logout(token);

  res.json({ success: true, message: 'Logged out successfully' });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refresh_token } = req.body;
  const result = await authService.refreshToken(refresh_token);
  
  res.json({ success: true, data: result });
});

export default {
  register,
  login,
  logout,
  refreshToken,
};
