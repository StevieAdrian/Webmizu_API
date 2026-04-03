export interface IProductCatalog {
    id: string;
    category_id: string | null;
    name: string;
    model: string;
    description: string | null;
    price: number;
    created_at: string | null;
    image_url: string | null;
}

export interface IProductCatalogFilters {
    category_id?: string;
    name?: string;
    model?: string;
}

export const PRODUCT_CATALOG_TABLE = 'product_catalog';