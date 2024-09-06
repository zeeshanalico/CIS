import React, { useState } from "react";
import { FaBars, FaTimes, FaSignOutAlt } from '../assets/icons'
import { useLogoutMutation } from "@/store/slices/authSlice/authApiSlice";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom"
import { clearCredentials } from "@/store/slices/authSlice/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [logout, { isLoading: logoutLoading }] = useLogoutMutation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { title } = useSelector((state: RootState) => state.global);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            dispatch(clearCredentials());
            navigate('/login', { replace: true })
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.log(err.message);
                return;
            }
            console.error('Failed to logout:', err);
        }
    }

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
                        <li onClick={() => toggleSidebar()}><Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-indigo-500">Dashboard</Link></li>
                        <li onClick={() => toggleSidebar()}><Link to="kiosk" className="block py-2 px-4 rounded hover:bg-indigo-500">Kiosk</Link></li>
                        <li onClick={() => toggleSidebar()}><Link to="user" className="block py-2 px-4 rounded hover:bg-indigo-500">User</Link></li>
                        <li onClick={() => toggleSidebar()}><Link to="#" className="block py-2 px-4 rounded hover:bg-indigo-500">Logout</Link></li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="w-full flex items-center justify-between sticky bg-indigo-700 text-white p-4">
                    <button
                        onClick={toggleSidebar}
                        className="text-2xl focus:outline-none"
                    >
                        <FaBars />
                    </button>
                    <p>{title}</p>
                    <button
                        onClick={handleLogout}
                        className="text-2xl focus:outline-none "
                    >
                        <FaSignOutAlt />
                    </button>
                </header>

                <main className="flex-1 p-4 bg-gray-50 scrollbar-style">
                    <Outlet />
                </main>
            </div>
        </div>

    );
};

export default Sidebar;
