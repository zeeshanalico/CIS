import { ApiResponseSuccess, ExtraInfo } from "./apiResponse";
import { User } from './User'
export class Kiosk {
    id: number;
    name: string;
    location: string | null;
    registered_by: number | null;
    is_deleted: boolean;
    created_at: string;  // You might use Date for more sophisticated handling
    updated_at: string;  // You might use Date for more sophisticated handling
    deleted_at: string | null;
    user: User[]
    internal_user: User
    constructor(
        id: number,
        name: string,
        location: string | null,
        registered_by: number | null,
        is_deleted: boolean,
        created_at: string,
        updated_at: string,
        deleted_at: string | null,
        user: User[],
        internal_user: User

    ) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.registered_by = registered_by;
        this.is_deleted = is_deleted;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
        this.user = user;
        this.internal_user = internal_user;
    }
}
export interface KiosksResponse extends ApiResponseSuccess<Kiosk[]> {
    extraInfo: ExtraInfo
}

