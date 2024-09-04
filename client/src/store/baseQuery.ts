import { BaseQueryFn, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta, } from '@reduxjs/toolkit/query/react';
import { setCredentials, clearCredentials } from './slices/authSlice/authSlice';
import { RootState } from './store';
import { colors } from '@/utils/consoleColors';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const createBaseUrl = (url: string): string => {
  return `${BASE_URL || 'http://localhost:3001'}${url}`;
};

const logRequest = (args: Parameters<ReturnType<typeof fetchBaseQuery>>[0]) => {
  console.log(`${colors.fg.green}Request:${colors.reset}`, args);
};

const logResponse = (result: { data?: any; error?: FetchBaseQueryError; meta?: FetchBaseQueryMeta }) => {
  console.log(`${colors.fg.green}Response:${colors.reset}`, result);
};
const setAuthorizationHeader = (headers: Headers | string[][] | Record<string, string | undefined>, token: string) => {
  if (headers instanceof Headers) {
    headers.set('Authorization', `Bearer ${token}`);
  } else if (Array.isArray(headers)) {
    headers.push(['Authorization', `Bearer ${token}`]);
  } else {
    headers['Authorization'] = `Bearer ${token}`;
  }
};

const handleTokenRefresh = async (
  api: any,
  baseQueryInstance: ReturnType<typeof fetchBaseQuery>,
  args: Parameters<typeof baseQueryInstance>[0],
  extraOptions: any
): Promise<{ data?: any; error?: FetchBaseQueryError; meta?: FetchBaseQueryMeta }> => {
  console.log('Received 401 Unauthorized. Attempting to refresh token...');

  const refreshResult = await baseQueryInstance({ url: '/refresh-token', method: 'POST' }, api, extraOptions);

  if (refreshResult.data) {
    const newAccessToken = (refreshResult.data as { accessToken: string }).accessToken;
    
    api.dispatch(setCredentials({ accessToken: newAccessToken }));
   

    if (typeof args === 'object' && args.headers) {
      setAuthorizationHeader(args.headers, newAccessToken);
    }

    const result = await baseQueryInstance(args, api, extraOptions);
    logResponse(result);
    return result;
  } else {
    api.dispatch(clearCredentials());
    return refreshResult;  // Return the original refresh result, even if it's an error
  }
};

export const baseQuery = ({ url }: { url: string }) => {
  const baseUrl = createBaseUrl(url);

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

  const baseQueryWithRefresh: BaseQueryFn<Parameters<typeof baseQueryInstance>[0], unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    logRequest(args);
    let result = await baseQueryInstance(args, api, extraOptions);
    logResponse(result);

    if (result.error && result.error.status === 401) {
      result = await handleTokenRefresh(api, baseQueryInstance, args, extraOptions);
    }

    return result;
  };

  return baseQueryWithRefresh;
};
