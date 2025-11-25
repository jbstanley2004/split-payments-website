"use client";
import { Volume2, VolumeX, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import WistiaEmbed from "@/components/WistiaEmbed";

interface OnlineEcommerceCardProps {
    isExpanded?: boolean;
    onExpand?: () => void;
    expandDirection?: "down" | "up";
}

export default function OnlineEcommerceCard({ isExpanded = false, onExpand, expandDirection = "down" }: OnlineEcommerceCardProps = {}) {
    const [isMuted, setIsMuted] = useState(true);

    const closedTranslateClass = expandDirection === "up" ? "translate-y-full" : "-translate-y-full";

    return (
        <div
            className={`group bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-700 hover:shadow-md relative hover:z-10 ${isExpanded ? 'scale-110' : 'hover:scale-110'} origin-center h-full`}
            onMouseEnter={onExpand}
        >
            {/* Wrapper expands to video size when isExpanded */}
            <div className={`relative transition-all duration-700 ease-out ${isExpanded ? 'h-[350px]' : 'h-full'}`}>
                {/* Video - positioned above, rolls down when expanded */}
                <div className={`absolute inset-x-0 w-full h-full transition-transform duration-700 ease-out ${isExpanded ? 'translate-y-0' : closedTranslateClass}`}>
                    <div className="relative w-full h-full bg-gray-50">
                        <WistiaEmbed videoId="q985br4zll" title="Online & E-Commerce Video" isMuted={isMuted} />

                        {/* Mute button - overlaid on video */}
                        <button
                            onClick={() => setIsMuted(!isMuted)}
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
                            <div className="space-y-1 flex-1 min-w-0">
                                <span className="text-xs font-semibold text-brand-black/60 block">Payments</span>
                                <h3 className="text-2xl font-bold text-brand-black font-poppins leading-tight">
                                    Payment gateway.
                                </h3>
                                <p className="text-sm text-brand-black/70 leading-snug">
                                    Clean checkouts that convert and keep your cart flow intact.
                                </p>
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
