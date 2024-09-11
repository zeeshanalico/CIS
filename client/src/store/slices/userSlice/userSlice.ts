import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../../types/User'
import { ExtraInfo } from '@/types/apiResponse';
interface UserState {
    users: User[];
    showDeleteConfirmationModal: boolean;
    showEditModal: boolean;
    selectedUser: User | null;
    extraInfo: ExtraInfo,
    page: number;
    limit: number;
}

const initialState: UserState = {
    users: [],
    showDeleteConfirmationModal: false,
    selectedUser: null,
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

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
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

        addUser(state, action: PayloadAction<User>) {
            state.users.push(action.payload);
        },
        setSelectedUser(state, action: PayloadAction<User>) {
            state.selectedUser = action.payload;
        },
        toggleDeleteConfirmationModal(state) {
            state.showDeleteConfirmationModal = !state.showDeleteConfirmationModal;
        },
        toggleEditModal(state) {
            state.showEditModal = !state.showEditModal;
        },
    },
});

export const { setUsers, setSelectedUser, addUser, toggleDeleteConfirmationModal, toggleEditModal, setExtraInfo, setPage, setLimit } = userSlice.actions;
export default userSlice;
