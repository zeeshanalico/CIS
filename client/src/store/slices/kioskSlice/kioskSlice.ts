import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Kiosk } from '@/types/kiosk';

interface KioskState {
    kiosks: Kiosk[];
    showModal: boolean;
    selectedKiosk: {
        id: number | null;
        name: string;
    };
}

const initialState: KioskState = {
    kiosks: [],
    showModal: false,
    selectedKiosk: {
        id: null,
        name: '',
    },
};

const kioskSlice = createSlice({
    name: 'kioskSlice',
    initialState,
    reducers: {
        setKiosks(state, action: PayloadAction<Kiosk[]>) {
            state.kiosks = action.payload;
        },
        addKiosk(state, action: PayloadAction<Kiosk>) {
            state.kiosks.push(action.payload);
        },
        setSelectedKiosk(state, action: PayloadAction<{ id: number | null; name: string }>) {
            state.selectedKiosk = action.payload;
        },
        toggleModal(state, action: PayloadAction<boolean>) {
            state.showModal = action.payload;
        },
    },
});

export const { setKiosks, addKiosk, setSelectedKiosk, toggleModal } = kioskSlice.actions;
export default kioskSlice;
