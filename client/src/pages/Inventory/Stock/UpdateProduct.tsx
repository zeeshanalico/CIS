import Modal from "@/components/ui/Modal";
import { useFormik, Form } from "formik";
import FormInput from "@/components/core/FormInput";
import * as Yup from "yup";
import { FaRupeeSign, FaBoxOpen } from '../../../assets/icons'
import _ from 'lodash';
export interface UpdateProductFormState { id: number, name: string, sale_price: number }
interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (updatedValues: UpdateProductFormState) => void;//bug in kiosk.user type .it will be like {:user_id,name }
    product: UpdateProductFormState;   
}

const UpdateProduct = ({ isOpen, onClose, onSubmit, product }: Props) => {

    const formik = useFormik({
        initialValues: product,
        onSubmit,
        validationSchema: Yup.object({
            id: Yup.number().required('ID is required'),
            name: Yup.mixed().required('Name is required'),
            sale_price: Yup.number()
                .required('Cost price is required')
                .min(0, 'Cost price must be greater than or equal to 0'),
        }),
        enableReinitialize: true, // Add this line
    })
    
    return (
        <div>
            <Modal title="Update Product" isOpen={isOpen} >
                <form onSubmit={formik.handleSubmit}>
                    <div className="p-4">
                        <FormInput
                            icon={<FaBoxOpen />}
                            label="Product Name"
                            name="name"
                            value={formik.values.name}
                            error={formik.errors.name}
                            touched={formik.touched.name}
                            onChange={formik.handleChange}
                        />
                        <FormInput
                            icon={<FaRupeeSign />}
                            label="Sale Price"
                            name="sale_price"
                            type='number'
                            error={formik.errors.sale_price}
                            touched={formik.touched.sale_price}
                            value={formik.values.sale_price}
                            onChange={formik.handleChange}
                        />

                        <div className="py-4 border-t flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:cursor-pointer transition-transform transform hover:scale-105 active:scale-90 duration-200 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none hover:cursor-pointer transition-transform transform hover:scale-105 active:scale-45 duration-200"
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default UpdateProduct;
