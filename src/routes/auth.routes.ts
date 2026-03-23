import { Router } from 'express';
import { authController } from '../controllers';
import { authValidation } from '../validations';
import validate from '../middlewares/validate';
import auth from '../middlewares/auth';

const router = Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', auth, authController.logout);
router.post('/refresh-token', validate(authValidation.refreshToken), authController.refreshToken);

export default router;
