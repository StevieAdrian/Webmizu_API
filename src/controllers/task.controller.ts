import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { taskService } from '../services';
import { ITaskFilters } from '../models';

const getTasks = catchAsync(async (req: Request, res: Response) => {
    const filters: ITaskFilters = {
        customer_id: req.query.customer_id as string | undefined,
        technician_id: req.query.technician_id as string | undefined,
        job_id: req.query.job_id as string | undefined,
        status: req.query.status as string | undefined,
        task_type: req.query.task_type as string | undefined,
    };

    const tasks = await taskService.getTasks(filters);
    res.json({ success: true, data: tasks });
});

const getTask = catchAsync(async (req: Request, res: Response) => {
    const task = await taskService.getTaskById(req.params.id as string);
    res.json({ success: true, data: task });
});

export default {
    getTasks,
    getTask,
};