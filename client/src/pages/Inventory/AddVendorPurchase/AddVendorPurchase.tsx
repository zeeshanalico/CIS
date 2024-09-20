import React, { useState } from 'react'
import SelectorAddVendor from './SelectorAddVendor'
import SelectOrAddProduct from './SelectOrAddProduct'

const AddVendorPurchase = () => {
  const [info, setInfo] = useState<{ product_id: undefined | number, vendor_id: undefined | number }>({ product_id: undefined, vendor_id: undefined });

  const getVendorId = (vendor_id: number | undefined) => {
    setInfo((prevState) => ({ ...prevState, vendor_id }))
  }
  const getProductId = (product_id: number | undefined) => {
    setInfo((prevState) => ({ ...prevState, product_id }))
  }

  console.log(info);
  
  return (
    <div>
      <SelectorAddVendor upliftVendorId={getVendorId} />
      <SelectOrAddProduct upliftProductId={getProductId} />
    </div>
  )
}

export default AddVendorPurchase