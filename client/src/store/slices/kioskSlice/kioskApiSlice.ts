import { createApi, } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import {  FailedResponse } from '@/types/apiResponse';
import { KiosksResponse, Kiosk } from '@/types/kiosk';
import { KioskFormValues } from '@/components/form/CreateKiosk';
export const kioskApiSlice = createApi({
    reducerPath: 'kiosk',
    baseQuery: baseQuery({ url: '/kiosk' }),
    tagTypes: ['Kiosk'],
    endpoints: (builder) => ({
        getKiosks: builder.query<KiosksResponse, void>({
            providesTags: ['Kiosk'],
            query: () => ({
                url: '/',
                method: 'GET',
            }),
            transformResponse: (response: KiosksResponse) => response,
            transformErrorResponse: (response: FailedResponse) => response.data,
        }),

        createKiosk: builder.mutation<KiosksResponse, KioskFormValues>({
            query: (body) => ({
                url: `/create`,
                body: body,
                method: 'POST',
            }),
            invalidatesTags: ['Kiosk'],
        }),
    }),
});

export const { useCreateKioskMutation, useGetKiosksQuery } = kioskApiSlice;
