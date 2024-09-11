import { useGetAllUsersQuery } from '@/store/slices/userSlice/userApiSlice';
import Table, { Td, Th, Tr } from '@/components/ui/Table';
import { FaEdit, MdDeleteForever } from '../../assets/icons';
import _ from 'lodash'
import { User } from '../../types/User'
import EditUser, { EditUserFormState } from './EditUser';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import {
    setLimit,
    setPage,
    setUsers,
    setExtraInfo,
    toggleEditModal,
    setSelectedUser,
} from '@/store/slices/userSlice/userSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Card from '@/components/ui/Card';
import { useUpdateUserMutation, useDeleteUserMutation } from '@/store/slices/userSlice/userApiSlice';
import { toggleDeleteConfirmationModal } from '@/store/slices/userSlice/userSlice';
import { successHandler } from '@/utils/successHandler';
import { errorHandler } from '@/components/error/errorHandler';
const UserTable = () => {
    const dispatch = useDispatch();
    const { users, extraInfo, limit, page: pageNumber, showEditModal, selectedUser, showDeleteConfirmationModal, } = useSelector((state: RootState) => state.userSlice);
    const { data, isLoading, error } = useGetAllUsersQuery({ limit, page: pageNumber });
    const [updateUser] = useUpdateUserMutation();
    const [deleteUser] = useDeleteUserMutation()
    useEffect(() => {
        if (data?.result) {
            dispatch(setUsers(data.result));
        }
        if (data?.extraInfo) {
            dispatch(setExtraInfo(data.extraInfo));
        }
    }, [data, dispatch]);

    const handleEdit = (user: any) => {
        dispatch(setSelectedUser(user));
        dispatch(toggleEditModal());
    };

    const handleDelete = (user: User) => {
        dispatch(setSelectedUser(user));
        dispatch(toggleDeleteConfirmationModal());
    };
    const confirmEdit = async (values: EditUserFormState) => {

        try {
            const response = await updateUser(values).unwrap();
            successHandler(response);
            dispatch(toggleEditModal());
        } catch (error) {
            errorHandler(error);
        }
    };
    const confirmDelete = async () => {
        if (selectedUser?.id !== null) {
            try {
                const response = await deleteUser({ deleteType: 'soft', id: selectedUser?.id as number }).unwrap();
                dispatch(toggleDeleteConfirmationModal());
                successHandler(response);
            } catch (err) {
                errorHandler(err);
            }
        }
    };
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching kiosks.</div>;

    const totalPages = Math.ceil(extraInfo.count / limit);

    return (
        <div>
            <div className="flex flex-row justify-between items-center mb-4">
                <p className="text-sm text-gray-500">
                    Showing <span className="font-medium">{extraInfo.from}</span> to <span className="font-medium">{extraInfo.to}</span> of <span className="font-medium">{extraInfo.count}</span> results
                </p>
                <select
                    className="h-8 outline-none border border-gray-300 rounded"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setLimit(Number(e.target.value)))}
                    value={limit}
                >
                    <option value="6">6</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
            <Card>
                <Table>
                    <thead>
                        <tr>
                            <Th heading='Sr.' />
                            <Th heading='Name' />
                            <Th heading='Email' />
                            {/* <Th heading='Created At' /> */}
                            <Th heading='Actions' />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <Tr key={user.id}>
                                <Td className="px-4">{index + 1 + (pageNumber - 1) * limit}</Td>
                                <Td>{user.name}</Td>
                                <Td>{user.email}</Td>
                                {/* <Td>{new Date(user.created_at).toLocaleDateString()}</Td> */}
                                <Td>
                                    <div className="flex gap-2">
                                        <span onClick={() => handleEdit(user)}>
                                            <FaEdit className="w-6 h-6 hover:cursor-pointer transition-transform transform hover:scale-110 active:scale-90 duration-200 text-indigo-600 hover:text-indigo-800" />
                                        </span>
                                        <span onClick={() => handleDelete(user)}>
                                            <MdDeleteForever className="w-6 h-6 hover:cursor-pointer transition-transform transform hover:scale-110 active:scale-90 duration-200 text-red-600 hover:text-red-800" />
                                        </span>
                                    </div>
                                </Td>
                            </Tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
            <div className="flex flex-row justify-between mt-3">
                <div></div>
                <div className="inline-flex rounded-md shadow-sm m-auto" role="group">
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                        onClick={() => dispatch(setPage(pageNumber - 1))}
                        disabled={pageNumber === 1}
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            type="button"
                            className={`px-4 py-2 text-sm font-medium ${pageNumber === i + 1 ? 'text-blue-700 bg-gray-200' : 'text-gray-900 bg-white'} border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
                            onClick={() => dispatch(setPage(i + 1))}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        type="button"
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
                        onClick={() => dispatch(setPage(pageNumber + 1))}
                        disabled={pageNumber === totalPages}
                    >
                        Next
                    </button>
                </div>
                <EditUser
                    isOpen={showEditModal}
                    onSubmit={confirmEdit}
                    onClose={() => dispatch(toggleEditModal())}
                    initialValues={_.pick(selectedUser as User, ['name', 'email', 'id'])}
                />
                <ConfirmationModal
                    isOpen={showDeleteConfirmationModal}
                    onConfirm={confirmDelete}
                    onClose={() => dispatch(toggleDeleteConfirmationModal())}
                    buttonText="Delete"
                    description={`Are you sure you want to delete this user "${selectedUser?.name}"?`}
                />
                <div></div>
            </div>

        </div>
    );
};

export default UserTable;
