import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import { ApiResponseSuccess, ApiResponseFailed } from '@/types/apiResponse';
import { Vendor } from '@/types/Vendor';
import { FormValues } from '@/pages/Vendor/AddVendor/AddVendor';
import { VendorResponse } from '@/types/Vendor';

export const vendorApiSlice = createApi({
    reducerPath: 'vendor',
    tagTypes: ['Vendor'],
    baseQuery: baseQuery({ url: '/vendor' }),
    endpoints: (builder) => ({
        createVendor: builder.mutation<ApiResponseSuccess<Vendor>, FormValues>({
            query: (body) => ({
                url: '/create',
                method: 'POST',
                body,
            }),
            transformResponse: (response: ApiResponseSuccess<Vendor>) => response,
            transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
            invalidatesTags: ['Vendor']
        }),
        getAllVendors: builder.query<VendorResponse, { limit?: number, page?: number, search?: string }>({
            query: ({ limit, page, search }) => ({
                url: `/get-all?limit=${limit}&page=${page}&search=${search}`,
                method: 'GET',
            }),
            providesTags: ['Vendor'],
        }),

        deleteVendor: builder.mutation<ApiResponseSuccess<Vendor>, { id: number, deleteType: string }>({
            query: ({ id, deleteType }) => ({
                url: `/${id}?deleteType=${deleteType}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Vendor'],
        })
    }),
});

export const { useCreateVendorMutation, useGetAllVendorsQuery, useDeleteVendorMutation } = vendorApiSlice;
