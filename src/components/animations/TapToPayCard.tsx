"use client";

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import YouTubeEmbed from "@/components/YouTubeEmbed";

interface TapToPayCardProps {
    isExpanded?: boolean;
    onExpand?: () => void;
    expandDirection?: "down" | "up";
    hasBeenViewed?: boolean;
}

export default function TapToPayCard({ isExpanded = false, onExpand, expandDirection = "down", hasBeenViewed = false }: TapToPayCardProps = {}) {
    const [isMuted, setIsMuted] = useState(true);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const detectMobile = () => setIsMobile(typeof window !== "undefined" ? window.innerWidth < 768 : false);
        detectMobile();

        window.addEventListener("resize", detectMobile);
        return () => window.removeEventListener("resize", detectMobile);
    }, []);

    const effectiveExpandDirection = isMobile ? "up" : expandDirection;

    const closedTranslateClass = effectiveExpandDirection === "up" ? "translate-y-full" : "-translate-y-full";
    const viewedBorderClass = hasBeenViewed && !isExpanded ? "border-[#d97757]" : "border-gray-200";
    const scaleClass = isExpanded ? "md:scale-110" : "md:hover:scale-110";

    return (
        <div
            className={`group bg-white rounded-3xl border ${viewedBorderClass} overflow-hidden shadow-sm transition-all duration-700 hover:shadow-md relative hover:z-10 ${scaleClass} origin-center`}
            onMouseEnter={onExpand}
        >
            {/* Wrapper expands to video size when isExpanded */}
            <div className={`relative transition-all duration-700 ease-out ${isExpanded ? 'h-[350px]' : ''}`}>
                {/* Video - positioned above, rolls down when expanded */}
                <div className={`absolute inset-x-0 w-full h-full transition-transform duration-700 ease-out ${isExpanded ? 'translate-y-0' : closedTranslateClass}`}>
                    <div className="relative w-full h-full bg-gray-50">
                        <YouTubeEmbed videoId="2Srv8GJaATY" title="Tap to Pay Video" isMuted={isMuted} />

                        {/* Mute button overlaid on video */}
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="absolute bottom-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white backdrop-blur-sm transition-all z-10"
                            aria-label={isMuted ? "Unmute" : "Mute"}
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
                </div>

                {/* Title Card - visible by default, stays in place */}
                <div className="bg-white transition-transform duration-700 ease-out">
                    <div className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1.5 flex-1 min-w-0">
                                <span className="text-xs font-semibold text-brand-black/60 block">Digital Payments</span>
                                <h3 className="text-2xl font-bold text-brand-black font-poppins leading-tight">
                                    Tap to pay.
                                </h3>
                                <p className="text-sm text-brand-black/70 leading-snug">Secure tap-to-pay on devices your team trusts.</p>
                                <p className="text-sm text-brand-black/60 leading-snug">Provision fast, stay PCI-safe, send instant receipts.</p>
                            </div>
                            <Link href="/get-started" className="flex-shrink-0 ml-3">
                                <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:scale-110">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
