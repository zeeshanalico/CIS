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
        getProducts: builder.query<ApiResponseSuccess<Product[]>, { page?: number, limit: number, category?: number | null }>({
            query: ({ category: category_id, page, limit }) => ({
                url: `/?category_id=${category_id}&page=${page}&limit=${limit}`,
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
        createInventory: builder.mutation<ApiResponseSuccess<Product>, FormValues>({
            query: (body) => ({
                url: `/create`,
                body: body,
                method: 'POST',
            }),
            invalidatesTags: ['Product',],
        }),
    }),
});

export const { useGetProductsQuery, useGetCategoriesQuery, useCreateInventoryMutation } = productApiSlice;
