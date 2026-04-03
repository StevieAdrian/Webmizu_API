import ApiError from '../utils/ApiError';
import { ITask, ITaskFilters, TASK_TABLE } from '../models';
import supabase from '../lib/supabase';

const getTasks = async (filters: ITaskFilters = {}): Promise<ITask[]> => {
    let query = supabase.from(TASK_TABLE).select('*');

    if (filters.customer_id)  query = query.eq('customer_id', filters.customer_id);
    if (filters.technician_id)  query = query.eq('technician_id', filters.technician_id);
    if (filters.job_id)  query = query.eq('job_id', filters.job_id);
    if (filters.status)  query = query.eq('status', filters.status);
    if (filters.task_type)  query = query.eq('task_type', filters.task_type);

    const { data, error } = await query.order('task_date', { ascending: false });

    if (error) throw new ApiError(500, error.message);

    return (data ?? []) as ITask[];
};

const getTaskById = async (id: string): Promise<ITask | null> => {
    if (!id) throw new ApiError(400, 'Task ID is required');

    const { data, error } = await supabase
        .from(TASK_TABLE)
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new ApiError(500, error.message);

    return data as ITask;
};

export default {
    getTasks,
    getTaskById,
};