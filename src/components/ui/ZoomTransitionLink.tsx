"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface ZoomTransitionLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function ZoomTransitionLink({
    href,
    children,
    className = "",
}: ZoomTransitionLinkProps) {
    const router = useRouter();
    const [isZooming, setIsZooming] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsZooming(true);

        // Wait for animation to complete before navigating
        setTimeout(() => {
            router.push(href);
        }, 800); // Match animation duration
    };

    return (
        <>
            <div onClick={handleClick} className={className} style={{ cursor: "pointer" }}>
                {children}
            </div>

            <AnimatePresence>
                {isZooming && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 20, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                        className="fixed inset-0 z-[9999] bg-white pointer-events-none origin-center"
                        style={{
                            top: "50%",
                            left: "50%",
                            x: "-50%",
                            y: "-50%",
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
