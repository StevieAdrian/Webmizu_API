export interface ITask {
    id: string;
    task_date: string;
    customer_id: string | null;
    customer_product_id: string | null;
    expected_id: string | null;
    technician_id: string | null;
    title: string;
    description: string | null;
    status: string | null;
    created_at: string | null;
    job_id: string | null;
    task_type: string | null;
}

export interface ITaskFilters {
    customer_id?: string;
    technician_id?: string;
    job_id?: string;
    status?: string;
    task_type?: string;
}

export const TASK_TABLE = 'tasks';