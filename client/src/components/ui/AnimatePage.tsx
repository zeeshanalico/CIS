import { motion } from 'framer-motion';
import React from 'react';
interface Prop {
    children: any;
}
export const AnimateY = ({ children }: Prop) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}  // Starting animation state
            animate={{ opacity: 1, y: 0 }}   // Animation state when mounted
            exit={{ opacity: 0, y: -50 }}     // Animation state when exiting
            transition={{ duration: 0.5 }}     // Transition duration
        >
            {children}
        </motion.div>
    );
};
export const AnimateX = ({ children }: Prop) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}  // Starting animation state
            animate={{ opacity: 1, x: 0 }}   // Animation state when mounted
            exit={{ opacity: 0, x: -50 }}     // Animation state when exiting
            transition={{ duration: 0.2 }}     // Transition duration
        >
            {children}
        </motion.div>
    );
};