import React from 'react'
import { useGetProductsQuery } from '@/store/slices/productSlice/productApiSlice'
import Select from 'react-select';

const SelectOrAddProduct = ({ upliftProductId }: { upliftProductId: (id: number | undefined) => void }) => {
    const { data: productsResponse } = useGetProductsQuery({});

    return (
        <div>
            <Select
                isSearchable
                className="customize-hover-border"
                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        outline: 'none',
                        boxShadow: 'none',
                        border: '1px solid #D1D5DB',
                    }),
                }}
                isClearable
                options={productsResponse?.result.map(({ id, name }) => { return { label: name, value: id } })}
                onChange={product => upliftProductId(product?.value as unknown as number)}
            />
        </div>
    )
}

export default SelectOrAddProduct