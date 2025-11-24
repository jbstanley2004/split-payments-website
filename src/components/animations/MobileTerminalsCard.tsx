"use client";

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from "framer-motion";
import YouTubeEmbed from "@/components/YouTubeEmbed";

interface MobileTerminalsCardProps {
    isExpanded?: boolean;
    onExpand?: () => void;
    title?: string;
    subtitle?: string;
    description?: string;
    features?: string[];
    videoId?: string;
    videoTitle?: string;
}

export default function MobileTerminalsCard({
    isExpanded = false,
    onExpand,
    title = "Mobile & wireless.",
    subtitle = "Payments",
    description = "Take wireless payments tableside, curbside, or on the go with long-range wireless terminals.",
    features = [],
    videoId = "z9x_BPf-VVo",
    videoTitle = "Mobile & Wireless Payments Video"
}: MobileTerminalsCardProps = {}) {
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
                <div className="space-y-2 flex-1 min-w-0">
                    <motion.span
                        layout="position"
                        className={`text-sm font-semibold uppercase tracking-[0.08em] block transition-colors duration-500 ${isExpanded ? 'text-brand-orange' : 'text-brand-black/60'}`}
                    >
                        {subtitle}
                    </motion.span>
                    <motion.h3
                        layout="position"
                        className={`text-[32px] font-bold font-poppins leading-tight transition-colors duration-500 ${isExpanded ? 'text-white' : 'text-brand-black'}`}
                    >
                        {title}
                    </motion.h3>
                    <motion.p
                        layout="position"
                        className={`text-base leading-relaxed transition-colors duration-500 ${isExpanded ? 'text-gray-300' : 'text-gray-500'}`}
                        initial={false}
                        animate={{ opacity: isExpanded ? 1 : 0, height: isExpanded ? "auto" : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
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
                animate={{
                    height: isExpanded ? 340 : 0,
                    opacity: isExpanded ? 1 : 0,
                    paddingLeft: isExpanded ? 12 : 0,
                    paddingRight: isExpanded ? 12 : 0
                }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
            >
                <motion.div
                    className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-b from-brand-black via-brand-black/90 to-brand-black"
                    animate={{
                        scaleX: isExpanded ? 0.9 : 1,
                        scaleY: isExpanded ? 1.06 : 0.9,
                        borderRadius: isExpanded ? "1.5rem" : "1.75rem",
                        y: isExpanded ? -10 : 0
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <div className="absolute inset-0 w-full h-full [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:w-[130%] [&>iframe]:h-[130%] [&>iframe]:-left-[15%] [&>iframe]:-top-[15%]">
                        <YouTubeEmbed videoId={videoId} title={videoTitle} isMuted={isMuted} />
                    </div>

                    {/* Mute button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMuted(!isMuted);
                        }}
                        className="absolute bottom-4 right-4 z-30 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all"
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
                </motion.div>
            </motion.div>

            <motion.div
                layout
                className="px-6 bg-brand-black"
                animate={{
                    height: isExpanded && features.length > 0 ? "auto" : 0,
                    opacity: isExpanded ? 1 : 0,
                    paddingTop: isExpanded && features.length > 0 ? 16 : 0,
                    paddingBottom: isExpanded && features.length > 0 ? 24 : 0
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
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
