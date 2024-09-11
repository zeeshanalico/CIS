'use client'
import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./slices/authSlice/authApiSlice";
import authSlice from "./slices/authSlice/authSlice";
import { userApiSlice } from "./slices/userSlice/userApiSlice";
import { kioskApiSlice } from "./slices/kioskSlice/kioskApiSlice";
import kioskSlice from './slices/kioskSlice/kioskSlice'
import globalSlice from "./slices/globalSlice.ts/globalSlice";
import userSlice from "./slices/userSlice/userSlice";
const reducer = {
	[authSlice.name]: authSlice.reducer,
	[authApiSlice.reducerPath]: authApiSlice.reducer,
	[userApiSlice.reducerPath]: userApiSlice.reducer,
	[kioskApiSlice.reducerPath]: kioskApiSlice.reducer,
	[kioskSlice.name]: kioskSlice.reducer,
	[globalSlice.name]: globalSlice.reducer,
	[userSlice.name]: userSlice.reducer,
};

const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApiSlice.middleware, userApiSlice.middleware, kioskApiSlice.middleware),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;  