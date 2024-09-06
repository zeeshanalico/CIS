import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
    title: string;
}

const initialState: GlobalState = {
    title: '',
};

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<{ title: string }>) => {
            state.title = action.payload.title;
            //   setCredentials: (state, action: PayloadAction<Partial<GlobalState>>) => {
            //   return { ...state, ...action.payload };
        },
    },
});

export const { setTitle } = globalSlice.actions;
export default globalSlice;
