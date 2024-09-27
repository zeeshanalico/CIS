'use client'
import { configureStore } from "@reduxjs/toolkit";
import { authApiSlice } from "./slices/authSlice/authApiSlice";
import authSlice from "./slices/authSlice/authSlice";
import { userApiSlice } from "./slices/userSlice/userApiSlice";
import { kioskApiSlice } from "./slices/kioskSlice/kioskApiSlice";
import kioskSlice from './slices/kioskSlice/kioskSlice'
import globalSlice from "./slices/globalSlice.ts/globalSlice";
import userSlice from "./slices/userSlice/userSlice";
import customerSlice from "./slices/customerSlice/customerSlice";
import { vendorApiSlice } from "./slices/vendorSlice/vendorApiSlice";
import { productApiSlice } from "./slices/productSlice/productApiSlice";
import productSlice from "./slices/productSlice/productSlice";
import vendorPurchaseApiSlice from "./slices/vendorPurchase/vendorPurchaseApiSlice";
import { customerApiSlice } from "./slices/customerSlice/customerApiSlice";
import { saleApiSlice } from "./slices/saleSlice/saleApiSlice";
import publicProductSlice from "./slices/publicSlice/publicProductSlice";
import { publicApiSlice } from "./slices/publicSlice/publicApiSlice";
const reducer = {
	[authSlice.name]: authSlice.reducer,
	[kioskSlice.name]: kioskSlice.reducer,
	[globalSlice.name]: globalSlice.reducer,
	[userSlice.name]: userSlice.reducer,
	[productSlice.name]: productSlice.reducer,
	[customerSlice.name]: customerSlice.reducer,
	[publicProductSlice.name]: publicProductSlice.reducer,

	[authApiSlice.reducerPath]: authApiSlice.reducer,
	[userApiSlice.reducerPath]: userApiSlice.reducer,
	[kioskApiSlice.reducerPath]: kioskApiSlice.reducer,
	[vendorApiSlice.reducerPath]: vendorApiSlice.reducer,
	[productApiSlice.reducerPath]: productApiSlice.reducer,
	[vendorPurchaseApiSlice.reducerPath]: vendorPurchaseApiSlice.reducer,
	[customerApiSlice.reducerPath]: customerApiSlice.reducer,
	[saleApiSlice.reducerPath]: saleApiSlice.reducer,
	[publicApiSlice.reducerPath]: publicApiSlice.reducer,
};

const store = configureStore({
	reducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			publicApiSlice.middleware,
			authApiSlice.middleware,
			userApiSlice.middleware,
			kioskApiSlice.middleware,
			vendorApiSlice.middleware,
			productApiSlice.middleware,
			vendorPurchaseApiSlice.middleware,
			customerApiSlice.middleware,
			saleApiSlice.middleware),
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;  