"use client";

import Link from "next/link";
import OrangePushButton from "@/components/OrangePushButton";
import { WaterRipple } from "@/components/WaterRipple";

export default function GetStartedSection() {
  return (
    <section id="get-started" className="relative py-16 md:py-24 px-6 md:px-10 lg:px-16 bg-[color:var(--bg-page)]">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--text-subtle)]">
          Get started
        </p>
        <h2 className="text-3xl md:text-4xl font-poppins font-semibold tracking-tight text-[color:var(--text-main)]">
          Get a funding estimate in a few minutes.
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-[color:var(--text-subtle)] max-w-2xl mx-auto">
          Tell us about your card sales and we&apos;ll share your pre-approved funding options. No hard credit checks. No personal guarantees.
        </p>

        {/* Chip row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm text-[color:var(--text-subtle)]">
          <div className="chip chip--neutral">
            <span className="dot" />
            <span>Only a few questions about your card sales</span>
          </div>
          <div className="chip chip--neutral">
            <span className="dot" />
            <span>No hard credit checks</span>
          </div>
          <div className="chip chip--neutral">
            <span className="dot" />
            <span>Pre-approved offers based on real processing</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <WaterRipple>
            <Link href="/get-started">
              <OrangePushButton>Get started</OrangePushButton>
            </Link>
          </WaterRipple>
        </div>

        <p className="mt-3 text-[11px] text-[color:var(--text-subtle)] text-center">
          No hard credit checks. This won&apos;t affect your credit score.
        </p>
      </div>
    </section>
  );
}
