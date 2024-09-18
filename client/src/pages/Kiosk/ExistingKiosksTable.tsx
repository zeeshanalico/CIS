import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetKiosksQuery, useDeleteKioskMutation } from '@/store/slices/kioskSlice/kioskApiSlice';
import { setKiosks, setSelectedKiosk, setPage, setLimit, toggleEditModal, toggleDeleteConfirmationModal, setExtraInfo } from '@/store/slices/kioskSlice/kioskSlice';

import { useUpdateKioskUsersMutation } from '@/store/slices/userSlice/userApiSlice';
import { Kiosk } from '@/types/kiosk';
import { User } from '@/types/User';
import { MdDeleteForever, FaEdit } from '../../assets/icons';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import { errorHandler } from '../../components/error/errorHandler';
import { successHandler } from '@/utils/successHandler';
import EditKiosk from '@/pages/Kiosk/EditKiosk';
import Table, { Th, Td, Tr } from '../../components/ui/Table';
import usePagination from '../../components/hooks/usePagination';
const ExistingKiosksTable = () => {
  const [updateKioskUsers] = useUpdateKioskUsersMutation();
  const { kiosks, showDeleteConfirmationModal, showEditModal, selectedKiosk, extraInfo, limit, page } = useSelector((state: RootState) => state.kioskSlice);
  const dispatch = useDispatch();
  const { data, isLoading, error, refetch } = useGetKiosksQuery({ limit, page });
  const [deleteKiosk] = useDeleteKioskMutation();

  const {
    currentPage,
    totalPages,
    goToNextPage,
    goToPrevPage,
    goToPage,
  } = usePagination({
    totalItems: extraInfo.count,
    itemsPerPage: limit,
  });

  useEffect(() => {
    if (data?.result) {
      dispatch(setKiosks(data.result));
    }
    if (data?.extraInfo) {
      dispatch(setExtraInfo(data.extraInfo));
    }
  }, [data, dispatch]);

  const handleDeleteClick = (kiosk: Kiosk) => {
    dispatch(setSelectedKiosk(kiosk));
    dispatch(toggleDeleteConfirmationModal());
  };

  const handleEditClick = (kiosk: Kiosk) => {
    dispatch(setSelectedKiosk(kiosk));
    dispatch(toggleEditModal());
  };

  const confirmEdit = async (values: { id: number, users: { user_id: number, name: string }[] }) => {
    try {
      const response = await updateKioskUsers(values).unwrap();
      successHandler(response);
      refetch();
      dispatch(toggleEditModal());
    } catch (error) {
      errorHandler(error);
    }
  };

  const confirmDelete = async () => {
    if (selectedKiosk?.id !== null) {
      try {
        const response = await deleteKiosk({ deleteType: 'soft', id: selectedKiosk?.id as number }).unwrap();
        dispatch(toggleDeleteConfirmationModal());
        successHandler(response);
        refetch();
      } catch (err) {
        errorHandler(err);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching kiosks.</div>;

  return (
    <div className="mx-auto flex flex-col">
      <div className="flex flex-row justify-between items-center my-2">
          <p className="text-sm text-gray-500">Showing <span className="font-medium">{extraInfo.from}</span> to <span className="font-medium">{extraInfo.to}</span> of <span className="font-medium">{extraInfo.count}</span> results</p>
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
      <div className="overflow-x-auto scrollbar-style shadow-xl">
        <Table>
          <thead>
            <tr>
              <Th heading="Sr." />
              <Th heading="Name" />
              <Th heading="Location" />
              <Th heading="Registered By" />
              <Th heading="Managed By" />
              <Th heading="Actions" />
            </tr>
          </thead>
          <tbody>
            {kiosks.map((kiosk, index) => (
              <Tr key={kiosk.id}>
                <Td>{index + 1 + (currentPage - 1) * limit}</Td>
                <Td>{kiosk.name}</Td>
                <Td>{kiosk.location || ''}</Td>
                <Td>{(kiosk.internal_user as User)?.name}</Td>
                <Td>{(kiosk.user as User[])?.map(u => `${u.name}, `)}</Td>
                <Td>
                  <div className="flex flex-row gap-2 justify-center">
                    <span onClick={() => handleEditClick(kiosk)}>
                      <FaEdit className="w-6 h-6 hover:cursor-pointer transition-transform transform hover:scale-110 active:scale-90 duration-200 text-indigo-600 hover:text-indigo-800" />
                    </span>
                    <span onClick={() => handleDeleteClick(kiosk)}>
                      <MdDeleteForever className="w-6 h-6 hover:cursor-pointer transition-transform transform hover:scale-110 active:scale-90 duration-200 text-red-600 hover:text-red-800" />
                    </span>
                  </div>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="flex flex-row justify-between mt-3">
        <div></div>
        <div className="inline-flex rounded-md shadow-sm m-auto" role="group">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={() => {
              dispatch(setPage(page - 1))
              goToPrevPage()
            }}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`px-4 py-2 text-sm font-medium ${currentPage === i + 1 ? 'text-blue-700 bg-gray-200' : 'text-gray-900 bg-white'} border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white`}
              onClick={() => {
                dispatch(setPage(i + 1))
                goToPage(i + 1)
              }}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={() => {
              dispatch(setPage(page + 1))
              goToNextPage()
            }}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <div></div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteConfirmationModal}
        onConfirm={confirmDelete}
        onClose={() => dispatch(toggleDeleteConfirmationModal())}
        buttonText="Delete"
        description={`Are you sure you want to delete the kiosk "${selectedKiosk?.name}"?`}
      />
      <EditKiosk
        isOpen={showEditModal}
        onSubmit={confirmEdit}
        onClose={() => dispatch(toggleEditModal())}
        kiosk={selectedKiosk as Kiosk}
      />
    </div>
  );
};

export default ExistingKiosksTable;
