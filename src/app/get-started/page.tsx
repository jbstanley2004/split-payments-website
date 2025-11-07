"use client";

import { SplitLogo } from "@/components/split-logo";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function GetStarted() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const rotatingTitles = ["funding", "payments", "industries"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % rotatingTitles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [rotatingTitles.length]);

  return (
    <main className="min-h-screen font-jetbrains">
      {/* Dynamic Island Header */}
      <header className="fixed top-3 left-0 right-0 z-50 flex items-center justify-center px-6 pointer-events-none">
        <div
          className="flex gap-2 items-center justify-center pointer-events-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            animate={{
              width: isHovered ? "auto" : "100px",
              opacity: isHovered ? 0 : 1,
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="absolute backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/80 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] px-4 py-1.5 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentTitle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-white/70 font-medium whitespace-nowrap block text-center"
              >
                {rotatingTitles[currentTitle]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.nav
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : 30,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/80 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] px-4 py-1.5"
            style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
          >
            <div className="flex gap-4 text-xs text-white/80">
              <a href="/#funding" className="hover:text-[#00D9FF] transition-colors font-medium whitespace-nowrap">funding</a>
              <a href="/payments" className="hover:text-[#00D9FF] transition-colors font-medium whitespace-nowrap">payments</a>
            </div>
          </motion.nav>

          <motion.nav
            animate={{
              opacity: isHovered ? 1 : 0,
              x: isHovered ? 0 : -30,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/80 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] px-4 py-1.5"
            style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
          >
            <div className="flex gap-4 text-xs text-white/80">
              <a href="/industries" className="hover:text-[#00D9FF] transition-colors font-medium whitespace-nowrap">industries</a>
              <Link href="/get-started" className="bg-[#00D9FF] text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-[#00C4EA] transition-colors whitespace-nowrap">
                get started
              </Link>
            </div>
          </motion.nav>
        </div>
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
