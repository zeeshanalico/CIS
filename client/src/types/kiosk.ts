import { ApiResponseFailed, ApiResponseSuccess } from "./apiResponse";

export class Kiosk {
    id: number;
    name: string;
    location: string | null;
    registered_by: number | null;
    is_deleted: boolean;
    created_at: string;  // You might use Date for more sophisticated handling
    updated_at: string;  // You might use Date for more sophisticated handling
    deleted_at: string | null;
    constructor(
        id: number,
        name: string,
        location: string | null,
        registered_by: number | null,
        is_deleted: boolean,
        created_at: string,
        updated_at: string,
        deleted_at: string | null,
    ) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.registered_by = registered_by;
        this.is_deleted = is_deleted;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
}

export type KiosksResponse = ApiResponseSuccess<{
    kiosks: Kiosk[];
}>;
