import { Router } from 'express';
import { customerProductController } from '../controllers';
import { customerProductValidation } from '../validations';
import validate from '../middlewares/validate';
import auth from '../middlewares/auth';

const router = Router();

router
    .route('/')
    .get(auth, validate(customerProductValidation.getCustomerProducts), customerProductController.getCustomerProducts);

router
    .route('/:id')
    .get(auth, validate(customerProductValidation.getCustomerProduct), customerProductController.getCustomerProduct);

export default router;