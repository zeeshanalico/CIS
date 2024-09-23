import React from 'react';
import { useGetProductsQuery } from '@/store/slices/productSlice/productApiSlice';
import Select from 'react-select';
import { Label } from '@radix-ui/react-label';

interface SelectOrAddProductProps {
    upliftProductId: (id: number | undefined) => void;
    productId?: number; // Controlled value
    error?: string; // New prop for error
    touched?: boolean; // New prop for touched
}

const SelectOrAddProduct: React.FC<SelectOrAddProductProps> = ({
    upliftProductId,
    productId,
    error,
    touched,
}) => {
    const { data: productsResponse } = useGetProductsQuery({});

    return (
        <div className='mb-4'>
              <Label htmlFor={'Select'} className="block mb-1 text-sm font-medium text-gray-700">
                {'Product'}
            </Label>
            <Select
                isSearchable
                className="customize-hover-border "
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        outline: 'none',
                        boxShadow: 'none',
                        border: '1px solid #D1D5DB',
                    }),
                }}
                isClearable
                options={productsResponse?.result.map(({ id, name }) => ({ label: name, value: id })) || []}
                onChange={(product) => upliftProductId(product?.value as unknown as number)}
                value={productId ? { label: productsResponse?.result.find(p => p.id === productId)?.name, value: productId } : null} // Set controlled value
            />
            {error && touched && <p className="mt-2 text-sm text-red-600">{error}</p>} {/* Error handling */}
        </div>
    );
};

export default SelectOrAddProduct;
