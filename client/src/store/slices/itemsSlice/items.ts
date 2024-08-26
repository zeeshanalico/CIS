import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../../baseQuery";


export const itemsApiSlice = createApi({
    reducerPath: 'itemsApiSlice',
    baseQuery: baseQuery({ url: '/admin/items' }),
    tagTypes: ['items'],
    endpoints: (builder) => ({
        getItems: builder.query<any, void>({
            query: () => '/',
            transformResponse: (response: any) => response.data,
            providesTags: ['items'],
        }),

        addItems: builder.mutation<any, { files: File[] }>({
            query: ({ files }) => {
                const formData = new FormData();
                console.log(files);

                files.forEach((file) => formData.append('files', file));
                return {
                    url: '/create',
                    method: 'POST',
                    body: formData,
                };
            },
            transformResponse: (response: any) => {
                console.log(response);
                return response.data;
            },
            invalidatesTags: ['items'],
        }),
    })
})

export const { } = itemsApiSlice;

