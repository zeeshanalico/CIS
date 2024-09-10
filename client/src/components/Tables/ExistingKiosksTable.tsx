import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useGetKiosksQuery, useDeleteKioskMutation } from '@/store/slices/kioskSlice/kioskApiSlice';
import { setKiosks, setSelectedKiosk, toggleEditModal, toggleDeleteConfirmationModal, setExtraInfo, setLimit, setPage } from '@/store/slices/kioskSlice/kioskSlice';
import { Kiosk } from '@/types/kiosk';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { User } from '@/types/User';
import { MdDeleteForever, FaEdit } from '../../assets/icons';
import ConfirmationModal from '../ui/ConfirmationModal';
import { errorHandler } from '../error/errorHandler';
import { successHandler } from '@/utils/successHandler';
import EditKiosk from '@/pages/Kiosk/EditKiosk';
import { useUpdateKioskUsersMutation } from '@/store/slices/userSlice/userApiSlice';
const ExistingKiosksTable = () => {
  const [updateKioskUsers] = useUpdateKioskUsersMutation()
  const { kiosks, showDeleteConfirmationModal, showEditModal, selectedKiosk, extraInfo, limit, page: pageNumber } = useSelector((state: RootState) => state.kioskSlice);
  const dispatch = useDispatch();

  const { data, isLoading, error, refetch } = useGetKiosksQuery({ limit, page: pageNumber });

  const [deleteKiosk] = useDeleteKioskMutation();

  useEffect(() => {
    if (data?.result) {
      dispatch(setKiosks(data.result));
    }
    if (data?.extraInfo) {
      dispatch(setExtraInfo(data.extraInfo));
    }
  }, [data, dispatch]);

  const formik = useFormik({
    initialValues: {
      kiosks: kiosks || [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log('Updated values:', values);
    },
  });

  const handleDeleteClick = (kiosk: Kiosk) => {
    dispatch(setSelectedKiosk(kiosk));
    dispatch(toggleDeleteConfirmationModal());
  };

  const handleEditClick = (kiosk: Kiosk) => {
    dispatch(setSelectedKiosk(kiosk));
    dispatch(toggleEditModal());
  };

  const confirmEdit = async (values: { id: number, users: { user_id: number, name: string }[] }) => {//buggy type annotation
    try {
      console.log(values);
      const response = await updateKioskUsers(values).unwrap()
      successHandler(response)
      refetch()
      dispatch(toggleEditModal());
    } catch (error) {
      errorHandler(error)
    }
  }

  const confirmDelete = async () => {
    if (selectedKiosk?.id !== null) {
      try {
        const response = await deleteKiosk({ deleteType: 'soft', id: selectedKiosk?.id as number }).unwrap();
        dispatch(toggleDeleteConfirmationModal());
        dispatch(setSelectedKiosk(selectedKiosk as Kiosk));
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
    <div className="mx-auto flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-semibold mb-4">Existing Kiosks</h1>
        <div className='flex flex-row gap-2 items-center'>
          <p className="text-sm text-gray-500">Showing <span className="font-medium">{extraInfo.from}</span> to <span className="font-medium">{extraInfo.to}</span> of <span className="font-medium">{extraInfo.count}</span> results</p>
          <select className='h-8 outline-none border border-gray-300 rounded' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch(setLimit(Number(e.target.value)))}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      <form className="overflow-x-auto scrollbar-style shadow-xl " onSubmit={formik.handleSubmit}>
        <table className="p-2 min-w-full bg-white border border-gray-200" style={{boxShadow: 'inset 1px 1px 4px 4px #F9FAFB'}}>
          <thead>
            <tr>
              <th className="px-4 py-2 text-sm border-b">Sr.</th>
              <th className="px-4 py-2 text-sm border-b">Name</th>
              <th className="px-4 py-2 text-sm border-b">Location</th>
              <th className="px-4 py-2 text-sm border-b text-nowrap">Registered By</th>
              <th className="px-4 py-2 text-sm border-b text-nowrap">Managed By</th>
              {/* <th className="px-4 py-2 text-sm border-b">Is Deleted</th> */}
              <th className="px-4 py-2 text-sm border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {formik.values.kiosks.map((kiosk, index) => (
              <tr key={kiosk.id} className="hover:bg-gray-100">
                <td className="text-center px-4 py-2 border-b">{index + 1}</td>
                <td className="text-center px-4 py-2 border-b">{formik.values.kiosks[index].name}</td>
                <td className="text-center px-4 py-2 border-b">{formik.values.kiosks[index].location || ''}</td>
                <td className="text-center px-4 py-2 border-b">{(formik.values.kiosks[index].internal_user as User)?.name}</td>
                <td className="text-center px-4 py-2 border-b">{(formik.values.kiosks[index].user as User[])?.map(u => `${u.name}, `)}</td>
                {/* <td className="px-4 py-2 border-b text-center">
                  <input
                    type="checkbox"
                    name={`kiosks[${index}].is_deleted`}
                    checked={formik.values.kiosks[index].is_deleted}
                    onChange={formik.handleChange}
                    className="form-checkbox"
                  />
                </td> */}
                <td className="px-4 py-2 border-b text-center">
                  <div className='flex flex-row gap-2'>
                    <span onClick={() => handleEditClick(kiosk)}>
                      <FaEdit className="w-6 h-6 hover:cursor-pointer transition-transform transform hover:scale-110 active:scale-90 duration-200 text-indigo-600 hover:text-indigo-800" />
                    </span>
                    <span onClick={() => handleDeleteClick(kiosk)}>
                      <MdDeleteForever className="w-6 h-6 hover:cursor-pointer transition-transform transform hover:scale-110 active:scale-90 duration-200 text-red-600 hover:text-red-800" />
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
      <div className='flex flex-row justify-between'>
        <div></div>
        <div className="inline-flex rounded-md shadow-sm mt-3 m-auto" role="group">
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
