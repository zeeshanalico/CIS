import React, { ReactNode } from 'react';

interface CartButtonProps {
    itemCount: number;
    onClick?: () => void;
    icon: ReactNode
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount, onClick, icon }) => {
    return (
        <button
            className="relative gap-2 inline-flex items-center justify-center p-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
            onClick={onClick}
        >
            <span className="items-center  text-white ">
                {icon}
            </span>
            <span className="material-icons">Shopping cart</span>
            {itemCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 opacity-85 text-white text-xs font-bold rounded-full px-2 py-1">
                    {itemCount}
                </span>
            )}
        </button>
    );
};

export default CartButton;
