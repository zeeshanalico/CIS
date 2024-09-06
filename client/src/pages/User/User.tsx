import CreateUser from '@/components/form/CreateUser';
import { useState } from 'react';
import UserTable from './UserTable';

const User = () => {
    const [allUsers, setAllUsers] = useState<boolean>(false); 
    return (
        <div>
            <div className="relative ml-auto text-gray-500 flex gap-2 justify-between bg-white rounded-lg border p-1 w-fit">
                <span
                    className={`absolute top-0 bottom-0 left-0  w-1/2 h-full rounded-lg bg-gray-200 transition-transform duration-300 ${allUsers ? 'translate-x-full' : 'translate-x-0'
                        }`}
                ></span>

                <button
                    onClick={() => setAllUsers(false)}
                    className={`relative z-10 rounded-lg px-3 py-1 transition-all ${!allUsers ? 'text-black' : 'text-gray-500'}`}
                >
                    Create User
                </button>

                <button
                    onClick={() => setAllUsers(true)}
                    className={`relative z-10 rounded-lg px-3 py-1 transition-all ${allUsers ? 'text-black' : 'text-gray-500'
                        }`}
                >
                    All Users
                </button>
            </div>

            {/* Conditionally Render Components */}
            {!allUsers ? <CreateUser /> : <UserTable />}
        </div>
    );
};

export default User;
