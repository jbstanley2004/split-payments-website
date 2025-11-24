"use client";

import { useState, useEffect } from "react";

export default function MetricsStrip() {
    const [netVolume, setNetVolume] = useState(48.2);
    const [hourlyVolume, setHourlyVolume] = useState(6.3);

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate dynamic updates matching dashboard animation
            setNetVolume(prev => parseFloat((40 + Math.random() * 20).toFixed(1)));
            setHourlyVolume(prev => parseFloat((5 + Math.random() * 5).toFixed(1)));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute bottom-8 left-0 right-0 px-6 md:px-10 lg:px-16 opacity-40">
            <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
                {/* Left - Net card volume */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-black font-poppins">
                        ${netVolume}K
                    </span>
                    <span className="text-xs text-black/60 font-lora">Net card volume</span>
                </div>

                {/* Middle - Volume by hour */}
                <div className="hidden md:flex items-center gap-2">
                    <span className="text-xs text-black/40 uppercase tracking-wider font-poppins">
                        Volume by hour
                    </span>
                    <span className="text-lg font-semibold text-black font-poppins">
                        ${hourlyVolume}K
                    </span>
                </div>

                {/* Right - Status text with orange dot */}
                <div className="flex items-center gap-3">
                    <div className="hidden lg:flex flex-col items-end text-xs text-black/50">
                        <span className="font-poppins">Deposits expected T+1 • Eastern cutoff</span>
                        <span className="font-poppins">TSYS • FD Omaha</span>
                    </div>
                    <div className="relative">
                        <div className="w-2 h-2 rounded-full bg-[#FF4306] animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
