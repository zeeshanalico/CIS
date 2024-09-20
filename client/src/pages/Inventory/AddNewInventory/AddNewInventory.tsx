import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FaRupeeSign, FaListAlt, MdCategory } from '../../../assets/icons';
import FormInput from '@/components/core/FormInput';
import { useState } from 'react';
import FormSelect from '@/components/core/FormSelect';
import { Button } from '@/components/ui/button';
import { useGetCategoriesQuery, useCreateInventoryMutation, useGetProductsQuery } from '@/store/slices/productSlice/productApiSlice';
import { successHandler } from '@/utils/successHandler';
import { errorHandler } from '@/components/error/errorHandler';
import CreatableSelect from 'react-select/creatable';
import { SingleValue } from 'react-select';

export interface FormValues {
  name: string | number; // Can be a string if new, or number if existing
  category: number | undefined;
  sale_price: number | undefined;
  quantity: number | undefined;
  cost_price: number | undefined;
  isNew?: boolean;
}

const AddNewInventory = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isNew, setIsNew] = useState<boolean>(false);

  const { data: categoriesResponse } = useGetCategoriesQuery();
  const [addInventory, { isLoading: addInventoryIsSubmitting }] = useCreateInventoryMutation();
  const { data: productsResponse } = useGetProductsQuery({ category: selectedCategory });

  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
    try {
      console.log(values);

      const response = await addInventory({ ...values, }).unwrap();
      successHandler(response);
      resetForm({
        values: {
          isNew: false,
          name: '',
          category: undefined,
          sale_price: 0,
          cost_price: 0,
          quantity: 0,
        },
      })
    } catch (err: unknown) {
      errorHandler(err);
    } finally {
      setSubmitting(false);
    }
  };
  // console.log('isNew:', values.isNew);
  // console.log('quantity:', values.quantity);

  console.log(isNew);

  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-6">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Add New Inventory
        </h2>
        <Formik
          initialValues={{
            isNew: false,
            name: '',
            category: undefined as number | undefined,
            sale_price: undefined,
            cost_price: undefined,
            quantity: undefined,
          } as FormValues}
          validationSchema={Yup.object({
            category: Yup.number()
              .nullable()
              .required('Category is required'),
            name: Yup.mixed().required('Name is required'),
            quantity: Yup.number()
              .when('$isNew', {
                is: true,
                then: (schema) => schema.required('Quantity is required for new products').min(0, 'Quantity must be greater than or equal to 0'),
                otherwise: (schema) => schema.required('Quantity is required for existing products').min(1, 'Quantity must be greater than 0'),
              }),
            cost_price: Yup.number()
              .required('Cost price is required')
              .min(0, 'Cost price must be greater than or equal to 0'),
            sale_price: Yup.number()
              .min(0, 'Sale price must be greater than or equal to 0')
              .when('$isNew', {
                is: true,
                then: (schema) => schema.required('Sale price is required for new products'),
                otherwise: (schema) => schema.optional(),
              }),
          })}
          onSubmit={handleSubmit}
          context={{ isNew }} // Passed external state to context
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            isSubmitting,

          }) => (
            <form onSubmit={handleSubmit}>
              <FormSelect
                label="Category"
                name="category"
                error={errors.category}
                icon={<MdCategory />}
                touched={touched.category}
                onChange={(e) => {
                  setFieldValue('category', e.target.value);
                  setSelectedCategory(Number(e.target.value)); // update selected category for products query
                }}
                onBlur={handleBlur}
                value={values.category}
                options={categoriesResponse?.result.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />

              {/* CreatableSelect for Product Name */}
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>

              <CreatableSelect
                isClearable
                className="focus:border-0 mb-2"
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: state.isFocused ? 'red' : 'grey',
                    outline: 'none',
                    boxShadow: 'none',
                    border: '1px solid #D1D5DB',
                  }),
                }}
                name="name"
                value={values.name
                  ? productsResponse?.result
                    .map((product) => ({
                      value: product.id,
                      label: product.name as string,
                    }))
                    .find((product) => product.value === values.name) || { label: values.name as string, value: values.name }
                  : null
                }
                onChange={(option: SingleValue<{ value: number | string; label: string; __isNew__?: boolean | undefined }>) => {
                  setFieldValue('isNew', option?.__isNew__ ? true : false);
                  if (option?.__isNew__) {
                    setIsNew(true);
                    setFieldValue('name', option.label);
                  } else {
                    setIsNew(false);
                    setFieldValue('name', option?.value);
                  }
                }}
                onBlur={handleBlur}
                options={productsResponse?.result.map((product) => ({
                  value: product.id,
                  label: product.name,
                }))}
              />

              <FormInput
                label="Quantity"
                name="quantity"
                icon={<FaListAlt />}
                error={errors.quantity}
                touched={touched.quantity}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.quantity}
                placeholder="Enter the quantity"
                type="number"
              />

              <div className={`${isNew ? 'flex flex-row justify-between gap-2' : null}`}>
                <FormInput
                  label="Cost per Item"
                  name="cost_price"
                  icon={<FaRupeeSign />}
                  error={errors.cost_price}
                  touched={touched.cost_price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.cost_price}
                  placeholder="Enter the cost price"
                  type="number"
                />
                {isNew && <FormInput
                  label="Sale Price"
                  name="sale_price"
                  icon={<FaRupeeSign />}
                  error={errors.sale_price}
                  touched={touched.sale_price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.sale_price}
                  placeholder="Enter the sale price"
                  type="number"
                />}
              </div>

              <Button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                {addInventoryIsSubmitting || isSubmitting ? 'Creating...' : 'Create Inventory'}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddNewInventory;
