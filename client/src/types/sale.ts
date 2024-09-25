export type Sale = {
    sub_total: number | string
    discount?: number | string
    total: number | string
    qty: number
    sale_date?: Date | string
    is_dummy?: boolean | null
    is_deleted?: boolean | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    // customer?: CustomerCreateNestedOneWithoutSaleInput
    // kiosk?: KioskCreateNestedOneWithoutSaleInput
    // sale_product?: Sale_productCreateNestedManyWithoutSaleInput
}
