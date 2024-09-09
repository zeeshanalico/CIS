import { createApi, } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import { FailedResponse } from '@/types/apiResponse';
import { KiosksResponse, } from '@/types/kiosk';
import { KioskFormValues } from '@/components/form/CreateKiosk';
export const kioskApiSlice = createApi({
    reducerPath: 'kiosk',
    baseQuery: baseQuery({ url: '/kiosk' }),
    tagTypes: ['Kiosk', 'User'],
    endpoints: (builder) => ({
        getKiosks: builder.query<KiosksResponse, { limit?: number, page?: number, search?: string }>({
            query: ({ limit, page, search }) => ({
                url: `/get-all${limit ? `?limit=${limit}` : ''}${page ? `?page=${page}` : ''}${search ? `?search=${search}` : ''}`,
                method: 'GET',
            }),
            transformResponse: (response: KiosksResponse) => response,
            transformErrorResponse: (response: FailedResponse) => response.data,
            providesTags: ['Kiosk'],
        }),

        createKiosk: builder.mutation<KiosksResponse, KioskFormValues>({
            query: (body) => ({
                url: `/create`,
                body: body,
                method: 'POST',
            }),
            invalidatesTags: ['User', 'Kiosk'],
        }),
        deleteKiosk: builder.mutation<KiosksResponse, { deleteType: 'soft' | 'hard'; id: number }>({
            query: ({ deleteType = undefined, id }) => ({
                url: `/delete/${id}?deleteType=${deleteType}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Kiosk'],
        }),
    }),
});

export const { useCreateKioskMutation, useGetKiosksQuery ,useDeleteKioskMutation} = kioskApiSlice;
