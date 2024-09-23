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
import { RoutesEnum } from "@/App";
const UserSidebar = () => {
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
        <div className="w-full">
            <div className="flex flex-col flex-1 h-screen ">
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
                            <li onClick={() => toggleSidebar()}><Link to={RoutesEnum.USER_DASHBOARD} className="block py-2 px-4 rounded hover:bg-indigo-500">Dashboard</Link></li>
                            <li onClick={() => toggleSidebar()}><Link to={`${RoutesEnum.INVENTORY}/${RoutesEnum.ADD_NEW_INVENTORY}`} className="block py-2 px-4 rounded hover:bg-indigo-500">Inventory</Link></li>
                            <li onClick={() => toggleSidebar()}><Link to={`${RoutesEnum.SALE}`} className="block py-2 px-4 rounded hover:bg-indigo-500">Sale</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex-1 flex flex-col overflow-x-visible">
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
                    <main className="flex-1 p-4 bg-gray-50 scrollbar-style overflow-x-visible ">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>

    );
};

export default UserSidebar;
