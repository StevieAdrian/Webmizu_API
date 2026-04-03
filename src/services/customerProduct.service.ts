import ApiError from '../utils/ApiError';
import { ICustomerProduct, ICustomerProductFilters, CUSTOMER_PRODUCT_TABLE } from '../models';
import supabase from '../lib/supabase';

const getCustomerProducts = async (filters: ICustomerProductFilters = {}): Promise<ICustomerProduct[]> => {
    let query = supabase.from(CUSTOMER_PRODUCT_TABLE).select('*');

    if (filters.customer_id) query = query.eq('customer_id', filters.customer_id);
    if (filters.product_catalog_id) query = query.eq('product_catalog_id', filters.product_catalog_id);
    if (filters.installation_technician_id) query = query.eq('installation_technician_id', filters.installation_technician_id);
    if (filters.status) query = query.eq('status', filters.status);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw new ApiError(500, error.message);

    return (data ?? []) as ICustomerProduct[];
};

const getCustomerProductById = async (id: string): Promise<ICustomerProduct | null> => {
    if (!id) throw new ApiError(400, 'Customer product ID is required');

    const { data, error } = await supabase
        .from(CUSTOMER_PRODUCT_TABLE)
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new ApiError(500, error.message);

    return data as ICustomerProduct;
};

export default {
    getCustomerProducts,
    getCustomerProductById,
};