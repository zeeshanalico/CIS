import { createApi, } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import { UserPayload } from '@/types/UserPayload';
import { ApiResponseSuccess, ApiResponseFailed } from '@/types/apiResponse';
import { FormValues } from '@/pages/Login/Login';
export type LoginResult = { accessToken: string; user: UserPayload };

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery({ url: '/auth' }),
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponseSuccess<LoginResult>, FormValues>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: ApiResponseSuccess<LoginResult>) => response,
      transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
    }),
    refreshToken: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: '/refresh-token',
        method: 'POST',
      }),
    }),
    logout: builder.mutation<ApiResponseSuccess<null>, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation, useLogoutMutation } = authApiSlice;
