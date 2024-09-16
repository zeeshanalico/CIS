import { useState } from 'react';
import { useMultistepForm } from '@/components/hooks/useMultipleForm';
import { Button } from '@/components/ui/button';
import SelectVendor from './SelectVendor';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';

interface FormValues {
  vendorId?: number | undefined;
  vendor_name?: string;
  vendor_contact_info?: string;
  productId: string;
  quantity: number;
  costPrice: number;
  purchaseId: string;
}

const validationSchema = yup.object({
  vendorId: yup.string().required('Vendor selection is required'),
  vendor_name: yup.string().required('Vendor name is required'),
  productId: yup.string().required('Product selection is required'),
  quantity: yup.number().required('Quantity is required').min(1, 'Quantity must be at least 1'),
  costPrice: yup.number().required('Cost price is required').min(0, 'Cost price must be at least 0'),
  purchaseId: yup.string().required('Purchase ID is required'),
});

const AddVendorPurchase = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      vendorId: undefined,
      vendor_contact_info: '',
      vendor_name: '',
      productId: '',
      quantity: 0,
      costPrice: 0,
      purchaseId: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values: FormValues, actions: FormikHelpers<any>) => {
      console.log(values);
      actions.setSubmitting(false);
    },
  });

  const { steps, currentStepIndex, next, back, isFirstStep, goTo, isLastStep, step } = useMultistepForm([
    <SelectVendor formik={formik} />,
    <div>Two</div>,
    <div>Three</div>,
  ]);

  return (
    <div className="border border-spacing-1 rounded-md p-4 shadow-lg">
      <div>
        {currentStepIndex + 1} / {steps.length}
      </div>
      <form onSubmit={formik.handleSubmit}>
        {step}
        <div className="p-4 flex justify-end space-x-2">
          {!isFirstStep && (
            <Button
              onClick={back}
              className="px-4 py-2 bg-indigo-600 text-white hover:cursor-pointer transition-transform transform hover:scale-105 active:scale-100 duration-200 rounded"
            >
              Previous
            </Button>
          )}
          <Button
            onClick={next}
            type="submit"
            className="z-0 px-4 py-2 bg-indigo-600 text-white hover:cursor-pointer transition-transform transform hover:scale-105 active:scale-100 duration-200 rounded"
          >
            {isLastStep ? 'Finish' : 'Next'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddVendorPurchase;
export type FormikType = ReturnType<typeof import('formik').useFormik<FormValues>>;
