export interface ITechnician {
    id: string;
    name: string;
    phone: string | null;
    photo_url: string | null;
    notes: string | null;
    created_at: string | null;
}

export interface ITechnicianFilters {
    name?: string;
    phone?: string;
}

export const TECHNICIAN_TABLE = 'technicians';