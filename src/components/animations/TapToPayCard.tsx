"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TapToPayCard() {
    return (
        <div className="group flex flex-col bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md h-full">
            <div className="p-10 pb-0 flex flex-col relative z-10 bg-white">
                <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                        <span className="text-sm font-semibold text-brand-black/60">Payments</span>
                        <h3 className="text-[32px] font-bold text-brand-black font-poppins leading-tight max-w-[80%]">
                            Contactless tap to pay.
                        </h3>
                    </div>
                    <Link href="/get-started" className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:scale-110">
                            <ArrowRight className="w-6 h-6" />
                        </div>
                    </Link>
                </div>
            </div>
            <div className="mt-auto w-full bg-gray-50 relative border-t border-gray-100 overflow-hidden">
                <div className="h-96 w-full relative overflow-hidden">
                    <iframe
                        className="absolute top-1/2 left-1/2 w-[150%] h-[150%] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
                        src="https://www.youtube.com/embed/2Srv8GJaATY?autoplay=1&mute=1&loop=1&playlist=2Srv8GJaATY&playsinline=1&controls=0&modestbranding=1&showinfo=0&rel=0"
                        title="Tap to Pay Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ border: 'none' }}
                    />
                </div>
            </div>
        </div>
    );
}
