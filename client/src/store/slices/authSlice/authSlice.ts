import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPayload } from '@/types/UserPayload';
interface AuthState {
  accessToken: string | null;
  user: UserPayload | null;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string; user: UserPayload }>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    //   setCredentials: (state, action: PayloadAction<Partial<AuthState>>) => {
    //   return { ...state, ...action.payload };
    },
    clearCredentials: (state) => {
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice;
