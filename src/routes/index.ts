import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';

const router = Router();

const routes = [
  { path: '/auth', route: authRoutes },
  { path: '/users', route: userRoutes },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
