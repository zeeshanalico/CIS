import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import { ApiResponseSuccess, ApiResponseFailed } from '@/types/apiResponse';
import { Vendor } from '@/types/Vendor';
import { AddVendorPurchaseFormState } from '@/pages/Inventory/AddVendorPurchase/AddVendorPurchase';
export const vendorPurchaseApiSlice = createApi({
    reducerPath: 'vendorPurchase',
    tagTypes: ['VendorPurchase'],
    baseQuery: baseQuery({ url: '/vendor-purchase' }),
    endpoints: (builder) => ({
        addVendorPurchase: builder.mutation<ApiResponseSuccess<Vendor>, AddVendorPurchaseFormState>({
            query: (body) => ({
                url: '/create',
                method: 'POST',
                body,
            }),
            transformResponse: (response: ApiResponseSuccess<Vendor>) => response,
            transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
            invalidatesTags: ['VendorPurchase']
        }),
    }),
});

export const { useAddVendorPurchaseMutation } = vendorPurchaseApiSlice;
export default vendorPurchaseApiSlice;