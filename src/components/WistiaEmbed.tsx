"use client";

import { useRef, useEffect } from "react";
import { useInViewport } from "@/hooks/useInViewport";

interface WistiaEmbedProps {
    videoId: string;
    title: string;
    isMuted: boolean;
}

export default function WistiaEmbed({ videoId, title, isMuted }: WistiaEmbedProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInViewport = useInViewport(containerRef);

    useEffect(() => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            const method = isMuted ? "mute" : "unmute";
            iframeRef.current.contentWindow.postMessage(
                { method: method },
                "*"
            );
        }
    }, [isMuted]);

    useEffect(() => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            const method = isInViewport ? "play" : "pause";
            iframeRef.current.contentWindow.postMessage(
                { method: method },
                "*"
            );
        }
    }, [isInViewport]);

    return (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-gray-100">
            {/* Overlay to prevent interaction */}
            <div className="absolute inset-0 z-10 pointer-events-none" />

            <iframe
                ref={iframeRef}
                src={`https://fast.wistia.net/embed/iframe/${videoId}?autoplay=1&muted=true&volume=0&playsinline=1&controls=0`}
                title={title}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ border: 'none' }}
            />
        </div>
    );
}
