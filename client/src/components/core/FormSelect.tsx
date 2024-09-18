import { FaExclamationCircle } from "../../assets/icons";
import { SelectHTMLAttributes, useState } from "react";
import { IoChevronUp } from "react-icons/io5";
import React from "react";

interface FormSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    label: string;
    name: string;
    icon: React.ReactNode;
    error?: string;
    touched?: boolean;
    options?: { value: string | number; label: string; color?: string }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Correctly define onChange
}

const FormSelect: React.FC<FormSelectProps> = ({
    label,
    name,
    icon,
    error,
    touched,
    options = [],
    onChange,
    value, 
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value: string | number) => {
        onChange({ target: { name, value } } as React.ChangeEvent<HTMLSelectElement>); // Trigger onChange with correct value
        setIsOpen(false);
    };

    return (
        <div className="relative mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`relative cursor-pointer border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm bg-white pl-10 py-2 transition ease-in-out duration-150`}
            >
                <div className="flex justify-between items-center pe-2">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        {icon}
                    </span>
                    <span className="text-gray-700">
                        {options.find(option => option.value === value)?.label || 'Select an option'}
                    </span>
                    <IoChevronUp className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                {isOpen && (
                    <ul className="absolute max-h-40 overflow-y-scroll scrollbar-style left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        {options.map((option, index) => (
                            <li
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                data-value={option.value} // Use data-value to store the option value
                                className={`p-2 text-gray-700 cursor-pointer hover:bg-indigo-500 hover:text-white hover:rounded-md transition ease-in-out duration-150 ${option.color ? `text-${option.color}` : ''}`}
                            >
                                {`${++index}. ${option.label}`}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {error && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                    {/* <FaExclamationCircle className="mr-1" /> */}
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormSelect;
