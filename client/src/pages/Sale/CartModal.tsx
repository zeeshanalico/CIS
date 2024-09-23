import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Modal from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const CartModal = ({ isOpen, toggleModal }: { isOpen: boolean, toggleModal: () => void }) => {
    const { selectedProducts } = useSelector((state: RootState) => state.productSlice.sale);

    const formik = useFormik({
        initialValues: {
            units: selectedProducts.map(() => 1), // Default quantity for each product
        },
        validationSchema: Yup.object({
            units: Yup.array().of(Yup.number().min(1, 'Quantity must be at least 1')),
        }),
        onSubmit: (values) => {
            console.log('Checkout values:', values);
            toggleModal();
        },
    });

    const handleIncrement = (index: number) => {
        const newUnits = [...formik.values.units];
        newUnits[index] += 1;
        formik.setFieldValue('units', newUnits);
    };

    const handleDecrement = (index: number) => {
        const newUnits = [...formik.values.units];
        if (newUnits[index] > 1) {
            newUnits[index] -= 1;
            formik.setFieldValue('units', newUnits);
        }
    };

    const calculateTotal = () => {
        return selectedProducts.reduce((total: number, product, index) => {
            return total + (product.sale_price || 0) * (formik.values.units[index] || 0);
        }, 0);
    };

    return (
        <Modal
            className="p-4"
            isOpen={isOpen}
            title='Your Cart'>
            <form onSubmit={formik.handleSubmit}>
                <div className="overflow-y-auto max-h-60 scrollbar-style"> {/* Set a max height and enable vertical scrolling */}
                    
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th className='border p-2'>Product</th>
                                <th className='border p-2'>Units</th>
                                <th className='border p-2'>Unit Price</th>
                                <th className='border p-2'>Total Price</th>
                                <th className='border p-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedProducts.map((product, index) => (
                                <tr key={product.id}>
                                    <td className='border p-2'>{product.name}</td>
                                    <td className='border p-2'>
                                        <div className='flex items-center'>
                                            <Button type='button' onClick={() => handleDecrement(index)}>-</Button>
                                            <input
                                                type='number'
                                                value={formik.values.units[index]}
                                                readOnly
                                                className='w-12 text-center mx-2 border'
                                            />
                                            <Button type='button' onClick={() => handleIncrement(index)}>+</Button>
                                        </div>
                                    </td>
                                    <td className='border p-2'>{product.sale_price} PKR</td>
                                    <td className='border p-2'>{(product.sale_price * formik.values.units[index]).toFixed(2)} PKR</td>
                                    <td className='border p-2'>
                                        <Button type='button' onClick={() => {/* Add remove product logic here */ }}>Remove</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='mt-4'>
                    <h2 className='text-lg font-semibold'>Total: {calculateTotal().toFixed(2)} PKR</h2>
                </div>
                <Button type='submit' className='mt-4'>Checkout</Button>
            </form>
        </Modal>
    );
};

export default CartModal;
