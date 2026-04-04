import ApiError from '../utils/ApiError';
import { IContract, IContractFilters, CONTRACTS_TABLE } from '../models';
import supabase from '../lib/supabase';

const getContracts = async (filters: IContractFilters = {}): Promise<IContract[]> => {
    let query = supabase.from(CONTRACTS_TABLE).select('*');

    if (filters.customer_product_id) query = query.eq('customer_product_id', filters.customer_product_id);
    if (filters.status) query = query.eq('status', filters.status);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw new ApiError(500, error.message);

    return (data ?? []) as IContract[];
};

const getContractById = async (id: string): Promise<IContract | null> => {
    if (!id) throw new ApiError(400, 'Contract ID is required');

    const { data, error } = await supabase
        .from(CONTRACTS_TABLE)
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new ApiError(500, error.message);

    return data as IContract;
};

export default {
    getContracts,
    getContractById,
};
