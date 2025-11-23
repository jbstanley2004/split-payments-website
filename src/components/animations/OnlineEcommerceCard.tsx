"use client";
import { Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import WistiaEmbed from "@/components/WistiaEmbed";

export default function OnlineEcommerceCard() {
    const [isMuted, setIsMuted] = useState(true);

    return (
        <div className="group flex flex-col bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md h-full">
            <div className="p-6 pb-0 flex flex-col relative z-10 bg-white">
                <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                        <span className="text-sm font-semibold text-brand-black/60">Payments</span>
                        <h3 className="text-[32px] font-bold text-brand-black font-poppins leading-tight max-w-[80%]">
                            Payment gateway.
                        </h3>
                    </div>
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:scale-110 flex-shrink-0"
                        aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                        {isMuted ? (
                            <VolumeX className="w-5 h-5" />
                        ) : (
                            <Volume2 className="w-5 h-5" />
                        )}
                    </button>
                </div>
            </div>
            <div className="mt-auto w-full bg-gray-50 relative border-t border-gray-100 overflow-hidden">
                <div className="h-72 w-full relative overflow-hidden">
                    <WistiaEmbed videoId="q985br4zll" title="Online & E-Commerce Video" isMuted={isMuted} />
                </div>
            </div>
        </div>
    );
}
