import { useMultistepForm } from '@/components/hooks/useMultipleForm';
import { Button } from '@/components/ui/button';
import SelectVendor from './SelectVendor';
import SelectProduct from './SelectProduct';
import { useFormik, Formik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import { useGetAllVendorsQuery } from '@/store/slices/vendorSlice/vendorApiSlice';
import { useGetProductsQuery } from '@/store/slices/productSlice/productApiSlice';
import FormCreatableSelect from '@/components/core/FormCreatableSelect';
import { Fa42Group } from 'react-icons/fa6';

interface FormValues {
  vendorId?: number | undefined;
  productId: number | undefined;
  quantity: number;
  costPrice: number;
  purchaseId: string;
}

const validationSchema = yup.object({
  vendorId: yup.number().required('Vendor selection is required'),
  productId: yup.number().required('Product selection is required'),
  // quantity: yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1'),
  // costPrice: yup.number().required('Cost price is required').min(0, 'Cost price must be at least 0'),
  // purchaseId: yup.string().required('Purchase ID is required'),
});

const AddVendorPurchase = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      vendorId: undefined,
      productId: undefined,
      quantity: 0,
      costPrice: 0,
      purchaseId: '',
    },
    // validationSchema: validationSchema,
    onSubmit: (values: FormValues, actions: FormikHelpers<any>) => {
      console.log(values);
      // actions.setSubmitting(false);
    },
  });


  const handleSubmit = (values: { vendorId?: number | undefined }, { resetForm, setSubmitting }: FormikHelpers<{ vendorId?: number | undefined }>) => {
    console.log('submitvalue', values);
  }
  const { data: vendorsResponse, } = useGetAllVendorsQuery({});
  const { data: productsResponse } = useGetProductsQuery({ limit: 10 });
  console.log(productsResponse);

  const { steps, currentStepIndex, next, back, isFirstStep, isLastStep, step } = useMultistepForm([
    <SelectVendor formik={formik} vendorsList={vendorsResponse?.result.map((vendor) => ({ value: vendor.id, label: vendor.name }))} />,
    <SelectProduct formik={formik} productList={productsResponse?.result.map((product) => ({ value: product.id, label: product.name }))} />,
  ]);

  const handleCreate = (newItem: string) => {
    console.log(newItem);

  };

  return (
    <div className="border border-spacing-1 rounded-md p-4 shadow-lg">
      <Formik
        initialValues={{ vendorId: undefined } as { vendorId?: number | undefined }}
        onSubmit={handleSubmit}
        validationSchema={yup.object({
          vendorId: yup.number().required('Vendor selection is required'),
        })}
      >
        {({ errors, touched, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <FormCreatableSelect
              icon={<Fa42Group/>}
              name="vendorId"
              label="Vendor"
              options={vendorsResponse?.result.map((vendor) => ({ value: vendor.id, label: vendor.name }))}
              onChange={(value) => setFieldValue('vendorId', value)}
              error={errors.vendorId}
              touched={touched.vendorId}
              onCreate={handleCreate}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </Formik>
      {/* <div>
        {currentStepIndex + 1} / {steps.length}
      </div>
      <form onSubmit={formik.handleSubmit}>
        {step}
        <div className="p-4 flex justify-end space-x-2">
          {!isFirstStep && <Button
            onClick={back}
            className="px-4 py-2 bg-indigo-600 text-white hover:cursor-pointer transition-transform transform hover:scale-105 active:scale-100 duration-200 rounded"
          >
            Previous
          </Button>}
          <Button
            onClick={() => {
              if (isLastStep) {
                console.log('formSubmitted');
                formik.handleSubmit();
              } else {
                next();
              }
            }}
            type="button"
            className="z-0 px-4 py-2 bg-indigo-600 text-white hover:cursor-pointer transition-transform transform hover:scale-105 active:scale-100 duration-200 rounded"
          >
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </div>
      </form> */}
    </div>
  );
};

export default AddVendorPurchase;
export type FormikType = ReturnType<typeof import('formik').useFormik<FormValues>>;