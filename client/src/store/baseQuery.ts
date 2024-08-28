import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, clearCredentials } from './slices/authSlice/authSlice';
import { RootState } from './store';

export const baseQuery = ({ url }: { url: string }) => {
  const baseUrl = `${import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'}${url}`;

  const baseQueryInstance = fetchBaseQuery({
    baseUrl,
    credentials: 'include', // Ensures cookies are included in requests
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  // Main query function
  const baseQueryWithRefresh = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQueryInstance(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      // The refresh process is handled by the server
      // Assuming the server will automatically issue a new token and update the cookie
      result = await baseQueryInstance(args, api, extraOptions);
      if (result.error && result.error.status === 401) {
        api.dispatch(clearCredentials()); // Clear credentials if refresh fails
      }
    }

    return result;
  };

  return baseQueryWithRefresh;
};
