import { createApi, } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import { ApiResponseSuccess, ApiResponseFailed } from '@/types/apiResponse';
import { Product } from '@/types/Product';
import { FormValues } from '@/pages/Inventory/AddNewInventory/AddNewInventory';

export const productApiSlice = createApi({
    reducerPath: 'product',
    baseQuery: baseQuery({ url: '/product' }),
    tagTypes: ['Product'],
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
        createProduct: builder.mutation<ApiResponseSuccess<Product>, FormValues>({
            query: (body) => ({
                url: `/create`,
                body: body,
                method: 'POST',
            }),
            invalidatesTags: ['Product',],
        }),
    }),
});

export const { useGetProductsMutation, useGetCategoriesQuery,useCreateProductMutation } = productApiSlice;
