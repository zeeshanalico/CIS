import { ExtraInfo } from "./apiResponse";
import { ApiResponseSuccess } from "./apiResponse";
export interface Customer {
    id:number;
    name: string;
    // secret?: string;
    email: string;
    phone?: string | null;
    // is_active?: boolean | null;
    // is_deleted?: boolean | null;
    created_at?: Date | string | null;
    updated_at?: Date | string | null;
    // deleted_at?: Date | string | null;
}

export interface CustomerResponse extends ApiResponseSuccess<Customer[]> {
    extraInfo: ExtraInfo
}

