import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (value: string) => void;
    value: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onCreate, value }) => {
    const [inputValue, setInputValue] = useState<string>(value);

    const handleCreate = () => {
        onCreate(inputValue);
        setInputValue('');
        onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}
        >
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Create New Item</h2>
                <input
                    type="text"
                    value={inputValue || value}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                    placeholder="Enter item name"
                />
                <div className="flex justify-end gap-4">
                    <Button onClick={onClose} variant="secondary">Cancel</Button>
                    <Button onClick={handleCreate}>Create</Button>
                </div>
            </div>
        </motion.div>
    );
};

export default Modal;
