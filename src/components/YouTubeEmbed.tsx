"use client";

import { useRef, useEffect } from "react";
import { useInViewport } from "@/hooks/useInViewport";

interface YouTubeEmbedProps {
    videoId: string;
    title: string;
    isMuted: boolean;
}

export default function YouTubeEmbed({ videoId, title, isMuted }: YouTubeEmbedProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInViewport = useInViewport(containerRef);

    useEffect(() => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            const action = isMuted ? "mute" : "unMute";
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: "command", func: action, args: [] }),
                "*"
            );
        }
    }, [isMuted]);

    useEffect(() => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            const action = isInViewport ? "playVideo" : "pauseVideo";
            iframeRef.current.contentWindow.postMessage(
                JSON.stringify({ event: "command", func: action, args: [] }),
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
                className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&enablejsapi=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    );
}
