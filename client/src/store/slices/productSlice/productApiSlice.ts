import { createApi, } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';
import { UserPayload } from '@/types/UserPayload';
import { ApiResponseSuccess, ApiResponseFailed } from '@/types/apiResponse';

export type LoginResult = { accessToken: string; user: UserPayload };

export const authApiSlice = createApi({
  reducerPath: 'product',
  baseQuery: baseQuery({ url: '/product' }),
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponseSuccess<LoginResult>, { email: string; password: string; remember: boolean }>({
      query: (credentials) => ({
        url: '/',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: ApiResponseSuccess<LoginResult>) => response,
      transformErrorResponse: (response: { status: number; data: ApiResponseFailed }) => response.data,
    }),
    refreshToken: builder.mutation<{ accessToken: string; user: any }, void>({
      query: () => ({
        url: '/refresh-token',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authApiSlice;
