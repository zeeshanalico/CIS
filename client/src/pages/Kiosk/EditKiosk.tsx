import Modal from "@/components/ui/Modal";
import { Kiosk } from "@/types/kiosk";
import { useGetAllUsersQuery } from "@/store/slices/userSlice/userApiSlice";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import Select, { MultiValue } from 'react-select';
import _ from 'lodash';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (updatedKiosk: any) => void;//bug in kiosk.user type .it will be like {:user_id,name }
    kiosk: Kiosk;
}

const EditKiosk = ({ isOpen, onClose, onSubmit, kiosk }: Props) => {
    const { data } = useGetAllUsersQuery({ available: true });

    const handleSubmit = (values: { users: { value: number; label: string; }[] }, { setSubmitting }: FormikHelpers<{ users: { value: number; label: string; }[] }>) => {
        onSubmit({ ...kiosk, users: values.users.map(user => { return { user_id: user.value, name: user.label } }) });
        setSubmitting(false);
    };

    return (
        <div>
            <Modal className=" max-w-sm md:max-w-lg" title="Edit Kiosk" isOpen={isOpen} >
                <div className="p-4">
                    <Formik
                        initialValues={{
                            users: kiosk?.user.map(u => ({ value: u.id, label: u.name })) || [],
                        }}
                        validationSchema={Yup.object({
                            users: Yup.array().min(1, "At least one user is required").required("Users are required"),
                        })}
                        onSubmit={handleSubmit}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleSubmit,
                            setFieldValue,
                            isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Managers</label>
                                    <Select
                                        isMulti
                                        name="users"
                                        value={values.users}
                                        onChange={(selectedOptions: MultiValue<{ value: number; label: string }>) => {
                                            setFieldValue("users", selectedOptions);
                                        }}
                                        options={data?.result?.map(user => ({ value: user.id, label: user.name })) || []}
                                        className="basic-multi-select"
                                        classNamePrefix="select"
                                    />
                                    {errors.users && touched.users && (
                                        <p className="text-red-500 text-sm mt-2">{errors.users as string}</p>
                                    )}
                                </div>

                                <div className="py-4 border-t flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:cursor-pointer transition-transform transform hover:scale-110 active:scale-90 duration-200 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none hover:cursor-pointer transition-transform transform hover:scale-110 active:scale-45 duration-200"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </div>
    );
};

export default EditKiosk;
