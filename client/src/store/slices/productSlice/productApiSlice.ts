import { createApi, } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import { ApiResponseSuccess, ApiResponseFailed } from '@/types/apiResponse';
import { Product } from '@/types/Product';

export const authApiSlice = createApi({
    reducerPath: 'product',
    baseQuery: baseQuery({ url: '/product' }),
    endpoints: (builder) => ({
        getProducts: builder.mutation<ApiResponseSuccess<Product[]>, void>({
            query: () => ({
                url: '/',
                method: 'GET',
            }),
            transformResponse: (response: ApiResponseSuccess<Product[]>) => response,
            transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
        }),
        getProductById: builder.mutation<Product, number>({
            query: (id: number) => ({
                url: `/:${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetProductByIdMutation, useGetProductsMutation } = authApiSlice;
