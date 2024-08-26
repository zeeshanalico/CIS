import { fetchBaseQuery } from "@reduxjs/toolkit/query";
export const baseQuery = ({ url }: { url: string }) => {
    return fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_SERVER_URL || 'http://localhost:3001'}${url}`,
        // prepareHeaders: (headers, { getState }) => {
            // const token = Cookies.get('access_token') || '';
            // if (token) {
            //   headers.set('Authorization', `Bearer ${token}`);
            // }
            // return headers;
        // },
    });
} 