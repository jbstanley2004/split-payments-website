"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";

export default function PortalLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    return (
        <LayoutGroup id="global-nav">
            <DynamicIslandNav />
            <AnimatePresence mode="wait">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </LayoutGroup>
    );
}
