import { BaseQueryFn, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { setCredentials, clearCredentials } from './slices/authSlice/authSlice';
import { RootState } from './store';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const baseQuery = ({ url }: { url: string }) => {
  const baseUrl = `${BASE_URL || 'http://localhost:3001'}${url}`;

  const baseQueryInstance = fetchBaseQuery({
    baseUrl,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  // Main query function
  const baseQueryWithRefresh: BaseQueryFn<
    Parameters<typeof baseQueryInstance>[0],
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    let result = await baseQueryInstance(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      // The refresh process is handled by the server
      // Assuming the server will automatically issue a new token and update the cookie
      result = await baseQueryInstance(args, api, extraOptions);
      if (result.error && result.error.status === 401) {
        api.dispatch(clearCredentials());
      }
    }

    return result;
  };

  return baseQueryWithRefresh;
};
