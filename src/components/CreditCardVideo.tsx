"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function CreditCardVideo() {
    const [isMuted, setIsMuted] = useState(true);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const toggleMute = () => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            const action = isMuted ? "unMute" : "mute";
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: "command", func: action, args: [] }),
                "*"
            );
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="relative w-full h-full overflow-hidden bg-gray-100">
            {/* Video Overlay to prevent clicking/pausing but allow button clicks */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent event bubbling
                        toggleMute();
                    }}
                    className="absolute bottom-4 right-4 pointer-events-auto p-2 rounded-full bg-black/20 backdrop-blur-md border border-white/20 text-white hover:bg-black/40 transition-all duration-300 group"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                    {isMuted ? (
                        <VolumeX className="w-4 h-4 opacity-80 group-hover:opacity-100" />
                    ) : (
                        <Volume2 className="w-4 h-4 opacity-80 group-hover:opacity-100" />
                    )}
                </button>
            </div>

            <iframe
                ref={iframeRef}
                className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
                src="https://www.youtube.com/embed/z9x_BPf-VVo?autoplay=1&mute=1&controls=0&loop=1&playlist=z9x_BPf-VVo&playsinline=1&enablejsapi=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1"
                title="Credit Card Processing Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    );
}
