"use client";

import type { ReactNode } from "react";
import { LayoutGroup } from "framer-motion";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";

export default function PortalLayout({ children }: { children: ReactNode }) {
    return (
        <LayoutGroup id="global-nav">
            <div className="relative min-h-screen bg-white text-brand-black selection:bg-black/10 selection:text-black">
                <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white to-[#F6F5F4]"
                    aria-hidden
                />

                <div className="relative z-10">
                    <DynamicIslandNav />
                </div>

                <div className="relative z-10 pt-24 md:pt-28">
                    {children}
                </div>
            </div>
        </LayoutGroup>
    );
}
