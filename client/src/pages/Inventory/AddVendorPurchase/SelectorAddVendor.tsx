import React from 'react';
import FormCreatableSelect from '@/components/core/FormCreatableSelect';
import { FaStore } from '../../../assets/icons';
import { useGetAllVendorsQuery } from '@/store/slices/vendorSlice/vendorApiSlice';
import { useCreateVendorMutation } from '@/store/slices/vendorSlice/vendorApiSlice';
import { successHandler } from '@/utils/successHandler';
import { errorHandler } from '@/components/error/errorHandler';

interface SelectorAddVendorProps {
    vendorId?: number;
    setVendorId: (id: number | undefined) => void;
    error?: string; // New prop for error
    touched?: boolean; // New prop for touched
}

const SelectorAddVendor: React.FC<SelectorAddVendorProps> = ({ vendorId, setVendorId, error, touched }) => {
    const { data: vendorsResponse } = useGetAllVendorsQuery({});
    const [addVendor] = useCreateVendorMutation();

    const handleCreate = async (newItem: string) => {
        try {
            const response = await addVendor({ name: newItem }).unwrap();
            successHandler(response);
        } catch (err: unknown) {
            errorHandler(err);
        }
    };

    return (
        <div>
            
            <FormCreatableSelect
                icon={<FaStore />}
                name="vendorId"
                placeholder="Create or Select Vendor"
                label="Vendor"
                options={vendorsResponse?.result.map((vendor) => ({ value: vendor.id, label: vendor.name })) || []}
                value={vendorId} // Controlled value
                onChange={(value) => {
                    setVendorId(value as number); // Set selected vendor ID in parent
                }}
                error={error} // Pass error from parent
                touched={touched} // Pass touched state from parent
                onCreate={handleCreate} // Call handleCreate when new vendor is created
            />
        </div>
    );
};

export default SelectorAddVendor;
