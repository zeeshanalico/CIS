import { useCreateVendorMutation } from '@/store/slices/vendorSlice/vendorApiSlice';
import { BsFillTelephoneFill, FaStore } from "../../../assets/icons";
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormInput from '@/components/core/FormInput';
import { errorHandler } from '@/components/error/errorHandler';
import { successHandler } from '@/utils/successHandler';
import { Button } from "@/components/ui/button";

export interface FormValues {
  name: string;
  contact_info: string | undefined;
}

const AddVendor = ({ isOpen, toggleModal }: { toggleModal?: () => void, isOpen?: boolean }) => {
  const [createVendor, { isLoading }] = useCreateVendorMutation();

  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
    try {
      const payload = {
        ...values,
        contact_info: values.contact_info || undefined,//empty string is falsy so undefined will be assigned to variable
      };

      const response = await createVendor(payload).unwrap();
      successHandler(response);
    } catch (err: unknown) {
      errorHandler(err);
    } finally {
      setSubmitting(false);
      resetForm();
      toggleModal && toggleModal();
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Add a new vendor
        </h2>
        <Formik
          initialValues={{
            name: '',
            contact_info: undefined,
          } as FormValues}
          validationSchema={Yup.object({
            name: Yup.string().required('Name is required'),
            contact_info: Yup.string().nullable().transform((value, originalValue) => originalValue.trim() === '' ? undefined : value),
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
                label="Vendor Name"
                name="name"
                icon={<FaStore />}
                error={errors.name}
                touched={touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Enter the vendor name"
              />
              <FormInput
                label="Contact Details"
                name="contact_info"
                icon={<BsFillTelephoneFill />}
                error={errors.contact_info}
                touched={touched.contact_info}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contact_info ?? ''}
                placeholder="Enter the contact details"
              />

              <Button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isSubmitting || isLoading}
              >
                {isSubmitting || isLoading ? 'Creating...' : 'Add Vendor'}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddVendor;
