import React, { ReactNode } from 'react';

interface CartButtonProps {
    itemCount: number;
    onClick?: () => void;
    icon: ReactNode
    disabled: boolean
}

const CartButton: React.FC<CartButtonProps> = ({ itemCount, onClick, icon, disabled }) => {
    return (
        <button
            className={`ml-2 ${disabled ? 'bg-indigo-500 hover:bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-700'} relative gap-2 text-nowrap inline-flex items-center justify-center p-2  text-white rounded-md  transition duration-200`}
            onClick={onClick}
            disabled={disabled}

        >
            <span className="items-center text-white ">
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
