import { Router } from 'express';
import { serviceLogController } from '../controllers';
import { serviceLogValidation } from '../validations';
import validate from '../middlewares/validate';
import auth from '../middlewares/auth';

const router = Router();

router
    .route('/')
    .get(auth, validate(serviceLogValidation.getServiceLogs), serviceLogController.getServiceLogs);

router
    .route('/:id')
    .get(auth, validate(serviceLogValidation.getServiceLog), serviceLogController.getServiceLog);

export default router;