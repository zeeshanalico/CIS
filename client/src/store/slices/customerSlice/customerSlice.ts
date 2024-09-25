import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import { ApiResponseSuccess, ApiResponseFailed } from '@/types/apiResponse';
import { Customer, CustomerResponse } from '@/types/Customer';
// import { FormValues } from '@/pages/Customer/CreateCustomer';


export const CustomerApiSlice = createApi({
    reducerPath: 'customer',
    tagTypes: ['Customer'],
    baseQuery: baseQuery({ url: '/customer' }),
    endpoints: (builder) => ({
        // createCustomer: builder.mutation<ApiResponseSuccess<Customer>, FormValues>({
        //     query: (body) => ({
        //         url: '/create',
        //         method: 'POST',
        //         body,
        //     }),
        //     transformResponse: (response: ApiResponseSuccess<Customer>) => response,
        //     transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
        //     invalidatesTags: ['Customer']
        // }),
        getAllCustomers: builder.query<CustomerResponse, { limit?: number, page?: number, }>({
            query: ({ limit, page }) => ({
                url: `/get-all?limit=${limit}&page=${page}`,
                method: 'GET',
            }),
            providesTags: ['Customer'],
            transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
        }),

        // updateCustomer: builder.mutation<ApiResponseSuccess<Customer>, { id: number, name: string, email: string }>({
        //     query: ({ id, ...body }) => ({
        //         url: `/update/${id}`,
        //         method: 'PUT',
        //         body: body,
        //     }),
        //     invalidatesTags: ['Customer'],
        // }),
        // deleteCustomer: builder.mutation<ApiResponseSuccess<Customer>, { id: number, deleteType: string }>({
        //     query: ({ id, deleteType }) => ({
        //         url: `/${id}?deleteType=${deleteType}`,
        //         method: 'DELETE',
        //     }),
        //     invalidatesTags: ['Customer'],
        // })
    }),
});

export const { useGetAllCustomersQuery } = CustomerApiSlice;
