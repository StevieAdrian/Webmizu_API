export interface ICustomerProduct {
    id: string;
    customer_id: string;
    product_catalog_id: string;
    order_product_id: string | null;
    installation_technician_id: string | null;
    installation_location: string | null;
    installation_date: string;
    photo_url: string | null;
    notes: string | null;
    status: string | null;
    created_at: string | null;
    quantity_owned: number;
    description: string | null;
    cust_product_price: number | null;
    installation_address_id: string | null;
}

export interface ICustomerProductFilters {
    customer_id?: string;
    product_catalog_id?: string;
    installation_technician_id?: string;
    status?: string;
}

export const CUSTOMER_PRODUCT_TABLE = 'customer_products';