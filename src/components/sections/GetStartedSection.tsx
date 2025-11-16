"use client";

import Link from "next/link";
import OrangePushButton from "@/components/OrangePushButton";
import { WaterRipple } from "@/components/WaterRipple";

export default function GetStartedSection() {
  return (
    <section
      id="get-started"
      className="relative min-h-[80vh] flex items-center justify-center px-6 md:px-10 lg:px-16 py-16 md:py-24"
    >
      {/* Card styled to mirror Eligibility card */}
      <div className="relative mx-auto max-w-4xl rounded-3xl bg-[#d8d1c6]/95 px-6 py-8 md:px-10 md:py-10 shadow-[0_22px_60px_rgba(20,20,19,0.16)] text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
          Get started
        </p>
        <h2 className="text-3xl md:text-4xl font-poppins font-semibold tracking-tight text-[#141413]">
          Get a funding estimate in a few minutes.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base md:text-lg font-lora text-[#524F49]">
          Tell us about your card sales and we&apos;ll share your pre-approved funding options. No hard credit checks. No personal guarantees.
        </p>

        {/* Chip row to echo Eligibility highlights */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm text-[#524F49]">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f0ebe2] px-3 py-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
            <span>Only a few questions about your card sales</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f0ebe2] px-3 py-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
            <span>No hard credit checks</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f0ebe2] px-3 py-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
            <span>Pre-approved offers based on real processing</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <WaterRipple>
            <Link href="/get-started">
              <OrangePushButton>Get Started</OrangePushButton>
            </Link>
          </WaterRipple>
        </div>

        <p className="mt-3 text-[11px] text-[#7B7569]">
          No hard credit checks. This won&apos;t affect your credit score.
        </p>
      </div>
    </section>
  );
}
