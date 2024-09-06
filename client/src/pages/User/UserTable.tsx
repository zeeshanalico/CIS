import React, { useRef, useState, useEffect } from 'react';
import { useGetAllUsersQuery } from '@/store/slices/userSlice/userApiSlice';
import { motion } from 'framer-motion';  // Import Framer Motion

enum Tab {
    addVendor = 'addVendor',
    addVendorPurchase = 'addVendorPurchase',
}

const UserTable = () => {
    const [activeTab, setActiveTab] = useState<Tab>(Tab.addVendor);

    const addVendorRef = useRef<HTMLButtonElement | null>(null);
    const addVendorPurchaseRef = useRef<HTMLButtonElement | null>(null);

    const toggleTab = (tab: Tab) => {
        setActiveTab(tab);
    };

    // Framer Motion handles the dynamic positioning and size changes without manually calculating offsets
    const { data } = useGetAllUsersQuery();
    console.log(data);

    return (
        <div className="p-4 shadow-md bg-white rounded-sm flex flex-col mt-4">
            <div className="relative z-10 flex items-center gap-1 w-fit rounded-lg border border-stroke bg-white p-1">

                <motion.div
                    className="absolute top-0 bottom-0 m-1 bg-gray-100 rounded-md"
                    layout
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                        width: activeTab === Tab.addVendor ? addVendorRef.current?.offsetWidth : addVendorPurchaseRef.current?.offsetWidth,
                        left: activeTab === Tab.addVendor ? addVendorRef.current?.offsetLeft : addVendorPurchaseRef.current?.offsetLeft,
                    }}
                ></motion.div>

                <button
                    ref={addVendorRef}
                    onClick={() => toggleTab(Tab.addVendor)}
                    className={`relative z-10 inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium duration-200 ${
                        activeTab === Tab.addVendor ? 'text-gray-600' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                >
                    Add Vendor
                </button>

                {/* Add Vendor Purchase Button */}
                <button
                    ref={addVendorPurchaseRef}
                    onClick={() => toggleTab(Tab.addVendorPurchase)}
                    className={`relative z-10 inline-flex h-8 items-center justify-center rounded-md px-3 text-sm font-medium duration-200 ${
                        activeTab === Tab.addVendorPurchase ? 'text-gray-600' : 'text-gray-400 hover:bg-gray-100'
                    }`}
                >
                    Add Vendor Purchase
                </button>
            </div>

            <p className="font-bold text-lg mt-4">Available Users</p>
            {/* Display data here */}
        </div>
    );
};

export default UserTable;
