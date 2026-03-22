import { Router } from 'express';
import { userController } from '../controllers';
import { userValidation } from '../validations';
import validate from '../middlewares/validate';
import auth from '../middlewares/auth';

const router = Router();

router
  .route('/')
  .get(auth, userController.getUsers)
  .post(auth, validate(userValidation.createUser), userController.createUser);

router
  .route('/:id')
  .get(auth, validate(userValidation.getUser), userController.getUser)
  .patch(auth, validate(userValidation.updateUser), userController.updateUser)
  .delete(auth, validate(userValidation.deleteUser), userController.deleteUser);

export default router;
