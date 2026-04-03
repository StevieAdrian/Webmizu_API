import ApiError from '../utils/ApiError';
import { IProductCatalog, IProductCatalogFilters, PRODUCT_CATALOG_TABLE } from '../models';
import supabase from '../lib/supabase';

const getProductCatalogs = async (filters: IProductCatalogFilters = {}): Promise<IProductCatalog[]> => {
    let query = supabase.from(PRODUCT_CATALOG_TABLE).select('*');

    if (filters.category_id) query = query.eq('category_id', filters.category_id);
    if (filters.name) query = query.ilike('name', `%${filters.name}%`);
    if (filters.model) query = query.ilike('model', `%${filters.model}%`);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw new ApiError(500, error.message);

    return (data ?? []) as IProductCatalog[];
};

const getProductCatalogById = async (id: string): Promise<IProductCatalog | null> => {
    if (!id) throw new ApiError(400, 'Product catalog ID is required');

    const { data, error } = await supabase
        .from(PRODUCT_CATALOG_TABLE)
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw new ApiError(500, error.message);

    return data as IProductCatalog;
};

export default {
    getProductCatalogs,
    getProductCatalogById,
};