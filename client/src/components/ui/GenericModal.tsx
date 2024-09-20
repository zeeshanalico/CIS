import React, { useState } from 'react';
import { isValidElement, cloneElement } from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    form: React.ReactNode;
    name: string
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, form, name }) => {
    
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.9 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? 'block' : 'hidden'}`}
        >
            {isValidElement(form) ? cloneElement(form, { onClose, name } as any) : form}
        </motion.div>
    );
};

export default Modal;
