import { Router } from 'express';
import { technicianController } from '../controllers';
import { technicianValidation } from '../validations';
import validate from '../middlewares/validate';
import auth from '../middlewares/auth';

const router = Router();

router
    .route('/')
    .get(auth, validate(technicianValidation.getTechnicians), technicianController.getTechnicians);

router
    .route('/:id')
    .get(auth, validate(technicianValidation.getTechnician), technicianController.getTechnician);

export default router;