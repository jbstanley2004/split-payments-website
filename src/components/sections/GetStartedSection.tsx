"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function GetStartedSection() {
  return (
    <section
      id="get-started"
      className="relative py-16 md:py-24 px-6 md:px-10 lg:px-16 bg-white"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B6B6B]">
            Get started
          </p>
          <h2 className="text-3xl md:text-4xl font-poppins font-semibold tracking-tight text-[#2E2E2E]">
            Get a funding estimate in a few minutes.
          </h2>
          <p className="mt-4 text-sm sm:text-base md:text-lg font-lora text-[#6B6B6B] max-w-2xl mx-auto">
            Tell us about your card sales and we&apos;ll share your pre-approved funding options. No hard credit checks. No personal guarantees.
          </p>

          {/* Chip row to echo Eligibility highlights */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm">
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
            <Link href="/portal/signup">
              <button className="btn-primary">
                <span className="dot" />
                <span>Get qualified</span>
              </button>
            </Link>
          </div>

          <p className="mt-3 text-[11px] text-[#6B6B6B] text-center">
            No hard credit checks. This won&apos;t affect your credit score.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
