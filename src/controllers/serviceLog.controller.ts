import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { serviceLogService } from '../services';
import { IServiceLogFilters } from '../models';

const getServiceLogs = catchAsync(async (req: Request, res: Response) => {
    const filters: IServiceLogFilters = {
        expected_id: req.query.expected_id as string | undefined,
        customer_product_id: req.query.customer_product_id as string | undefined,
        technician_id: req.query.technician_id as string | undefined,
        service_type: req.query.service_type as string | undefined,
        job_id: req.query.job_id as string | undefined,
        task_id: req.query.task_id as string | undefined,
    };

    const serviceLogs = await serviceLogService.getServiceLogs(filters);
    res.json({ success: true, data: serviceLogs });
});

const getServiceLog = catchAsync(async (req: Request, res: Response) => {
    const serviceLog = await serviceLogService.getServiceLogById(req.params.id as string);
    res.json({ success: true, data: serviceLog });
});

export default {
    getServiceLogs,
    getServiceLog,
};