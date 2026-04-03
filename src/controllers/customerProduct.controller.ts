import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { customerProductService } from '../services';
import { ICustomerProductFilters } from '../models';

const getCustomerProducts = catchAsync(async (req: Request, res: Response) => {
    const filters: ICustomerProductFilters = {
        customer_id: req.query.customer_id as string | undefined,
        product_catalog_id: req.query.product_catalog_id as string | undefined,
        installation_technician_id: req.query.installation_technician_id as string | undefined,
        status: req.query.status as string | undefined,
    };

    const customerProducts = await customerProductService.getCustomerProducts(filters);
    res.json({ success: true, data: customerProducts });
});

const getCustomerProduct = catchAsync(async (req: Request, res: Response) => {
    const customerProduct = await customerProductService.getCustomerProductById(req.params.id as string);
    res.json({ success: true, data: customerProduct });
});

export default {
    getCustomerProducts,
    getCustomerProduct,
};