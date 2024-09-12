import { lazy, Suspense } from 'react'
import FullPageLoader from '@/components/ui/FullPageLoader'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'

const AddVendor = lazy(() => import('./AddVendor/AddVendor'))
const AddVendorPurchase = lazy(() => import('./AddVendorPurchase/AddVendorPurchase'))

const Vendor = () => {
  return (
    <Suspense fallback={<FullPageLoader />}>
      <Routes>
        <Route  element={<Layout />} >
          <Route path='add-vendor' element={<AddVendor />} />
          <Route path='add-purchase' element={<AddVendorPurchase />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default Vendor