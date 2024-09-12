import { ApiResponseSuccess } from "./apiResponse";
import { ExtraInfo } from "./apiResponse";
export interface Vendor {
    name: string;
    contact_info?: string | null;
    is_deleted?: boolean;
    created_at?: string;
    updated_at?: string
    deleted_at?: string | null;
}

export interface VendorResponse extends ApiResponseSuccess<Vendor[]> {
    extraInfo: ExtraInfo
}

