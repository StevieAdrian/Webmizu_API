import ApiError from '../utils/ApiError';
import { IServiceLog, IServiceLogFilters, SERVICE_LOG_TABLE } from '../models';
import supabase from '../lib/supabase';

const getServiceLogs = async (filters: IServiceLogFilters = {}): Promise<IServiceLog[]> => {
    let query = supabase.from(SERVICE_LOG_TABLE).select('*');

    if (filters.expected_id) query = query.eq('expected_id', filters.expected_id);
    if (filters.customer_product_id) query = query.eq('customer_product_id', filters.customer_product_id);
    if (filters.technician_id) query = query.eq('technician_id', filters.technician_id);
    if (filters.service_type) query = query.eq('service_type', filters.service_type);
    if (filters.job_id) query = query.eq('job_id', filters.job_id);
    if (filters.task_id) query = query.eq('task_id', filters.task_id);

    const { data, error } = await query.order('service_date', { ascending: false });

    if (error) throw new ApiError(500, error.message);

    return (data ?? []) as IServiceLog[];
};

const getServiceLogById = async (id: string): Promise<IServiceLog | null> => {
    if (!id) throw new ApiError(400, 'Service log ID is required');

    const { data, error } = await supabase
        .from(SERVICE_LOG_TABLE)
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new ApiError(500, error.message);

    return data as IServiceLog;
};

export default {
    getServiceLogs,
    getServiceLogById,
};