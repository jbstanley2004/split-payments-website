"use client";

import Link from "next/link";
import OrangePushButton from "@/components/OrangePushButton";
import { WaterRipple } from "@/components/WaterRipple";

export default function GetStartedSection() {
  return (
    <section
      id="get-started"
      className="relative py-16 md:py-24 px-6 md:px-10 lg:px-16"
    >
      {/* Subtle overlay to ensure readability over the hero background image */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#FAF9F5]/80 via-[#FAF9F5]/60 to-transparent" />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#9B8E7A]">
          Get started
        </p>
        <h2 className="text-3xl md:text-4xl font-poppins font-semibold tracking-tight text-[#141413]">
          Get a funding estimate in a few minutes.
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-[#524F49] max-w-2xl mx-auto">
          Tell us about your card sales and we&apos;ll share your pre-approved funding options.
          No hard credit checks. No personal guarantees.
        </p>

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
