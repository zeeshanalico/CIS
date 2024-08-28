'use client'
import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./slices/authSlice/authApiSlice";
import authSlice from "./slices/authSlice/authSlice";

const reducer = {
    [authSlice.name]: authSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
};

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApiSlice.middleware),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;  