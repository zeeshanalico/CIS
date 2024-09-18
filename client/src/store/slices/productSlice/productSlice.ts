import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Kiosk } from '@/types/kiosk';
import { ExtraInfo } from '@/types/apiResponse';
import { Product } from '@/types/Product';

interface ProductState {
    products: Product[];
    // showDeleteConfirmationModal: boolean;
    // showEditModal: boolean;
    // selectedProduct: Product | null;
    extraInfo: ExtraInfo,
    page: number;
    limit: number;
}

const initialState: ProductState = {
    products: [],
    // showDeleteConfirmationModal: false,
    // selectedKiosk: null,
    // showEditModal: false,
    extraInfo: {
        count: 0,
        pageNumber: 0,
        pageSize: 0,
        from: 0,
        to: 0
    },
    page: 1,
    limit: 5,
};

const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },
        setExtraInfo(state, action: PayloadAction<ExtraInfo>) {
            state.extraInfo = action.payload;
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setLimit(state, action: PayloadAction<number>) {
            state.limit = action.payload;
        },

        // addKiosk(state, action: PayloadAction<Kiosk>) {
        //     state.kiosks.push(action.payload);
        // },
        // setSelectedKiosk(state, action: PayloadAction<Kiosk>) {
        //     state.selectedKiosk = action.payload;
        // },
        // toggleDeleteConfirmationModal(state) {
        //     state.showDeleteConfirmationModal = !state.showDeleteConfirmationModal;
        // },
        // toggleEditModal(state) {
        //     state.showEditModal = !state.showEditModal;
        // },
    },
});

export const { setProducts, setPage,setExtraInfo,setLimit } = productSlice.actions;
export default productSlice;
