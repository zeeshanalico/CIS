import { createApi, } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import { ApiResponseSuccess, ApiResponseFailed } from '@/types/apiResponse';
import { Sale } from '@/types/sale';
export interface CartProducts {
    product_id: number;
    units: number;
    unit_price: number;
}
export interface Cart {
    cartProducts: CartProducts[],
    discount: number;
    customer_id: number;
    subtotal: number;
    total: number;
}

export const saleApiSlice = createApi({
    reducerPath: 'sale',
    baseQuery: baseQuery({ url: '/sale' }),
    tagTypes: ['Sale'],
    endpoints: (builder) => ({
        // getSales: builder.query<ProductsResponse, { page?: number, limit?: number, category?: number | null, search?: string | null, availableProducts?: boolean }>({
        //     query: ({ category: category_id, page, limit, search, availableProducts }) => ({
        //         url: `/?category_id=${category_id}&page=${page}&limit=${limit}&search=${search}&availableProducts=${availableProducts}`,
        //         method: 'GET',
        //     }),
        //     transformResponse: (response: ProductsResponse) => response,
        //     transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
        //     providesTags: ['Product'],
        // }),

        createSale: builder.mutation<ApiResponseSuccess<Sale>, Cart>({
            query: (body) => ({
                url: `/create`,
                body: body,
                method: 'POST',
            }),
            // transformResponse: (response: ApiResponseSuccess<Product[]>) => response,
            transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
            invalidatesTags: ['Sale',],
        }),



    }),
});

export const { useCreateSaleMutation } = saleApiSlice;
