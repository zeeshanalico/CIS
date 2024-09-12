export interface Category {
    id: number;
    name: string;
    is_deleted: boolean | null;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: Date | null;
}