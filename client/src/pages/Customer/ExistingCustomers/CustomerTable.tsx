import { useGetAllCustomersQuery } from '@/store/slices/customerSlice/customerApiSlice';
import Table, { Td, Th, Tr } from '@/components/ui/Table';
import { FaEdit, MdDeleteForever } from '../../../assets/icons';
import _ from 'lodash'
import { Customer } from '@/types/Customer';
import EditCustomer, { EditCustomerFormState } from '../EditCustomer';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import {
    setLimit,
    setPage,
    setCustomers,
    setExtraInfo,
    toggleEditModal,
    setSelectedCustomer,
} from '@/store/slices/customerSlice/customerSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Card from '@/components/ui/Card';
import { useUpdateCustomerMutation, useDeleteCustomerMutation } from '@/store/slices/customerSlice/customerApiSlice';
import { toggleDeleteConfirmationModal } from '@/store/slices/customerSlice/customerSlice';
import { successHandler } from '@/utils/successHandler';
import { errorHandler } from '@/components/error/errorHandler';

const CustomerTable = () => {
    const dispatch = useDispatch();
    const { customers, extraInfo, limit, page: pageNumber, showEditModal, selectedCustomer, showDeleteConfirmationModal, } = useSelector((state: RootState) => state.customerSlice);
    const { data, isLoading, error } = useGetAllCustomersQuery({ limit, page: pageNumber });
    const [updateCustomer] = useUpdateCustomerMutation();
    const [deleteCustomer] = useDeleteCustomerMutation();

    useEffect(() => {
        if (data?.result) {
            dispatch(setCustomers(data.result));
        }
        if (data?.extraInfo) {
            dispatch(setExtraInfo(data.extraInfo));
        }
    }, [data, dispatch]);

    const handleEdit = (customer: Customer) => {
        dispatch(setSelectedCustomer(customer));
        dispatch(toggleEditModal());
    };

    const handleDelete = (customer: Customer) => {
        dispatch(setSelectedCustomer(customer));
        dispatch(toggleDeleteConfirmationModal());
    };

    const confirmEdit = async (values: EditCustomerFormState) => {
        try {
            const response = await updateCustomer(values).unwrap();
            successHandler(response);
            dispatch(toggleEditModal());
        } catch (error) {
            errorHandler(error);
        }
    };

    const confirmDelete = async () => {
        if (selectedCustomer?.id !== null) {
            try {
                const response = await deleteCustomer({ deleteType: 'soft', id: selectedCustomer?.id as number }).unwrap();
                dispatch(toggleDeleteConfirmationModal());
                successHandler(response);
            } catch (err) {
                errorHandler(err);
            }
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching customers.</div>;

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
                            <Th heading='Actions' />
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <Tr key={customer.id}>
                                <Td className="px-4">{index + 1 + (pageNumber - 1) * limit}</Td>
                                <Td>{customer.name}</Td>
                                <Td>{customer.email}</Td>
                                <Td>
                                    <div className="flex gap-2">
                                        <span onClick={() => handleEdit(customer)}>
                                            <FaEdit className="w-6 h-6 hover:cursor-pointer transition-transform transform hover:scale-110 active:scale-90 duration-200 text-indigo-600 hover:text-indigo-800" />
                                        </span>
                                        <span onClick={() => handleDelete(customer)}>
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
                <EditCustomer
                    isOpen={showEditModal}
                    onSubmit={confirmEdit}
                    onClose={() => dispatch(toggleEditModal())}
                    initialValues={_.pick(selectedCustomer as Customer, ['name', 'email', 'id'])}
                />
                <ConfirmationModal
                    isOpen={showDeleteConfirmationModal}
                    onConfirm={confirmDelete}
                    onClose={() => dispatch(toggleDeleteConfirmationModal())}
                    buttonText="Delete"
                    description={`Are you sure you want to delete this customer "${selectedCustomer?.name}"?`}
                />
                <div></div>
            </div>

        </div>
    );
};

export default CustomerTable;
