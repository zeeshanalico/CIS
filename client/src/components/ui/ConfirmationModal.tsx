import { motion } from 'framer-motion';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    buttonText?: string;
}

const ConfirmationModal = ({ isOpen, onClose, onConfirm, description, title, buttonText }: Props) => {
    if (!isOpen) return null;

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { scale: 0.75, opacity: 0 },
        visible: { scale: 1, opacity: 1 },
    };

    return (
        <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
        >
            <motion.div 
                className="bg-white rounded-lg shadow-lg max-w-sm w-full"
                variants={modalVariants}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{title ?? "Confirm Action"}</h3>
                </div>
                <div className="px-4 pb-2">
                    <p className="text-sm text-gray-600">{description ?? "Are you sure you want to proceed?"}</p>
                </div>
                <div className="p-4 border-t flex justify-end space-x-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:cursor-pointer transition-transform transform hover:scale-110 active:scale-90 duration-200 rounded">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white hover:cursor-pointer transition-transform transform hover:scale-110 active:scale-90 duration-200 rounded">
                        {buttonText ?? "Confirm"}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ConfirmationModal;
