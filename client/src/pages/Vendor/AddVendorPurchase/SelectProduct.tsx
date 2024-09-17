import React from 'react';
import Select from 'react-select';
import { FormikType } from './AddVendorPurchase';

interface VendorOption {
    value: number;
    label: string;
}

const SelectProduct = ({ formik, productList }: { formik: FormikType, productList: VendorOption[] | undefined }) => {
    return (
        <>
            <h3 className="text-lg font-bold mb-2">Select Product</h3>
            <Select
                className="basic-single"
                classNamePrefix="select"
                onBlur={formik.handleBlur}
                value={productList?.find((option) => option.value === formik.values.productId) || null}
                isSearchable
                options={productList}
                onChange={(value) => {
                    if (value) {
                        formik.setFieldValue('productId', (value as VendorOption).value);
                    }
                }}
                placeholder="Select or Create Product"
            />
            {formik.errors.productId && formik.touched.productId && (
                <p className="mt-2 text-sm text-red-600">{formik.errors.productId}</p>
            )}
            {/* qty, cost-price,purchase_date, amount */}


        </>
    );
};

export default React.memo(SelectProduct);
