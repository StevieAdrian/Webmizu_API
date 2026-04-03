import ApiError from '../utils/ApiError';
import { ITechnician, ITechnicianFilters, TECHNICIAN_TABLE } from '../models';
import supabase from '../lib/supabase';

const getTechnicians = async (filters: ITechnicianFilters = {}): Promise<ITechnician[]> => {
    let query = supabase.from(TECHNICIAN_TABLE).select('*');

    if (filters.name) query = query.ilike('name', `%${filters.name}%`);
    if (filters.phone) query = query.ilike('phone', `%${filters.phone}%`);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw new ApiError(500, error.message);

    return (data ?? []) as ITechnician[];
};

const getTechnicianById = async (id: string): Promise<ITechnician | null> => {
    if (!id) throw new ApiError(400, 'Technician ID is required');

    const { data, error } = await supabase
        .from(TECHNICIAN_TABLE)
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new ApiError(500, error.message);

    return data as ITechnician;
};

export default {
    getTechnicians,
    getTechnicianById,
};