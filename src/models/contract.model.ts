export interface IContract {
    id: string;
    customer_product_id: string;
    start_date: string;
    end_date: string;
    interval_months: number;
    total_service: number;
    services_used: number | null;
    status: string | null;
    contract_url: string | null;
    notes: string | null;
    created_at: string | null;
    price: number | null;
}

export interface IContractFilters {
    customer_product_id?: string;
    status?: string;
}

export const CONTRACTS_TABLE = 'contracts';
