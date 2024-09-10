import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Kiosk } from '@/types/kiosk';
import { ExtraInfo } from '@/types/apiResponse';

interface KioskState {
    kiosks: Kiosk[];
    showDeleteConfirmationModal: boolean;
    showEditModal: boolean;
    selectedKiosk: Kiosk | null;
    extraInfo: ExtraInfo,
    page: number;
    limit: number;
}

const initialState: KioskState = {
    kiosks: [],
    showDeleteConfirmationModal: false,
    selectedKiosk: null,
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

const kioskSlice = createSlice({
    name: 'kioskSlice',
    initialState,
    reducers: {
        setKiosks(state, action: PayloadAction<Kiosk[]>) {
            state.kiosks = action.payload;
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

        addKiosk(state, action: PayloadAction<Kiosk>) {
            state.kiosks.push(action.payload);
        },
        setSelectedKiosk(state, action: PayloadAction<Kiosk>) {
            state.selectedKiosk = action.payload;
        },
        toggleDeleteConfirmationModal(state) {
            state.showDeleteConfirmationModal = !state.showDeleteConfirmationModal;
        },
        toggleEditModal(state) {
            state.showEditModal = !state.showEditModal;
        },
    },
});

export const { setKiosks, addKiosk, setSelectedKiosk, toggleEditModal, toggleDeleteConfirmationModal, setExtraInfo, setPage, setLimit } = kioskSlice.actions;
export default kioskSlice;
