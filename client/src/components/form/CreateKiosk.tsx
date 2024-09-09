import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Button } from "@/components/ui/button";
import { FaMapMarkerAlt, FaStore, FaUserAlt } from "../../assets/icons";
import { useCreateKioskMutation } from '@/store/slices/kioskSlice/kioskApiSlice';
import FormSelect from '../core/FormSelect';
import FormInput from '../core/FormInput';
import { errorHandler } from '../error/errorHandler';
import { useGetAllUsersQuery } from '@/store/slices/userSlice/userApiSlice';
import { successHandler } from '@/utils/successHandler';

export interface KioskFormValues {
    name: string;
    location: string;
    user: number | undefined;
}

const CreateKiosk = () => {
    const [createKiosk, { isLoading }] = useCreateKioskMutation();
    const { data, refetch } = useGetAllUsersQuery({ available: true });//all users who has a kiosk_id null

    const handleSubmit = async (values: KioskFormValues, { setSubmitting, resetForm }: FormikHelpers<KioskFormValues>) => {
        try {
            const response = await createKiosk(values).unwrap();
            successHandler(response);
            refetch()
        } catch (err: unknown) {
            errorHandler(err)
        } finally {
            setSubmitting(false);
            resetForm()
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
                    Create a New Kiosk
                </h2>
                <Formik
                    initialValues={{ name: '', location: '', user: undefined as number | undefined }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Name is required'),
                        location: Yup.string().required('Location is required'),
                        user: Yup.number().nullable(),
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
                                label="Kiosk Name"
                                name="name"
                                icon={<FaStore />}
                                error={errors.name}
                                touched={touched.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                placeholder="Enter the kiosk name"
                            />
                            <FormInput
                                label="Location"
                                name="location"
                                icon={<FaMapMarkerAlt />}
                                error={errors.location}
                                touched={touched.location}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.location}
                                placeholder="Enter the kiosk location"
                            />
                            {/* <FormSelect
                                label="Manager"
                                name="user"
                                icon={<FaUserAlt />}
                                error={errors.user}
                                touched={touched.user}
                                onSelect={handleChange}
                                onBlur={handleBlur}
                                value={values.user}
                                options={data?.result.map((user) => ({ value: user.id, label: user.name }))}
                            /> */}
                            <FormSelect
                                label="Manager"
                                name="user"
                                icon={<FaUserAlt />}
                                error={errors.user}
                                touched={touched.user}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.user}
                                options={data?.result.map((user) => ({ value: user.id, label: user.name }))}
                            />
                            <Button
                                type="submit"
                                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                disabled={isSubmitting || isLoading}
                            >
                                {isSubmitting || isLoading ? 'Creating...' : 'Create Kiosk'}
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CreateKiosk;
