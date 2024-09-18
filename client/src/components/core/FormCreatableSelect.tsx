import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { Label } from '../ui/label'; // Adjust path as needed
import Modal from '../ui/GenericModal';
import { SingleValue } from 'react-select';

interface CreatableSelectProps {
    label: string;
    name: string;
    icon: React.ReactNode;
    error?: string;
    touched?: boolean;
    options: { value: string | number; label: string; }[] | undefined;
    onChange: (value: string | number) => void;
    onCreate: (newItem: string) => void;
}

const FormCreatableSelect: React.FC<CreatableSelectProps> = ({ name, icon, label, error, touched, options, onChange, onCreate }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [newItem, setNewItem] = useState('');

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
                    
                    className="focus:border-0 customize-hover-border"
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? 'red' : 'grey',
                            outline: 'none',
                            boxShadow: 'none',
                            border: '1px solid #D1D5DB',
                        }),
                    }}
                    name={name}
                    onChange={(option: SingleValue<{
                        value: string | number;
                        label: string;
                        __isNew__?: boolean | undefined;
                    }>) => {
                        if (option?.__isNew__) {
                            setModalOpen(true);
                            setNewItem(option?.label);
                        } else {
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
                onClose={() => setModalOpen(false)}
                onCreate={onCreate}
                value={newItem}
            />
        </div>
    );
};

export default FormCreatableSelect;
