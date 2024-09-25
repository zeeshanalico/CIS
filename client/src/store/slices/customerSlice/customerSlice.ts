import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '@/types/Customer';
import { ExtraInfo } from '@/types/apiResponse';
interface CustomerState {
    customers: Customer[];
    showDeleteConfirmationModal: boolean;
    showEditModal: boolean;
    selectedCustomer: Customer | null;
    extraInfo: ExtraInfo,
    page: number;
    limit: number;
}

const initialState: CustomerState = {
    customers: [],
    showDeleteConfirmationModal: false,
    selectedCustomer: null,
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
};

const customerSlice = createSlice({
    name: 'customerSlice',
    initialState,
    reducers: {
        setCustomers(state, action: PayloadAction<Customer[]>) {
            state.customers = action.payload;
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

        addCustomer(state, action: PayloadAction<Customer>) {
            state.customers.push(action.payload);
        },
        setSelectedCustomer(state, action: PayloadAction<Customer>) {
            state.selectedCustomer = action.payload;
        },
        toggleDeleteConfirmationModal(state) {
            state.showDeleteConfirmationModal = !state.showDeleteConfirmationModal;
        },
        toggleEditModal(state) {
            state.showEditModal = !state.showEditModal;
        },
    },
});

export const { setCustomers, setSelectedCustomer, addCustomer, toggleDeleteConfirmationModal, toggleEditModal, setExtraInfo, setPage, setLimit } = customerSlice.actions;
export default customerSlice;
