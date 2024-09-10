import { Role } from "./Roles";
import { ApiResponseSuccess } from "./apiResponse";
export class User {
    id: number;
    kiosk_id?: number;
    name: string;
    email: string;
    role: Role;
    is_active?: boolean;
    is_deleted?: boolean;
    updated_at?: string;
    created_at?: string;
    deleted_at?: string | null;

    constructor(
        id: number,
        name: string,
        email: string,
        role: Role,
        kiosk_id?: number,
        is_active?: boolean,
        is_deleted?: boolean,
        created_at?: string,
        updated_at?: string,
        deleted_at?: string | null
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.kiosk_id = kiosk_id;
        this.is_active = is_active;
        this.is_deleted = is_deleted;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
    }
}

export type UsersResponse = ApiResponseSuccess<{
    users: User[];
}>;



export interface SelectUser{
    label:string;
    value:number;
}

