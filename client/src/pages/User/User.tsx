import CreateUser from '@/components/form/CreateUser';
import { useState } from 'react';
import UserTable from './UserTable';
const enum Tab {
    addNewUser,
    existedUsers
}
const User = () => {
    const [tab, setTab] = useState<Tab>(Tab.addNewUser)
    const toggleTab = (tab: Tab) => {
        setTab(tab)
    }
    return (
        <div className=''>
            <ul className="flex flex-wrap text-sm font-medium text-center text-gray-400 border-b border-gray-200 mb-3">
                <li className="me-1">
                    <button onClick={() => toggleTab(Tab.addNewUser)} className={`inline-block p-2 rounded-t-lg  hover:bg-gray-100  ${tab==Tab.addNewUser ? 'text-indigo-600 bg-gray-100' : ''}`}>Add New</button>
                </li>
                <li className="me-1">
                    <button onClick={() => toggleTab(Tab.existedUsers)} className={`inline-block p-2 rounded-t-lg hover:bg-gray-100 ${tab==Tab.existedUsers ? 'text-indigo-600 bg-gray-100' : ''}`}>Existed Users</button>
                </li>
            </ul>
            {tab===Tab.addNewUser ? <CreateUser/> : <UserTable/>}
        </div>

    );
};

export default User;
