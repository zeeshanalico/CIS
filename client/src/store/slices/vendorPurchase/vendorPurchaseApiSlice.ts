import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import { ApiResponseSuccess, ApiResponseFailed } from '@/types/apiResponse';
import { Vendor } from '@/types/Vendor';
import { FormValues } from '@/pages/Vendor/AddVendor/AddVendor';

export const vendorApiSlice = createApi({
    reducerPath: 'vendorPurchase',
    tagTypes: ['VendorPurchase'],
    baseQuery: baseQuery({ url: '/vendor-purchase' }),
    endpoints: (builder) => ({
        addVendorPurchase: builder.mutation<ApiResponseSuccess<Vendor>, FormValues>({
            query: (body) => ({
                url: '/add',
                method: 'POST',
                body,
            }),
            transformResponse: (response: ApiResponseSuccess<Vendor>) => response,
            transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
            invalidatesTags: ['VendorPurchase']
        }),
    }),
});

export const { useAddVendorPurchaseMutation} = vendorApiSlice;
