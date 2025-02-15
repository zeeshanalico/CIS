import { createApi, } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import { FailedResponse } from '@/types/apiResponse';
import { KiosksResponse, } from '@/types/kiosk';
import { KioskFormValues } from '@/pages/Kiosk/CreateKiosk';
export const kioskApiSlice = createApi({
    reducerPath: 'kiosk',
    baseQuery: baseQuery({ url: '/kiosk' }),
    tagTypes: ['Kiosk', 'User'],
    endpoints: (builder) => ({
        getKiosks: builder.query<KiosksResponse, { limit?: number, page?: number, search?: string }>({
            query: ({ limit, page, search }) => ({
                url: `/get-all?limit=${limit}&page=${page}&search=${search}`,
                method: 'GET',
            }),
            transformResponse: (response: KiosksResponse) => response,
            transformErrorResponse: (response: FailedResponse) => response.data,
            providesTags: ['Kiosk'],
        }),
        getKioskById: builder.query<KiosksResponse, { id: number }>({
            query: ({ id }) => ({
                url: `/${id}`,
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
            transformErrorResponse: (response: FailedResponse) => response.data,
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

export const { useCreateKioskMutation,useGetKioskByIdQuery, useGetKiosksQuery, useDeleteKioskMutation } = kioskApiSlice;
