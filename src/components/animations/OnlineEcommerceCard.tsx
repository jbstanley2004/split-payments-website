"use client";
import { Volume2, VolumeX, ArrowUp, ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import WistiaEmbed from "@/components/WistiaEmbed";

interface OnlineEcommerceCardProps {
    isExpanded?: boolean;
    onToggle?: () => void;
    expandDirection?: "down" | "up";
    hasBeenViewed?: boolean;
}

export default function OnlineEcommerceCard({ isExpanded = false, onToggle, expandDirection = "down", hasBeenViewed = false }: OnlineEcommerceCardProps = {}) {
    const [isMuted, setIsMuted] = useState(true);

    const [isMobile, setIsMobile] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

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
    const collapsedHeight = isMobile ? "auto" : undefined;
    const expandedHeight = isMobile ? "auto" : 350;

    useEffect(() => {
        if (isExpanded && isMobile) {
            cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [isExpanded, isMobile]);

    return (
        <div
            ref={cardRef}
            className={`group bg-white rounded-3xl border ${viewedBorderClass} overflow-hidden shadow-sm transition-all duration-700 hover:shadow-md relative hover:z-10 ${scaleClass} origin-center`}
        >
            {/* Wrapper expands to video size when isExpanded */}
            <div
                className={`relative transition-all duration-700 ease-out ${isExpanded ? '' : ''}`}
                style={{
                    minHeight: collapsedHeight,
                    height: isExpanded ? expandedHeight : collapsedHeight,
                }}
            >
                {/* Video - positioned above, rolls down when expanded */}
                <div className={`absolute inset-x-0 w-full h-full transition-transform duration-700 ease-out ${isExpanded ? 'translate-y-0' : closedTranslateClass}`}>
                    <div className="relative w-full h-full bg-gray-50">
                        <WistiaEmbed videoId="q985br4zll" title="Online & E-Commerce Video" isMuted={isMuted} />

                        {/* Mute button - overlaid on video */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                            className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-black/80 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110"
                            aria-label={isMuted ? "Unmute video" : "Mute video"}
                        >
                            {isMuted ? (
                                <VolumeX className="w-4 h-4" />
                            ) : (
                                <Volume2 className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Title Card - visible by default, stays in place on hover */}
                <div className="bg-white transition-transform duration-700 ease-out">
                    <div className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1.5 flex-1 min-w-0">
                                <span className="text-xs font-semibold text-brand-black/60 block">Payments</span>
                                <h3 className="text-2xl font-bold text-brand-black font-poppins leading-tight">
                                    Payment gateway.
                                </h3>
                                <div className={`space-y-1.5 ${isExpanded ? '' : 'line-clamp-2'}`}>
                                    <p className="text-sm text-brand-black/70 leading-snug">Clean checkouts that convert and keep your cart flow intact.</p>
                                    <p className="text-sm text-brand-black/60 leading-snug">Saved profiles and tokenized vaults boost repeat order speed.</p>
                                </div>
                            </div>
                            {/* Toggle button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); onToggle?.(); }}
                                className="flex-shrink-0 ml-3 w-14 h-14 rounded-full bg-black flex items-center justify-center text-white transition-all hover:bg-gray-800 hover:scale-105 shadow-md cursor-pointer"
                                aria-label={isExpanded ? "Collapse card" : "Expand card"}
                            >
                                {isExpanded ? (
                                    <ArrowUp className="w-6 h-6" />
                                ) : (
                                    <ArrowDown className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
