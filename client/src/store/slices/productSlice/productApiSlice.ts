import { createApi, } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import { ApiResponseSuccess, ApiResponseFailed } from '@/types/apiResponse';
import { Product } from '@/types/Product';

export const productApiSlice = createApi({
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
        
        getCategories: builder.query<ApiResponseSuccess<Product[]>, void>({
            query: () => ({
                url: '/categories',
                method: 'GET',
            }),
            transformResponse: (response: ApiResponseSuccess<Product[]>) => response,
            transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
        }),
    }),
});

export const {  useGetProductsMutation ,useGetCategoriesQuery} = productApiSlice;
