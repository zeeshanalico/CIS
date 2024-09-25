import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { FaUserAlt, FaEnvelope, FaPhone, FaLock } from "../../../assets/icons"; // Icons
import { useCreateCustomerMutation } from '@/store/slices/customerSlice/customerApiSlice';
import FormInput from '../../../components/core/FormInput';
import { errorHandler } from '../../../components/error/errorHandler';
import { successHandler } from '@/utils/successHandler';

export interface CustomerFormValues {
    name: string;
    email: string;
    phone?: string;
    secret: string;
}

const CreateCustomer = ({ name, onClose, toggleModal }: { name?: string, toggleModal?: () => void, onClose?: () => void, }) => {
    const [createCustomer, { isLoading }] = useCreateCustomerMutation();

    const handleSubmit = async (values: CustomerFormValues, { setSubmitting, resetForm }: FormikHelpers<CustomerFormValues>) => {
        try {
            const response = await createCustomer(values).unwrap();
            successHandler(response);
            toggleModal && toggleModal();
        } catch (err: unknown) {
            errorHandler(err);
        } finally {
            setSubmitting(false);
            resetForm();
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
                    Create a New Customer
                </h2>
                <Formik
                    initialValues={{ name: name ?? '', email: '', phone: '', secret: '' } as CustomerFormValues}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Name is required'),
                        email: Yup.string().email('Invalid email address').required('Email is required'),
                        phone: Yup.string().matches(/^[0-9]{10,15}$/, 'Phone number is not valid').nullable(),
                        secret: Yup.string().min(6, 'Secret must be at least 6 characters').required('Secret is required'),
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
                            <FormInput
                                label="Customer Name"
                                name="name"
                                icon={<FaUserAlt />}
                                error={errors.name}
                                touched={touched.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                placeholder="Enter customer name"
                            />
                            <FormInput
                                label="Email"
                                name="email"
                                icon={<FaEnvelope />}
                                error={errors.email}
                                touched={touched.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder="Enter customer email"
                            />
                            <FormInput
                                label="Phone"
                                name="phone"
                                icon={<FaPhone />}
                                error={errors.phone}
                                touched={touched.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                                placeholder="Enter phone number (optional)"
                            />
                            <FormInput
                                label="Secret"
                                name="secret"
                                type="password"
                                icon={<FaLock />}
                                error={errors.secret}
                                touched={touched.secret}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.secret}
                                placeholder="Enter a secret (min 6 characters)"
                            />
                            <div className="flex flex-row gap-2 ">

                                {onClose && <Button onClick={toggleModal} variant="secondary" className='basis-1/2'>Cancel</Button>}
                                <Button
                                    type="submit"
                                    className={`${onClose?'basis-1/2':'w-full'} px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                    disabled={isSubmitting || isLoading}
                                >
                                    {isSubmitting || isLoading ? 'Creating...' : 'Create Customer'}
                                </Button>
                            </div>

                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CreateCustomer;
