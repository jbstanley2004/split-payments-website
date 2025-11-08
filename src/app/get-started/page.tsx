"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import Link from "next/link";

export default function GetStarted() {
  return (
    <main className="min-h-screen font-jetbrains">
      <DynamicIslandNav showHomeLogoOnMobile />

      <section className="px-6 md:px-10 py-16 md:py-24 max-w-3xl mx-auto">
        <h1 className="text-3xl mb-6 font-poppins">Get Started</h1>
        <p className="text-muted mb-8">
          Tell us a bit about your business and we'll share your pre-approved
          funding options.
        </p>

        <form className="space-y-6 max-w-xl">
          <div className="flex flex-col gap-2">
            <label htmlFor="biz" className="text-sm text-muted">
              business name
            </label>
            <input
              id="biz"
              name="biz"
              className="bg-bg border border-line p-3 outline-none text-white"
              placeholder="Acme Coffee LLC"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="sales" className="text-sm text-muted">
              avg monthly card sales (USD)
            </label>
            <input
              id="sales"
              name="sales"
              type="number"
              className="bg-bg border border-line p-3 outline-none text-white"
              placeholder="50000"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm text-muted">
              work email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="bg-bg border border-line p-3 outline-none text-white"
              placeholder="you@company.com"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-muted">
            <input id="agree" type="checkbox" className="accent-white" />
            <label htmlFor="agree">
              I agree to the privacy policy & terms.
            </label>
          </div>

          <button type="submit" className="btn">
            submit
          </button>
        </form>

        <p className="text-xs text-muted mt-8">
          No hard credit checks. No personal guarantees.
        </p>
      </section>
    </main>
  );
}
