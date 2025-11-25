"use client";

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import YouTubeEmbed from "@/components/YouTubeEmbed";

interface EChecksCardProps {
    isExpanded?: boolean;
    onExpand?: () => void;
}

export default function EChecksCard({ isExpanded = false, onExpand }: EChecksCardProps = {}) {
    const [isMuted, setIsMuted] = useState(true);

    return (
        <div
            className={`group bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-700 hover:shadow-md relative hover:z-10 ${isExpanded ? 'scale-110' : 'hover:scale-110'} origin-center`}
            onMouseEnter={onExpand}
        >
            {/* Wrapper expands to video size when isExpanded */}
            <div className={`relative transition-all duration-700 ease-out ${isExpanded ? 'h-[350px]' : ''}`}>
                {/* Video - positioned above, rolls down when expanded */}
                <div className={`absolute inset-x-0 w-full h-full transition-transform duration-700 ease-out ${isExpanded ? 'translate-y-0' : '-translate-y-full'}`}>
                    <div className="relative w-full h-full bg-gray-50">
                        <YouTubeEmbed videoId="5BGXdPSNVDU" title="E-Checks Video" isMuted={isMuted} />

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
                            <div className="space-y-1 flex-1 min-w-0">
                                <span className="text-xs font-semibold text-brand-black/60 block">Payment Integrations</span>
                                <h3 className="text-2xl font-bold text-brand-black font-poppins leading-tight">
                                    E-checks.
                                </h3>
                                <p className="text-sm text-brand-black/70 leading-snug">
                                    Automated acceptance with fewer returns and happier accounting teams.
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
