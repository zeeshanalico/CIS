import React from 'react';
import FormCreatableSelect from '@/components/core/FormCreatableSelect';
import { FaStore } from '../../../assets/icons';
import { useGetAllVendorsQuery } from '@/store/slices/vendorSlice/vendorApiSlice';
import { useFormik, FormikHelpers } from 'formik';
import { useCreateVendorMutation } from '@/store/slices/vendorSlice/vendorApiSlice';
import { successHandler } from '@/utils/successHandler';
import { errorHandler } from '@/components/error/errorHandler';


const SelectorAddVendor = ({ upliftVendorId }: { upliftVendorId: (id: number | undefined) => void }) => {
    const { data: vendorsResponse } = useGetAllVendorsQuery({});
    const [addVendor] = useCreateVendorMutation()
    const handleCreate = async (newItem: string) => {
        try {
            const response = await addVendor({ name: newItem }).unwrap();

            successHandler(response)
        } catch (err: unknown) {
            errorHandler(err)
        }

    };

    const formik = useFormik({
        initialValues: {
            vendorId: undefined,
        } as { vendorId?: number | undefined },
        onSubmit: (values: { vendorId?: number | undefined }, { setSubmitting }: FormikHelpers<{ vendorId?: number | undefined }>) => {
            upliftVendorId(values.vendorId); // Uplift vendorId on submit
            setSubmitting(false);
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <FormCreatableSelect
                    icon={<FaStore />}
                    name="vendorId"
                    placeholder='Create or Select Vendor'
                    label="Vendor"
                    options={vendorsResponse?.result.map((vendor) => ({ value: vendor.id, label: vendor.name }))}
                    onChange={(value) => {
                        formik.setFieldValue('vendorId', value); // Set selected vendor ID
                        upliftVendorId(value as number); // Uplift vendorId when selected
                    }}
                    error={formik.errors.vendorId}
                    touched={formik.touched.vendorId}
                    onCreate={handleCreate} // Call handleCreate when new vendor is created
                />
            </form>
        </div>
    );
};

export default SelectorAddVendor;
