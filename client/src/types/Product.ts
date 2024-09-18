import { ApiResponseFailed, ApiResponseSuccess } from "./apiResponse";
import { ExtraInfo } from "./apiResponse";
export class Product {
    id: number;
    category_id: number;
    name: string;
    sale_price: string;
    quantity: number;
    image_url: string | null;
    kiosk_id: number;
    is_dummy: boolean;
    is_deleted: boolean;
    created_at: string;  // You might use Date for more sophisticated handling
    updated_at: string;  // You might use Date for more sophisticated handling
    deleted_at: string | null;
    category?: { id: number, name: string };

    constructor(
        id: number,
        category_id: number,
        name: string,
        sale_price: string,
        quantity: number,
        image_url: string | null,
        kiosk_id: number,
        is_dummy: boolean,
        is_deleted: boolean,
        created_at: string,
        updated_at: string,
        deleted_at: string | null,
        category: { id: number, name: string }
    ) {
        this.id = id;
        this.category_id = category_id;
        this.name = name;
        this.sale_price = sale_price;
        this.quantity = quantity;
        this.image_url = image_url;
        this.kiosk_id = kiosk_id;
        this.is_dummy = is_dummy;
        this.is_deleted = is_deleted;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.deleted_at = deleted_at;
        this.category = category
    }
}


export interface ProductsResponse extends ApiResponseSuccess<Product[]> {
    extraInfo: ExtraInfo
}
