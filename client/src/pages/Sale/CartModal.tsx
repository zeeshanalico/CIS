import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '@/components/ui/Modal';
import { clearCart, CartProduct, getCartFromLocalStorage } from '@/store/slices/productSlice/productSlice';
import { useDispatch } from 'react-redux';
import { FaDeleteLeft } from '../../assets/icons';
import { MdDiscount } from '../../assets/icons';
import { Label } from '@radix-ui/react-label';
import FormInput from '@/components/core/FormInput';
import Select from 'react-select';
import { useGetAllCustomersQuery } from '@/store/slices/customerSlice/customerSlice';

const CartModal = ({ isOpen, toggleModal }: { isOpen: boolean; toggleModal: () => void }) => {
    const { data: customerResponse } = useGetAllCustomersQuery({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (isOpen) {
            formik.setFieldValue('cartProducts', getCartFromLocalStorage()); // Sync when modal opens
        }
    }, [isOpen]);

    const syncLocalStorage = (cartProducts: CartProduct[]) => {
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    };

    const calculateSubtotal = (): number => {
        return formik.values.cartProducts.reduce((total, product) => {
            return total + (product.sale_price || 0) * product.units;
        }, 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const discount = formik.values.discount || 0;
        return subtotal - discount;
    };

    const formik = useFormik({
        initialValues: {
            cartProducts: getCartFromLocalStorage(),
            discount: 0,
            customer: null,
        },
        validationSchema: Yup.object().shape({
            cartProducts: Yup.array().of(
                Yup.object().shape({
                    units: Yup.number().min(1, 'Quantity must be at least 1').required('Units are required'),
                })
            ),
            discount: Yup.number().min(0, 'Discount cannot be negative'),
            customer: Yup.object().nullable().required('Customer selection is required'),
        }),
        onSubmit: (values) => {
            const subtotal = calculateSubtotal();
            const total = calculateTotal();

            console.log('Checkout values:', {
                ...values,
                subtotal,
                total,
            });

            dispatch(clearCart());
            localStorage.removeItem('cartProducts');
        },
    });

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const discountValue = Number(e.target.value);
        const subtotal = calculateSubtotal();

        if (discountValue > subtotal) {
            formik.setFieldError('discount', 'Discount cannot exceed subtotal');
        } else {
            formik.setFieldValue('discount', discountValue);
        }
    };

    useEffect(() => {
        syncLocalStorage(formik.values.cartProducts);
    }, [formik.values.cartProducts]);

    const handleIncrement = (index: number) => {
        const updatedProducts = [...formik.values.cartProducts];
        updatedProducts[index].units += 1;
        formik.setFieldValue('cartProducts', updatedProducts);
    };

    const handleDecrement = (index: number) => {
        const updatedProducts = [...formik.values.cartProducts];
        if (updatedProducts[index].units > 1) {
            updatedProducts[index].units -= 1;
            formik.setFieldValue('cartProducts', updatedProducts);
        }
    };

    const handleDelete = (product: CartProduct) => {
        const updatedProducts = formik.values.cartProducts.filter((p) => p.id !== product.id);
        formik.setFieldValue('cartProducts', updatedProducts);
    };

    return (
        <Modal className="p-6 m-6 rounded-lg" isOpen={isOpen} title="Your Cart">
            <form onSubmit={formik.handleSubmit}>
                <div className="max-h-60 overflow-y-auto scrollbar-style mb-6">
                    <table className="w-full border-collapse text-left">
                        <thead className="border-b-2">
                            <tr>
                                <th className="p-2"></th>
                                <th className="p-2">Product</th>
                                <th className="p-2 text-center">Units</th>
                                <th className="p-2 text-center">Unit Price</th>
                                <th className="p-2 text-center">Total Price</th>
                                <th className="p-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {formik.values.cartProducts.map((product, index) => (
                                <tr key={product.id} className="border-b">
                                    <td className="p-2">{index + 1}.</td>
                                    <td className="p-2">{product.name}</td>
                                    <td className="p-2 text-center">
                                        <div className="flex justify-center items-center">
                                            <button
                                                type="button"
                                                className="px-3 py-1 border hover:bg-gray-100"
                                                onClick={() => handleDecrement(index)}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                readOnly
                                                value={formik.values.cartProducts[index].units}
                                                className="w-12 mx-2 text-center border"
                                            />
                                            <button
                                                type="button"
                                                className="px-3 py-1 border hover:bg-gray-100"
                                                onClick={() => handleIncrement(index)}
                                                disabled={product.quantity <= formik.values.cartProducts[index].units}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="text-center p-2">{product.sale_price} PKR</td>
                                    <td className="text-center p-2">
                                        {(product.sale_price * product.units).toFixed(2)} PKR
                                    </td>
                                    <td className="p-2 text-center">
                                        <FaDeleteLeft
                                            className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-800"
                                            onClick={() => handleDelete(product)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col gap-4">
                    <FormInput
                        label="Discount"
                        name="discount"
                        type="number"
                        icon={<MdDiscount />}
                        error={formik.errors.discount}
                        touched={formik.touched.discount}
                        onChange={handleDiscountChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.discount}
                        placeholder="Enter discount"
                        min={0}
                    />

                    <div className="w-full">
                        <Label htmlFor="customer" className="block mb-1 text-sm font-medium text-gray-700">
                            Select Customer:
                        </Label>
                        <Select
                            id="customer"
                            value={formik.values.customer}
                            className="customize-hover-border"
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    borderColor: state.isFocused ? 'red' : 'grey',
                                    outline: 'none',
                                    boxShadow: 'none',
                                    border: '1px solid #D1D5DB',
                                }),
                            }}
                            onChange={(value) => formik.setFieldValue('customer', value)}
                            options={customerResponse?.result.map((customer) => ({
                                value: customer.id,
                                label: customer.name,
                            }))}
                            onBlur={formik.handleBlur}
                            isClearable
                        />
                        {formik.touched.customer && formik.errors.customer && (
                            <div className="text-red-500">{formik.errors.customer}</div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-6">
                    <h2 className="text-lg font-semibold">Subtotal: {calculateSubtotal().toFixed(2)} PKR</h2>
                    <h2 className="text-lg font-semibold">Total: {calculateTotal().toFixed(2)} PKR</h2>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={toggleModal}
                        className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 rounded"
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            dispatch(clearCart());
                            localStorage.removeItem('cartProducts');
                        }}
                        className="px-4 py-2 bg-gray-950 text-white hover:bg-black rounded"
                    >
                        Clear Cart
                    </button>
                    <button type="submit" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
                        Checkout
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default CartModal;
