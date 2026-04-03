import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import taskRoutes from './task.routes';
import technicianRoutes from './technician.routes';

const router = Router();

const routes = [
  { path: '/auth', route: authRoutes },
  { path: '/users', route: userRoutes },
  { path: '/tasks', route: taskRoutes },
  { path: '/technicians', route: technicianRoutes },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
