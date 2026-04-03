import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { productCatalogService } from '../services';
import { IProductCatalogFilters } from '../models';

const getProductCatalogs = catchAsync(async (req: Request, res: Response) => {
    const filters: IProductCatalogFilters = {
        category_id: req.query.category_id as string | undefined,
        name: req.query.name as string | undefined,
        model: req.query.model as string | undefined,
    };

    const productCatalogs = await productCatalogService.getProductCatalogs(filters);
    res.json({ success: true, data: productCatalogs });
});

const getProductCatalog = catchAsync(async (req: Request, res: Response) => {
    const productCatalog = await productCatalogService.getProductCatalogById(req.params.id as string);
    res.json({ success: true, data: productCatalog });
});

export default {
    getProductCatalogs,
    getProductCatalog,
};