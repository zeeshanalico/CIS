import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Label } from '../ui/label'; // Adjust path as needed
import Modal from '../ui/GenericModal';
import { SingleValue } from 'react-select';

interface Option {
    value: string | number;
    label: string;
    __isNew__?: boolean;
}

interface CreatableSelectProps {
    label: string;
    name: string;
    icon: React.ReactNode;
    error?: string;
    touched?: boolean;
    options: Option[] | undefined;
    onChange: (value: string | number) => void;
    onCreate: (item: string) => void;
    placeholder?: string;
    [x: string]: any; // This allows additional props to be passed
}

const FormCreatableSelect: React.FC<CreatableSelectProps> = ({
    name,
    icon,
    label,
    error,
    touched,
    options,
    onChange,
    onCreate,
    placeholder,
    ...props
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Option | null>(null);
    const [newItem, setNewItem] = useState<string>('');

    const handleCreate = (newValue: string) => {
        // Pass the new value to the parent component through onCreate
        onCreate(newValue);
        setSelectedItem({ value: newValue, label: newValue });
        setSelectedItem(null)
        setNewItem('')
        setModalOpen(false);
    };

    return (
        <div className="mb-4">
            <Label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">
                {label}
            </Label>
            <div className="relative check">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    {icon}
                </span>
                <CreatableSelect
                    isClearable
                    isSearchable
                    {...props}
                    value={selectedItem}
                    placeholder={placeholder || 'Select or create an item'}
                    className="focus:border-0 customize-hover-border"
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            outline: 'none',
                            boxShadow: 'none',
                            border: '1px solid #D1D5DB',
                        }),
                    }}
                    name={name}
                    onChange={(option: SingleValue<Option>) => {
                        if (option?.__isNew__) {
                            // New option created
                            setNewItem(option.label);
                            setModalOpen(true);
                        } else {
                            // Existing option selected
                            setSelectedItem(option || null);
                            onChange(option?.value || '');
                        }
                    }}
                    options={options}
                />
            </div>
            {error && touched && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}

            <Modal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false), setSelectedItem(null), setNewItem('') }}
                value={newItem}
                onCreate={handleCreate}
            />
        </div>
    );
};

export default FormCreatableSelect;
