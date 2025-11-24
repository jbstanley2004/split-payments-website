"use client";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import WistiaEmbed from "@/components/WistiaEmbed";

interface OnlineEcommerceCardProps {
    isExpanded?: boolean;
    onExpand?: () => void;
    title?: string;
    subtitle?: string;
    description?: string;
    features?: string[];
}

export default function OnlineEcommerceCard({
    isExpanded = false,
    onExpand,
    title = "Payment Gateway",
    subtitle = "E-Commerce",
    description = "Seamless checkout experiences for your digital store, integrated directly with your inventory.",
    features = []
}: OnlineEcommerceCardProps = {}) {
    const [isMuted, setIsMuted] = useState(true);

    return (
        <motion.div
            layout
            className={`group relative flex flex-col rounded-3xl border overflow-hidden shadow-sm transition-colors duration-500 ${isExpanded ? 'bg-brand-black border-black' : 'bg-white border-gray-200 hover:shadow-md'}`}
            onMouseEnter={onExpand}
            initial={{ borderRadius: "1.5rem" }}
            animate={{
                scaleX: isExpanded ? 0.9 : 1,
                scaleY: isExpanded ? 1.06 : 1
            }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
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
                    height: isExpanded ? 320 : 0,
                    opacity: isExpanded ? 1 : 0,
                    paddingLeft: isExpanded ? 0 : 16,
                    paddingRight: isExpanded ? 0 : 16
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                <motion.div
                    className="relative w-full h-full overflow-hidden bg-brand-black"
                    animate={{
                        scaleX: isExpanded ? 1 : 0.96,
                        scaleY: isExpanded ? 1.06 : 0.96,
                        borderRadius: isExpanded ? "1.5rem" : "1.25rem"
                    }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <div className="absolute inset-0 w-full h-full [&>iframe]:absolute [&>iframe]:inset-0 [&>iframe]:w-full [&>iframe]:h-full">
                        <WistiaEmbed videoId="q985br4zll" title="Online & E-Commerce Video" isMuted={isMuted} />
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
                            <VolumeX className="w-4 h-4" />
                        ) : (
                            <Volume2 className="w-4 h-4" />
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
