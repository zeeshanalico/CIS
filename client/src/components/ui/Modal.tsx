import { motion } from 'framer-motion';

interface Props {
    isOpen: boolean;
    buttonText?: string;
    title?: string;
    children: React.ReactNode;
}

const Modal = ({ isOpen, children,  title }: Props) => {
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
            className="fixed z-12 inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
        >
            <motion.div
                className="bg-white rounded-lg shadow-lg max-w-sm md:max-w-lg w-full"
                variants={modalVariants}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                <div className="p-4">
                    <h3 className="text-lg font-semibold">{title ?? "Confirm Action"}</h3>
                </div>
                {children}
               
            </motion.div>
        </motion.div>
    );
};

export default Modal;
