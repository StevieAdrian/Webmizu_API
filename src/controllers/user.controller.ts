import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { userService } from '../services';

const getUsers = catchAsync(async (_req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json({ success: true, data: users });
});

const getUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id as string);
  res.json({ success: true, data: user });
});

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(201).json({ success: true, data: user });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.updateUser(req.params.id as string, req.body);
  res.json({ success: true, data: user });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  await userService.deleteUser(req.params.id as string);
  res.status(204).send();
});

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
