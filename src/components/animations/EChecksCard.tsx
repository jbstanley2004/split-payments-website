"use client";

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from "framer-motion";
import YouTubeEmbed from "@/components/YouTubeEmbed";

interface EChecksCardProps {
    isExpanded?: boolean;
    onExpand?: () => void;
    title?: string;
    subtitle?: string;
    description?: string;
    features?: string[];
}

export default function EChecksCard({
    isExpanded = false,
    onExpand,
    title = "E-checks",
    subtitle = "Payment Integrations",
    description = "Modernize your check acceptance with automated verification, faster deposits, and lower transaction costs.",
    features = []
}: EChecksCardProps = {}) {
    const [isMuted, setIsMuted] = useState(true);

    return (
        <motion.div
            layout
            className={`group relative flex flex-col rounded-3xl border overflow-hidden shadow-sm transition-colors duration-500 ${isExpanded ? 'bg-brand-black border-black' : 'bg-white border-gray-200 hover:shadow-md'}`}
            onMouseEnter={onExpand}
            initial={{ borderRadius: "1.5rem" }}
        >
            {/* Header Section */}
            <motion.div layout="position" className="p-6 flex items-start justify-between relative z-20">
                <div className="space-y-1 flex-1 min-w-0">
                    <motion.h3
                        layout="position"
                        className={`text-[32px] font-bold font-poppins leading-tight transition-colors duration-500 ${isExpanded ? 'text-white' : 'text-brand-black'}`}
                    >
                        {title}
                    </motion.h3>
                    <motion.span
                        layout="position"
                        className={`text-xs font-bold uppercase tracking-wider block transition-colors duration-500 ${isExpanded ? 'text-brand-orange' : 'text-brand-black/60'}`}
                    >
                        {subtitle}
                    </motion.span>
                    <motion.p
                        layout="position"
                        className={`text-base leading-relaxed pt-2 transition-colors duration-500 ${isExpanded ? 'text-gray-300' : 'text-gray-500 hidden'}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        {description}
                    </motion.p>
                </div>
                <Link href="/get-started" className="flex-shrink-0 ml-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isExpanded ? 'bg-white text-black' : 'bg-black text-white'}`}>
                        <ArrowRight className="w-5 h-5" />
                    </div>
                </Link>
            </motion.div>

            {/* Video Section */}
            <motion.div
                layout
                className="relative w-full overflow-hidden"
                animate={{ height: isExpanded ? 240 : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <div className="absolute inset-0 w-full h-full bg-black">
                    <div className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full [&>iframe]:object-cover">
                        <YouTubeEmbed videoId="z9x_BPf-VVo" title="Credit Card Processing Video" isMuted={isMuted} />
                    </div>

                    {/* Mute button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMuted(!isMuted);
                        }}
                        className="absolute bottom-4 right-4 z-30 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white backdrop-blur-md transition-all"
                    >
                        {isMuted ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                            </svg>
                        )}
                    </button>
                </div>
            </motion.div>

            {/* Footer Section - Removed Description */}
            <motion.div
                layout
                className="px-6 overflow-hidden"
                animate={{
                    height: isExpanded && features.length > 0 ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0,
                    paddingBottom: isExpanded && features.length > 0 ? 24 : 0
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {/* Features or other footer content if needed */}
                <div className="pt-4 border-t border-white/10">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {features.map((feature, i) => (
                            <li key={i} className="flex items-center text-sm font-medium text-white/90">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange mr-2 flex-shrink-0" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </motion.div>
    );
}
