import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { contractService } from '../services';
import { IContractFilters } from '../models';

const getContracts = catchAsync(async (req: Request, res: Response) => {
    const filters: IContractFilters = {
        customer_product_id: req.query.customer_product_id as string | undefined,
        status: req.query.status as string | undefined,
    };

    const contracts = await contractService.getContracts(filters);
    res.json({ success: true, data: contracts });
});

const getContract = catchAsync(async (req: Request, res: Response) => {
    const contract = await contractService.getContractById(req.params.id as string);
    res.json({ success: true, data: contract });
});

export default {
    getContracts,
    getContract,
};
