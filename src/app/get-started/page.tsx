"use client";

import { SplitLogo } from "@/components/split-logo";
import Link from "next/link";
import { motion } from "framer-motion";

export default function GetStarted() {
  return (
    <main className="min-h-screen font-jetbrains">
      {/* Dynamic Island Header */}
      <header className="fixed top-5 left-0 right-0 z-50 flex items-center justify-center px-6">
        <motion.nav
          initial={{ width: "120px" }}
          whileHover={{ width: "auto" }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center justify-center backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/85 rounded-[50px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-5 py-3 group hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] transition-shadow duration-500"
        >
          <Link href="/" className="flex items-center flex-shrink-0">
            <span className="sr-only">Split</span>
            <SplitLogo priority />
          </Link>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            className="overflow-hidden whitespace-nowrap group-hover:opacity-100 group-hover:w-auto opacity-0 w-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
          >
            <div className="flex gap-6 text-sm text-white/80 ml-8">
              <a href="/#funding" className="hover:text-[#00D9FF] transition-colors duration-200 font-medium">funding</a>
              <a href="/payments" className="hover:text-[#00D9FF] transition-colors duration-200 font-medium">payments</a>
              <a href="/industries" className="hover:text-[#00D9FF] transition-colors duration-200 font-medium">industries</a>
              <Link
                href="/get-started"
                className="bg-[#00D9FF] text-white px-5 py-1.5 rounded-[25px] font-bold text-[0.95rem] hover:bg-[#00C4EA] hover:scale-105 transition-all duration-200"
              >
                get started
              </Link>
            </div>
          </motion.div>
        </motion.nav>
      </header>

      <section className="px-6 md:px-10 py-16 md:py-24 max-w-3xl mx-auto">
        <h1 className="text-3xl mb-6">get started</h1>
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
