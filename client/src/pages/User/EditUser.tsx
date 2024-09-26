import Modal from "@/components/ui/Modal";
import { Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import FormInput from "@/components/core/FormInput";
import { FaUserAlt, MdOutlineAlternateEmail, FaLock } from '../../assets/icons';

export interface EditUserFormState {
    id?: number;//it shouldn't be optional
    name: string;
    email: string;
    resetPassword?: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (updated: EditUserFormState) => void;
    initialValues: EditUserFormState;
}

const EditUser: React.FC<Props> = ({ isOpen, onClose, onSubmit, initialValues }) => {
    const handleSubmit = (
        values: { name: string; email: string },
        { setSubmitting }: FormikHelpers<{ name: string; email: string }>
    ) => {
        // Include id in the form values when submitting
        onSubmit({ ...values, id: initialValues.id });
        setSubmitting(false);
    };

    return (
        <Modal title="Edit User" isOpen={isOpen}>
            <div className="p-4">
                <Formik
                    initialValues={{
                        name: initialValues.name,
                        email: initialValues.email,
                        resetPassword: ''
                    } as EditUserFormState}
                    validationSchema={Yup.object({
                        name: Yup.string()
                            .min(3, "Name must be at least 3 characters")
                            .required("Name is required"),
                        email: Yup.string()
                            .email("Invalid email address")
                            .required("Email is required"),
                        resetPassword: Yup.string().optional().min(6, 'If you want to update Password it must be minimum 6 characters')
                    })}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <FormInput
                                    label="Name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    touched={touched.name}
                                    error={errors.name}
                                    icon={<FaUserAlt />}
                                />
                            </div>
                            <div className="mb-4">
                                <FormInput
                                    label="Email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    touched={touched.email}
                                    error={errors.email}
                                    icon={<MdOutlineAlternateEmail />}
                                />
                                <FormInput
                                    label="Reset Password"
                                    name="resetPassword"
                                    value={values.resetPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    touched={touched.resetPassword}
                                    error={errors.resetPassword}
                                    icon={<FaLock />}
                                />
                            </div>

                            <div className="py-4 border-t flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 transition-transform transform hover:scale-110 active:scale-90 duration-200 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-transform transform hover:scale-110 active:scale-45 duration-200"
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
    );
};

export default EditUser;
