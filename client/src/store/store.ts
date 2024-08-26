'use client'
import { configureStore } from "@reduxjs/toolkit";

const reducer = {
    // auth: authSlice.reducer,
    // urls: urlSlice,
    // [urlApiSlice.reducerPath]: urlApiSlice.reducer,
};

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;  