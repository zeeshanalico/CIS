import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import { FormikType } from './endorPurchase';
import { BsFillTelephoneFill, FaStore } from "../../../assets/icons";
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import FormInput from '@/components/core/FormInput';
import { successHandler } from '@/utils/successHandler';
import { errorHandler } from '@/components/error/errorHandler';
import { useCreateVendorMutation, useGetAllVendorsQuery } from '@/store/slices/vendorSlice/vendorApiSlice';
import { Vendor } from '@/types/Vendor';

interface VendorOption {
    value: number;
    label: string;
}

// interface FormValues {
//     vendor_name: string;
//     vendor_contact_info: string;
// }

// const validationSchema = yup.object({
//     vendor_name: yup.string().required('Name is required'),
//     vendor_contact_info: yup
//         .string()
//         .nullable()
//         .transform((value, originalValue) => (originalValue.trim() === '' ? undefined : value)),
// });

const SelectVendor = ({ formik, vendorsList }: { formik: FormikType, vendorsList: VendorOption[] | undefined }) => {
    // const [isModalOpen, setModalOpen] = useState(false);

    // const toggleModal = () => {
    //     setModalOpen(!isModalOpen);
    // };

    // const [createVendor, { isLoading }] = useCreateVendorMutation();

    // const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
    //     try {
    //         const payload = {
    //             contact_info: values.vendor_contact_info || undefined,
    //             name: values.vendor_name,
    //         };

    //         const response = await createVendor(payload).unwrap();
    //         successHandler(response);
    //         refetch(); // Refresh the vendor options after adding a new one
    //         toggleModal(); // Close modal
    //     } catch (err: unknown) {
    //         errorHandler(err);
    //     } finally {
    //         setSubmitting(false);
    //         resetForm();
    //     }
    // };

    // const modalFormik = useFormik({
    //     initialValues: {
    //         vendor_name: '',
    //         vendor_contact_info: '',
    //     },
    //     validationSchema,
    //     onSubmit: handleSubmit,
    // });

    return (
        <>
            <h3 className="text-lg font-bold mb-2 ">Select Vendor</h3>
            <Select
                className="basic-single"
                classNamePrefix="select"
                value={vendorsList?.find((option) => option.value === formik.values.vendorId) || null}
                isSearchable
                options={vendorsList}
                onChange={(value) => {
                    if (value) {
                        formik.setFieldValue('vendorId', (value as VendorOption).value);
                    }
                }}
                // onCreateOption={toggleModal}
                placeholder="Select or Create Vendor"
            />

            {/* {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <form
                        onSubmit={modalFormik.handleSubmit}
                        className="z-44 bg-white p-4 rounded shadow-lg"
                    >
                        <FormInput
                            label="Vendor Name"
                            name="vendor_name"
                            icon={<FaStore />}
                            error={modalFormik.errors.vendor_name}
                            touched={modalFormik.touched.vendor_name}
                            onChange={modalFormik.handleChange}
                            onBlur={modalFormik.handleBlur}
                            value={modalFormik.values.vendor_name}
                            placeholder="Enter the vendor name"
                        />
                        <FormInput
                            label="Contact Details"
                            name="vendor_contact_info"
                            icon={<BsFillTelephoneFill />}
                            error={modalFormik.errors.vendor_contact_info}
                            touched={modalFormik.touched.vendor_contact_info}
                            onChange={modalFormik.handleChange}
                            onBlur={modalFormik.handleBlur}
                            value={modalFormik.values.vendor_contact_info}
                            placeholder="Enter the contact details"
                        />

                        <div className="py-4 border-t flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={toggleModal}
                                className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:cursor-pointer transition-transform transform hover:scale-110 active:scale-90 duration-200 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none hover:cursor-pointer transition-transform transform hover:scale-110 active:scale-45 duration-200"
                                disabled={modalFormik.isSubmitting}
                            >
                                {modalFormik.isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            )} */}
        </>
    );
};

export default React.memo(SelectVendor);
