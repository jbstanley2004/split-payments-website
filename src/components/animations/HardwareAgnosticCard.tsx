"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import LivingGridAnimation from "./LivingGridAnimation";

export default function HardwareAgnosticCard() {
    return (
        <div className="group flex flex-col bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md h-full">
            <div className="p-10 pb-0 flex flex-col relative z-10 bg-white">
                <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                        <span className="text-sm font-semibold text-brand-black/60">Hardware and Software</span>
                        <h3 className="text-[32px] font-bold text-brand-black font-poppins leading-tight max-w-[90%]">
                            Brand agnostic.
                        </h3>
                    </div>
                    <Link href="/get-started" className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white transition-transform group-hover:scale-110">
                            <ArrowRight className="w-6 h-6" />
                        </div>
                    </Link>
                </div>
            </div>

            <div className="mt-auto w-full bg-gray-50 relative border-t border-gray-100 overflow-hidden h-96 flex items-center justify-center">
                <LivingGridAnimation />
            </div>
        </div>
    );
}
