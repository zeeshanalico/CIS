// src/features/auth/authApiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '@/store/baseQuery';

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery({ url: '/auth' }),
  endpoints: (builder) => ({
    login: builder.mutation<{ accessToken: string; user: any }, { email: string; password: string; remember: boolean }>({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
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
