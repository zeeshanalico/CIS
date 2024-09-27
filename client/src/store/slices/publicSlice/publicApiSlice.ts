import { createApi, } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import { ApiResponseSuccess, ApiResponseFailed } from '@/types/apiResponse';
import { Product, PublicProductsResponse } from '@/types/Product';
import { FormValues } from '@/pages/Inventory/AddNewInventory/AddNewInventory';
import { UpdateProductFormState } from '@/pages/Inventory/Stock/UpdateProduct';
import { Category } from '@/types/Category';
export const publicApiSlice = createApi({
    reducerPath: 'public',
    baseQuery: baseQuery({ url: '/public' }),
    tagTypes: ['PublicProduct', 'PublicCategory'],
    endpoints: (builder) => ({
        getProducts: builder.query<PublicProductsResponse, { page?: number, limit?: number, category?: number | null, search?: string | null, availableProducts?: boolean, priceRange?: number | null }>({
            query: ({ category: category_id, priceRange, page, limit, search, availableProducts }) => ({
                url: `get-public-products/?category_id=${category_id}&page=${page}&limit=${limit}&search=${search}&availableProducts=${availableProducts}&priceRange=${priceRange}`,
                method: 'GET',
            }),
            transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
            providesTags: ['PublicProduct'],
        }),

        getCategories: builder.query<ApiResponseSuccess<Category[]>, void>({
            query: () => ({
                url: '/get-public-categories',
                method: 'GET',
            }),
            transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
            providesTags: ['PublicCategory'],
        }),

        createPublicSale: builder.mutation<ApiResponseSuccess<Product>, FormValues>({
            query: (product) => ({
                url: '/create-public-sale',
                method: 'POST',
                body: product,
            })
        })
    }),
});

export const { useGetProductsQuery, useCreatePublicSaleMutation, useGetCategoriesQuery, } = publicApiSlice;
