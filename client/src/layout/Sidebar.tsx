import React, { useState } from "react";
import { FaBars, FaTimes } from '../assets/icons'
import { Outlet } from "react-router-dom"

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-indigo-600  text-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 ease-in-out`}
            >
                <div className="p-4 flex flex-col">
                    <button
                        onClick={toggleSidebar}
                        className="text-2xl focus:outline-none ms-auto"
                    >
                        <FaTimes />
                    </button>
                    <ul className="mt-6 space-y-2">
                        <li><a href="#" className="block py-2 px-4 rounded hover:bg-indigo-500">Dashboard</a></li>
                        <li><a href="#" className="block py-2 px-4 rounded hover:bg-indigo-500">Profile</a></li>
                        <li><a href="#" className="block py-2 px-4 rounded hover:bg-indigo-500">Settings</a></li>
                        <li><a href="#" className="block py-2 px-4 rounded hover:bg-indigo-500">Logout</a></li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="flex items-center justify-between bg-indigo-700 text-white p-4">
                    <button
                        onClick={toggleSidebar}
                        className="text-2xl focus:outline-none"
                    >
                        <FaBars />
                    </button>
                    {/* <h1 className="text-xl font-semibold">Header</h1> */}
                </header>

                <main className="flex-1 p-6 bg-gray-50">
                    {/* <h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h2>
                    <p>Your content goes here...</p> */}
                    <Outlet />
                </main>
            </div>
        </div>

    );
};

export default Sidebar;
