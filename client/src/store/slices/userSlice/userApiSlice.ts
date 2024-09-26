import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import { ApiResponseSuccess, ApiResponseFailed } from '@/types/apiResponse';
import { User } from '@/types/User';
import { UserResponse } from '../../../types/User';
import { FormValues } from '@/pages/User/CreateUser';


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
        getAllUsers: builder.query<UserResponse, { available?: boolean, limit?: number, page?: number, search?: string }>({
            query: ({ available, limit, page, search }) => ({
                url: `/get-all?available=${available}&limit=${limit}&page=${page}&search=${search}`,
                method: 'GET',
            }),
            providesTags: ['User'],
        }),

        updateKioskUsers: builder.mutation<ApiResponseSuccess<User[]>, { id: number; users: { user_id: number, name: string }[] }>({
            query: ({ users, id }) => ({
                url: `/update-kiosk-users/${id}`,
                method: 'POST',
                body: { users },
            }),
            invalidatesTags: ['User'],
        }),
        updateUser: builder.mutation<ApiResponseSuccess<User>, { id: number, name: string, email: string, resetPassword: string }>({
            query: ({ id, ...body }) => ({
                url: `/update/${id}`,
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ['User'],
        }),
        deleteUser: builder.mutation<ApiResponseSuccess<User>, { id: number, deleteType: string }>({
            query: ({ id, deleteType }) => ({
                url: `/${id}?deleteType=${deleteType}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'],
        })
    }),
});

export const { useCreateUserMutation,useDeleteUserMutation, useUpdateUserMutation, useUpdateKioskUsersMutation, useGetAllUsersQuery } = userApiSlice;
