import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import { ApiResponseSuccess, ApiResponseFailed } from '@/types/apiResponse';
import { User } from '@/types/User';
import { FormValues } from '@/components/form/CreateUser';
export const userApiSlice = createApi({
    reducerPath: 'user',
    tagTypes: ['User'],
    baseQuery: baseQuery({ url: '/user' }),
    endpoints: (builder) => ({
        createUser: builder.mutation<ApiResponseSuccess<User>, FormValues>({
            query: (body) => ({
                url: '/create',
                method: 'POST',
                body,
            }),
            transformResponse: (response: ApiResponseSuccess<User>) => response,
            transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
            invalidatesTags: ['User']
        }),
        getAllUsers: builder.query<ApiResponseSuccess<User[]>, void>({
            query: () => ({
                url: '/get-all',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
    }),
});

export const { useCreateUserMutation, useGetAllUsersQuery } = userApiSlice;
