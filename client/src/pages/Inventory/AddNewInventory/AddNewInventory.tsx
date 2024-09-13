import { Formik, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import { FaRupeeSign, FaBoxOpen, FaListAlt, MdCategory } from '../../../assets/icons'
import FormInput from '@/components/core/FormInput'
import FormSelect from '@/components/core/FormSelect'
import { Button } from '@/components/ui/button'
import { useGetCategoriesQuery, useCreateProductMutation } from '@/store/slices/productSlice/productApiSlice'
import { successHandler } from '@/utils/successHandler'
import { errorHandler } from '@/components/error/errorHandler'

export interface FormValues {
  name: string;
  category: number | undefined;
  sale_price: number | string;
  quantity: number | string;
}
const AddNewInventory = () => {
  const { data: categoriesResponse } = useGetCategoriesQuery()
  const [addProduct, { isLoading }] = useCreateProductMutation()
  const handleSubmit =async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
    try {
      const response = await addProduct(values).unwrap();
      successHandler(response)
    } catch (err: unknown) {
      setSubmitting(false);
      errorHandler(err)
    } finally {
      resetForm()
      setSubmitting(false);
    }

  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
          Add New Inventory
        </h2>
        <Formik
          initialValues={{
            name: '',
            category: undefined as number | undefined,
            sale_price: '',
            quantity: 0,
          } as FormValues}
          validationSchema={Yup.object({
            category: Yup.number()
              .nullable()
              .required('Category is required'),
            name: Yup.string().required('Name is required'),
            sale_price: Yup.number()
              .required('Sale price is required')
              .min(0, 'Sale price must be greater than or equal to 0'),
            quantity: Yup.number()
              .required('Quantity is required')
              .min(0, 'Quantity must be greater than or equal to 0'),
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
              <FormSelect
                label="Category"
                name="category"
                error={errors.category}
                icon={<MdCategory />}
                touched={touched.category}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category}
                options={categoriesResponse?.result.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
              <FormInput
                label="Name"
                name="name"
                icon={<FaBoxOpen />}
                error={errors.name}
                touched={touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                placeholder="Enter the product name"
              />
              <div className='grid grid-cols-2 gap-4'>
                <FormInput
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
              </div>
              <Button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Inventory'}
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default AddNewInventory
