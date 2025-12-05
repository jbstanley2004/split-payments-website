"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/stub";

interface Tab {
    id: string;
    label: string;
    count?: number;
}

interface PortalTabsProps {
    tabs: Tab[];
    activeTab: string;
    onChange: (id: string) => void;
    className?: string;
}

export default function PortalTabs({ tabs, activeTab, onChange, className }: PortalTabsProps) {
    return (
        <div className={cn("flex justify-center w-full", className)}>
            <div className="inline-flex items-center gap-8 md:gap-12">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            data-tab-id={tab.id}
                            onClick={() => onChange(tab.id)}
                            className={cn(
                                "relative py-2 text-lg font-medium transition-colors duration-300 outline-none group text-black",
                            )}
                        >
                            <div className="flex items-center gap-2">
                                <span className="font-poppins tracking-tight">{tab.label}</span>
                                {tab.count !== undefined && tab.count > 0 && (
                                    <span className="flex items-center justify-center w-5 h-5 text-[10px] font-bold rounded-full bg-[#007AFF] text-white">
                                        {tab.count}
                                    </span>
                                )}
                            </div>

                            {/* Active Dot Indicator - Matches DynamicIslandNav */}
                            {isActive && (
                                <motion.div
                                    layoutId="portalActiveTabDot"
                                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FF4306]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
