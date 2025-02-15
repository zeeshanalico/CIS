import { createApi, } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import { ApiResponseSuccess, ApiResponseFailed } from '@/types/apiResponse';
import { Product, ProductsResponse } from '@/types/Product';
import { FormValues } from '@/pages/Inventory/AddNewInventory/AddNewInventory';
import { UpdateProductFormState } from '@/pages/Inventory/Stock/UpdateProduct';
export const productApiSlice = createApi({
    reducerPath: 'product',
    baseQuery: baseQuery({ url: '/product' }),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<ProductsResponse, { page?: number, limit?: number, category?: number | null, search?: string | null, availableProducts?: boolean }>({
            query: ({ category: category_id, page, limit, search, availableProducts }) => ({
                url: `/?category_id=${category_id}&page=${page}&limit=${limit}&search=${search}&availableProducts=${availableProducts}`,
                method: 'GET',
            }),
            transformResponse: (response: ProductsResponse) => response,
            transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
            providesTags: ['Product'],
        }),

        getCategories: builder.query<ApiResponseSuccess<Product[]>, void>({
            query: () => ({
                url: '/categories',
                method: 'GET',
            }),
            transformResponse: (response: ApiResponseSuccess<Product[]>) => response,
            transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
        }),
        createInventory: builder.mutation<ApiResponseSuccess<Product>, FormData>({
            query: (body) => {
                console.log(body);
                
                return {
                url: `/create`,
                body: body,
                method: 'POST',
            }},
            transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
            invalidatesTags: ['Product',],
        }),

        updateProduct: builder.mutation<ApiResponseSuccess<Product>, UpdateProductFormState>({
            query: ({ id, ...body }) => ({
                url: `/update/${id}`,
                body: body,
                method: 'PUT',
            }),
            transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
            invalidatesTags: ['Product'],
        }),


    }),
});

export const { useGetProductsQuery, useUpdateProductMutation, useGetCategoriesQuery, useCreateInventoryMutation } = productApiSlice;
