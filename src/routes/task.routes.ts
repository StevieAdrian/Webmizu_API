import { Router } from 'express';
import { taskController } from '../controllers';
import { taskValidation } from '../validations';
import validate from '../middlewares/validate';
import auth from '../middlewares/auth';

const router = Router();

router
    .route('/')
    .get(auth, validate(taskValidation.getTasks), taskController.getTasks);

router
    .route('/:id')
    .get(auth, validate(taskValidation.getTask), taskController.getTask);

export default router;