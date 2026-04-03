import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import taskRoutes from './task.routes';

const router = Router();

const routes = [
  { path: '/auth', route: authRoutes },
  { path: '/users', route: userRoutes },
  { path: '/tasks', route: taskRoutes },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
