import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useGetKiosksQuery, useDeleteKioskMutation } from '@/store/slices/kioskSlice/kioskApiSlice';
import { setKiosks, setSelectedKiosk, toggleModal } from '@/store/slices/kioskSlice/kioskSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { User } from '@/types/User';
import { MdDeleteForever } from '../../assets/icons';
import ConfirmationModal from '../ui/ConfirmationModal';
import { Kiosk } from '@/types/kiosk';
import { errorHandler } from '../error/errorHandler';
import { successHandler } from '@/utils/successHandler';

const ExistingKiosksTable = () => {
  const { data, isLoading, error } = useGetKiosksQuery({ limit: 10 });
  const dispatch = useDispatch();
  const { kiosks, showModal, selectedKiosk } = useSelector((state: RootState) => state.kioskSlice);
  const [deleteKiosk] = useDeleteKioskMutation();

  useEffect(() => {
    if (data?.result) {
      dispatch(setKiosks(data.result));
    }
  }, [data, dispatch]);

  const formik = useFormik({
    initialValues: {
      kiosks: kiosks || [],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log('Updated values:', values);
      // Handle submit logic for updating kiosks
    },
  });

  const handleDeleteClick = (id: number, name: string) => {
    dispatch(setSelectedKiosk({ id, name }));
    dispatch(toggleModal(true));
  };

  const confirmDelete = async () => {
    if (selectedKiosk.id !== null) {
      try {
        const response = await deleteKiosk({ deleteType: 'soft', id: selectedKiosk.id }).unwrap();
        dispatch(toggleModal(false));
        dispatch(setSelectedKiosk({ id: null, name: '' }));
        successHandler(response);
      } catch (err) {
        errorHandler(err)
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching kiosks.</div>;

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Existing Kiosks</h1>
      <form className="overflow-x-auto border rounded-lg border-black scrollbar-style" onSubmit={formik.handleSubmit}>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2 text-sm border-b">Sr.</th>
              <th className="px-4 py-2 text-sm border-b">Name</th>
              <th className="px-4 py-2 text-sm border-b">Location</th>
              <th className="px-4 py-2 text-sm border-b">Registered By</th>
              <th className="px-4 py-2 text-sm border-b">Is Deleted</th>
              <th className="px-4 py-2 text-sm border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {formik.values.kiosks.map((kiosk: Kiosk, index: number) => (
              <tr key={kiosk.id} className="hover:bg-gray-100">
                <td className="text-center px-4 py-2 border-b">{index+1}</td>
                <td className="text-center px-4 py-2 border-b">{formik.values.kiosks[index].name}</td>
                <td className="text-center px-4 py-2 border-b">{formik.values.kiosks[index].location || ''}</td>
                <td className="text-center px-4 py-2 border-b">{(formik.values.kiosks[index].internal_user as User)?.name}</td>
                <td className="px-4 py-2 border-b text-center">
                  <input
                    type="checkbox"
                    name={`kiosks[${index}].is_deleted`}
                    checked={formik.values.kiosks[index].is_deleted}
                    onChange={formik.handleChange}
                    className="form-checkbox"
                  />
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <span onClick={() => handleDeleteClick(kiosk.id, kiosk.name)}>
                    <MdDeleteForever className="w-6 h-6 hover:cursor-pointer transition-transform transform hover:scale-110 active:scale-90 duration-200 text-red-600 hover:text-red-800" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
      <ConfirmationModal
        isOpen={showModal}
        onConfirm={confirmDelete}
        buttonText='Delete'
        description={`Are you sure you want to delete the kiosk "${selectedKiosk.name}"?`}
        onClose={() => dispatch(toggleModal(false))}
      />
    </div>
  );
};

export default ExistingKiosksTable;
