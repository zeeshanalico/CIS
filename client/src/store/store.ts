'use client'
import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./slices/authSlice/authApiSlice";
import authSlice from "./slices/authSlice/authSlice";
import { userApiSlice } from "./slices/userSlice/userApiSlice";
const reducer = {
	[authSlice.name]: authSlice.reducer,
	[authApiSlice.reducerPath]: authApiSlice.reducer,
	[userApiSlice.reducerPath]: userApiSlice.reducer,

};


const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApiSlice.middleware, userApiSlice.middleware),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;  