export interface IServiceLog {
    id: string;
    expected_id: string | null;
    customer_product_id: string;
    technician_id: string;
    service_date: string;
    service_type: string | null;
    pekerjaan: string;
    harga_service: number | null;
    teknisi_fee: number | null;
    job_evidence: unknown;
    notes: string | null;
    created_at: string | null;
    job_id: string | null;
    task_id: string | null;
}

export interface IServiceLogFilters {
    expected_id?: string;
    customer_product_id?: string;
    technician_id?: string;
    service_type?: string;
    job_id?: string;
    task_id?: string;
}

export const SERVICE_LOG_TABLE = 'service_log';