import { Link, Outlet } from "react-router-dom"
import { useState } from 'react'
const enum Tab {
    addVendor,
    addVendorPurchase
}

const Layout = () => {
    const [tab, setTab] = useState<Tab>(Tab.addVendor)
    const toggleTab = (tab: Tab) => {
        setTab(tab)
    }

    return (
        <div className=''>
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-400 border-b border-gray-200 mb-3">
                <li className="me-1">
                    <Link onClick={() => toggleTab(Tab.addVendor)} to='/vendor/add-vendor' className={`inline-block p-2 rounded-t-lg  hover:bg-gray-100  ${tab == Tab.addVendor ? 'text-indigo-600 bg-gray-100' : ''}`}>Add Vendor</Link>
                </li>
                <li className="me-1">
                    <Link to={'/vendor/add-purchase'} onClick={() => toggleTab(Tab.addVendorPurchase)} className={`inline-block p-2 rounded-t-lg hover:bg-gray-100 ${tab == Tab.addVendorPurchase ? 'text-indigo-600 bg-gray-100' : ''}`}>Add Vendor Purchase </Link>

                </li>
            </ul>
            <div className='overflow-hidden'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout