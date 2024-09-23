import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Kiosk } from '@/types/kiosk';
import { ExtraInfo } from '@/types/apiResponse';
import { Product } from '@/types/Product';

interface ProductState {
    products: Product[];
    sale: { selectedProducts: Product[]; }
    // showDeleteConfirmationModal: boolean;
    showEditModal: boolean;
    selectedProduct: Product | null;
    extraInfo: ExtraInfo,
    page: number;
    limit: number;
    search: undefined | string;
}

const initialState: ProductState = {
    products: [],
    sale: {
        selectedProducts: [],//for use in sale module

    },
    // showDeleteConfirmationModal: false,
    selectedProduct: null,
    showEditModal: false,
    extraInfo: {
        count: 0,
        pageNumber: 0,
        pageSize: 0,
        from: 0,
        to: 0
    },
    page: 1,
    limit: 10,
    search: undefined
};

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },
        // popProduct(state, action: PayloadAction<Product>) {
        //     state.products = state.products.filter(p => p.id !== action.payload.id)
        // },
        addToCart(state, action: PayloadAction<Product>) {
            state.sale.selectedProducts.push(action.payload);
            state.products = state.products.filter(p => p.id !== action.payload.id);
        },
        removeFromCart(state, action: PayloadAction<Product>) {
            state.products = state.sale.selectedProducts.filter(p => p.id !== action.payload.id);
            state.products.push(action.payload);
        },
        // clearCart(state) {
        //     state.sale.selectedProducts = [];//add more things to clear
        // },
        setExtraInfo(state, action: PayloadAction<ExtraInfo>) {
            state.extraInfo = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        },
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        },

        // addKiosk(state, action: PayloadAction<Kiosk>) {
        //     state.kiosks.push(action.payload);
        // },
        setSelectedProduct(state, action: PayloadAction<Product>) {
            state.selectedProduct = action.payload;
        },
        // toggleDeleteConfirmationModal(state) {
        //     state.showDeleteConfirmationModal = !state.showDeleteConfirmationModal;
        // },
        toggleEditModal(state) {
            state.showEditModal = !state.showEditModal;
        },
    },
});

export const { setProducts, addToCart, removeFromCart, setSearch, setPage, setExtraInfo, setLimit, toggleEditModal, setSelectedProduct } = productSlice.actions;
export default productSlice;
