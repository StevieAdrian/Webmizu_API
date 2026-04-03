import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { technicianService } from '../services';
import { ITechnicianFilters } from '../models';

const getTechnicians = catchAsync(async (req: Request, res: Response) => {
    const filters: ITechnicianFilters = {
        name: req.query.name as string | undefined,
        phone: req.query.phone as string | undefined,
    };

    const technicians = await technicianService.getTechnicians(filters);
    res.json({ success: true, data: technicians });
});

const getTechnician = catchAsync(async (req: Request, res: Response) => {
    const technician = await technicianService.getTechnicianById(req.params.id as string);
    res.json({ success: true, data: technician });
});

export default {
    getTechnicians,
    getTechnician,
};