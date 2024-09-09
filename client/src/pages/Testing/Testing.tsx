import React, { EventHandler, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

const ScrollAnimation = () => {
    const controls = useAnimation();
    const ref = React.useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const variants = {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { duration: 1 } },
    };

    return (
        <>
            <motion.div
                ref={ref}
                initial="hidden"
                animate={controls}
                variants={variants}
                className="bg-blue-300"
            >
                <h1>This is Testing Component</h1>
                <h2>This is a scroll animation item</h2>
                <p>Content that slides in from the left when you scroll down to it.</p>
            </motion.div>
            <FloatingWave><button>sdfs</button></FloatingWave>

        </>
    );
};

export default ScrollAnimation;




interface Wave {
    x: number;
    y: number;
    id: number;
}


interface Props {
    children: React.ReactNode
}
export const FloatingWave: React.FC<Props> = ({ children }) => {
    const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setRipple({ x, y });

        setTimeout(() => setRipple(null), 600); // match the duration with Framer Motion transition
    };

    return (
        <div className="relative inline-block">
            <button
                className="relative  overflow-hidden focus:outline-none"
                onClick={handleClick}
            >
                {children}
                {ripple && (
                    <motion.span
                        className="absolute top-0 left-0 w-4 h-4 rounded-full bg-blue-500 opacity-50"
                        style={{ left: ripple.x, top: ripple.y }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 10, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    />
                )}
            </button>
        </div>
    );
};

