import { Router } from 'express';
import { contractController } from '../controllers';
import { contractValidation } from '../validations';
import validate from '../middlewares/validate';
import auth from '../middlewares/auth';

const router = Router();

router
    .route('/')
    .get(auth, validate(contractValidation.getContracts), contractController.getContracts);

router
    .route('/:id')
    .get(auth, validate(contractValidation.getContract), contractController.getContract);

export default router;
