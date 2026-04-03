import { Router } from 'express';
import { productCatalogController } from '../controllers';
import { productCatalogValidation } from '../validations';
import validate from '../middlewares/validate';
import auth from '../middlewares/auth';

const router = Router();

router
    .route('/')
    .get(auth, validate(productCatalogValidation.getProductCatalogs), productCatalogController.getProductCatalogs);

router
    .route('/:id')
    .get(auth, validate(productCatalogValidation.getProductCatalog), productCatalogController.getProductCatalog);

export default router;