import React from "react";
import Select, { MultiValue, ActionMeta } from "react-select";
import { FaExclamationCircle } from "../../assets/icons";

interface FormMultiSelectProps {
    label: string;
    name: string;
    icon?: React.ReactNode;
    error?: string;
    touched?: boolean;
    options: { value: string | number; label: string; color?: string }[];
    onChange: (selectedOptions: MultiValue<{ value: string | number; label: string; }>, actionMeta: ActionMeta<{ value: string | number; label: string; }>) => void;
    onBlur?: () => void;
    value: { value: string | number; label: string }[];
}

const FormMultiSelect: React.FC<FormMultiSelectProps> = ({
    label,
    name,
    icon,
    error,
    touched,
    options,
    onChange,
    onBlur,
    value,
}) => {

    // Convert options to react-select format
    const formattedOptions = options.map(option => ({
        value: option.value,
        label: option.label,
        color: option.color
    }));

    return (
        <div className="relative mb-6">
            <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
                {icon && <span className="mr-2">{icon}</span>}
                {label}
            </label>
            <Select
                isMulti
                name={name}
                options={formattedOptions}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`basic-single ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
                classNamePrefix="select"
                placeholder="Select options"
                styles={{
                    control: (base) => ({
                        ...base,
                        borderColor: error ? 'red' : base.borderColor,
                        boxShadow: 'none',
                        '&:hover': {
                            borderColor: error ? 'red' : base.borderColor,
                        },
                    }),
                    menu: (base) => ({
                        ...base,
                        zIndex: 9999,
                    }),
                }}
            />
            {error && touched && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                    <FaExclamationCircle className="mr-1" />
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormMultiSelect;
