import React from 'react';
import { FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import SelectorAddVendor from './SelectorAddVendor';
import { Button } from '@/components/ui/button';
import SelectOrAddProduct from './SelectOrAddProduct';
import FormInput from '@/components/core/FormInput';
import { FaRupeeSign, FaListAlt, MdCategory } from '../../../assets/icons'
import { useAddVendorPurchaseMutation } from '@/store/slices/vendorPurchase/vendorPurchaseApiSlice';
import { successHandler } from '@/utils/successHandler';
import { errorHandler } from '@/components/error/errorHandler';

export interface AddVendorPurchaseFormState {
  vendorId: undefined | number;
  productId: undefined | number;
  qty: undefined | number;
  cost_price: undefined | number;
}
const ParentComponent = () => {
  const [addVendorPurchase] = useAddVendorPurchaseMutation()
  const formik = useFormik({
    initialValues: {
      vendorId: undefined,
      productId: undefined,
      qty: undefined,
      cost_price: undefined
    },
    validationSchema: Yup.object({
      vendorId: Yup.number().required('Please select the vendor.'),
      productId: Yup.number().required('Please select the product.'), // Validation for productId
      qty: Yup.number().required('Quantity is required for existing products').min(1, 'Quantity must be greater than 0'),
      cost_price: Yup.number().required('Cost price is required').min(0, 'Cost price must be greater than or equal to 0'),


    }),

    onSubmit: async (values, { setSubmitting, resetForm }: FormikHelpers<AddVendorPurchaseFormState>) => {
      console.log('Form submitted with:', values);
      try {
        const response = await addVendorPurchase(values).unwrap();
        successHandler(response)
      } catch (err: unknown) {
        setSubmitting(false);
        errorHandler(err)
      } finally {
        resetForm()
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      {/* <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Add Vendor Purchase
        </h2> */}
      <form onSubmit={formik.handleSubmit}>
        <SelectorAddVendor
          vendorId={formik.values.vendorId}
          setVendorId={(id) => formik.setFieldValue('vendorId', id)}
          error={formik.errors.vendorId}
          touched={formik.touched.vendorId}
        />
        <SelectOrAddProduct
          productId={formik.values.productId} 
          upliftProductId={(id) => formik.setFieldValue('productId', id)} 
          error={formik.errors.productId} 
          touched={formik.touched.productId} 
        />
        <FormInput
          label="Quantity"
          name="qty"
          icon={<FaListAlt />}
          error={formik.errors.qty}
          touched={formik.touched.qty}
          onChange={formik.handleChange}
          type='number'
          onBlur={formik.handleBlur}
          value={formik.values.qty}
          placeholder="Enter the Quantity"
        />
        <FormInput
          label="Cost Price"
          name="cost_price"
          type='number'
          icon={<FaRupeeSign />}
          error={formik.errors.cost_price}
          touched={formik.touched.cost_price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.cost_price}
          placeholder="Enter the cost per item"
        />

        <Button className='w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500' type="submit" >Submit</Button>
      </form>
    </div>
  );
};

export default ParentComponent;
