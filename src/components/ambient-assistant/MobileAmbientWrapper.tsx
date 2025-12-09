import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AmbientPanel } from './AmbientPanel';

interface MobileAmbientWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    panelProps: any; // using any for simplicity, but strictly matches AmbientPanel props
}

export function MobileAmbientWrapper({ isOpen, onClose, panelProps }: MobileAmbientWrapperProps) {
    // 1. Scroll Locking
    useEffect(() => {
        if (isOpen) {
            // Store current scroll position to restore if needed, 
            // but fixed body is usually best for mobile to prevent all bg interaction
            const originalStyle = window.getComputedStyle(document.body).overflow;
            const originalPosition = window.getComputedStyle(document.body).position;
            const scrollY = window.scrollY;

            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${scrollY}px`;

            return () => {
                document.body.style.overflow = originalStyle;
                document.body.style.position = originalPosition;
                document.body.style.width = '';
                document.body.style.top = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [isOpen]);

    // 2. Visual Viewport / Screen Height Fix
    // We want the sheet to be almost full height, but we need to account for mobile browser bars
    // and the virtual keyboard.
    // Using 100dvh or similar can be tricky with keyboards, so we might stick to fixed positioning 
    // bottom: 0, top: constant (e.g. 15vh).

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop - darker/blurrier for focus */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ touchAction: 'none' }} // Prevent touch on background
                    />

                    {/* Sheet Container */}
                    <motion.div
                        className="mobile-ambient-sheet"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }} // Only allow downward drag for dismissal primarily
                        dragElastic={{ top: 0.05, bottom: 0.5 }} // Resistance
                        onDragEnd={(e, { offset, velocity }) => {
                            if (offset.y > 100 || velocity.y > 500) {
                                onClose();
                            }
                        }}
                    >
                        {/* Drag Handle */}
                        <div className="mobile-sheet-handle-area" onClick={onClose}> {/* Click header to close? maybe just handle */}
                            <div className="mobile-sheet-handle" />
                        </div>

                        {/* Content */}
                        <div className="mobile-sheet-content">
                            <AmbientPanel {...panelProps} />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
