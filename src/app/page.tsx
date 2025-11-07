"use client";

import { useRef, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useTransform, type MotionProps } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SplitLogo } from "@/components/split-logo";

const navItems = [
  { href: "/#funding", label: "funding" },
  { href: "/payments", label: "payments" },
  { href: "/industries", label: "industries" },
];

type ParallaxIllustrationProps = MotionProps & {
  className?: string;
  children: ReactNode;
  offset?: [number, number];
};

function ParallaxIllustration({
  className,
  children,
  offset = [-6, 6],
  ...motionProps
}: ParallaxIllustrationProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    offset.map((value) => `${value}%`)
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="relative min-h-screen font-jetbrains text-text">
      {/* All content with relative positioning */}
      <div className="relative z-10 bg-bg">
        {/* Dynamic Island Header */}
        <header className="fixed top-5 left-0 right-0 z-50 flex items-center justify-center px-6">
          {/* Desktop Dynamic Island */}
          <motion.nav
            initial={{ width: "120px" }}
            whileHover={{ width: "auto" }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="hidden md:flex items-center justify-center backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/85 rounded-[50px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-5 py-3 group hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] transition-shadow duration-500"
          >
            <Link href="/" className="flex items-center flex-shrink-0" onClick={closeMenu}>
              <span className="sr-only">Split</span>
              <SplitLogo priority />
            </Link>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap group-hover:opacity-100 group-hover:w-auto opacity-0 w-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            >
              <div className="flex gap-6 text-sm text-white/80 ml-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-[#00D9FF] transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/get-started"
                  className="bg-[#00D9FF] text-white px-5 py-1.5 rounded-[25px] font-bold text-[0.95rem] hover:bg-[#00C4EA] hover:scale-105 transition-all duration-200"
                  onClick={closeMenu}
                >
                  get started
                </Link>
              </div>
            </motion.div>
          </motion.nav>

          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between w-full backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/85 rounded-full border border-white/10 px-4 py-3">
            <Link href="/" className="flex items-center" onClick={closeMenu}>
              <span className="sr-only">Split</span>
              <SplitLogo priority />
            </Link>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#00D9FF]"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen ? (
            <>
              <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden" onClick={closeMenu} />
              <nav className="fixed left-6 right-6 top-24 z-50 flex flex-col gap-3 rounded-xl border border-white/10 bg-black/95 backdrop-blur-[20px] backdrop-saturate-[180%] p-6 text-sm shadow-xl md:hidden">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="text-white/80 hover:text-[#00D9FF] transition-colors" onClick={closeMenu}>
                    {item.label}
                  </Link>
                ))}
                <Link href="/get-started" className="btn mt-2" onClick={closeMenu}>
                  get started
                </Link>
              </nav>
            </>
          ) : null}
        </header>

        {/* Hero */}
        <section className="px-6 md:px-10 py-8 md:py-12 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-10 md:gap-0 md:min-h-[620px] border-b border-line/50">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 max-w-xl mx-auto md:mx-0 text-center md:text-left md:h-full md:flex md:flex-col md:justify-center"
          >
            <h1 className="text-4xl md:text-5xl leading-tight mb-6 text-balance">
              Accept payments. <br /> Access capital. <br /> Grow with split.
            </h1>
            <p className="text-muted mb-8 text-pretty">
              Flexible merchant funding and payment services built for high-growth
              businesses. No gradients. No color noise. Just clarity.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Link href="/get-started" className="btn" onClick={closeMenu}>
                get started
              </Link>
              <a href="/#funding" className="text-muted hover:text-white text-sm">
                learn more →
              </a>
            </div>
          </motion.div>

          <ParallaxIllustration
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="w-full md:w-1/2 flex justify-center md:justify-end md:h-full"
            offset={[-4, 8]}
          >
            <div className="relative w-full max-w-[540px] md:max-w-none aspect-[4/3] md:aspect-auto md:h-full md:min-h-[600px]">
              <Image
                src="/graphic4.png"
                alt="split hero"
                fill
                className="object-contain object-center md:object-right-top"
                sizes="(min-width: 1280px) 50vw, (min-width: 768px) 52vw, 90vw"
                priority
              />
            </div>
          </ParallaxIllustration>
        </section>

        {/* Funding Feature */}
        <section
          id="funding"
          className="px-6 md:px-10 py-8 md:py-12 flex flex-col md:flex-row-reverse items-center md:items-stretch justify-between gap-10 md:gap-0 md:min-h-[620px] border-b border-line/50"
        >
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 max-w-xl mx-auto md:mx-0 text-center md:text-left md:h-full md:flex md:flex-col md:justify-center"
          >
            <h2 className="text-3xl mb-4 text-balance">Sales-based capital access</h2>
            <p className="text-muted mb-6 text-pretty">
              Access fast, flexible capital — powered by your daily sales. No fixed
              monthly minimums or hard credit checks.
            </p>
            <ul className="text-muted space-y-2 text-sm inline-block text-left">
              <li>✔ pre-approved based on processing history</li>
              <li>✔ automated repayment from card sales</li>
              <li>✔ funding in as little as 24 hours</li>
            </ul>
          </motion.div>

          <ParallaxIllustration
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 flex justify-center md:justify-start md:h-full"
            offset={[-5, 7]}
          >
            <div className="relative w-full max-w-[520px] md:max-w-none aspect-[4/3] md:aspect-auto md:h-full md:min-h-[580px]">
              <Image
                src="/graphic3.png"
                alt="funding graphic"
                fill
                className="object-contain object-center md:object-left-top"
                sizes="(min-width: 1280px) 50vw, (min-width: 768px) 52vw, 90vw"
              />
            </div>
          </ParallaxIllustration>
        </section>

        {/* Payments / POS */}
        <section
          id="pos"
          className="px-6 md:px-10 py-8 md:py-12 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-10 md:gap-0 md:min-h-[620px] border-b border-line/50"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 max-w-xl mx-auto md:mx-0 text-center md:text-left md:h-full md:flex md:flex-col md:justify-center"
          >
            <h2 className="text-3xl mb-4 text-balance">Payments built for every business</h2>
            <p className="text-muted mb-6 text-pretty">
              POS, online, and mobile — fast, secure, and all connected to split.
            </p>
            <ul className="text-muted space-y-2 text-sm inline-block text-left">
              <li>✔ real-time reporting & reconciliation</li>
              <li>✔ competitive, transparent pricing</li>
              <li>✔ multi-location management</li>
            </ul>
          </motion.div>

          <ParallaxIllustration
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9 }}
            className="w-full md:w-1/2 flex justify-center md:justify-end md:h-full"
            offset={[-3, 9]}
          >
            <div className="relative w-full max-w-[540px] md:max-w-none aspect-[4/3] md:aspect-auto md:h-full md:min-h-[600px]">
              <Image
                src="/merchants.png"
                alt="merchants"
                fill
                className="object-contain object-center md:object-right-top"
                sizes="(min-width: 1280px) 50vw, (min-width: 768px) 52vw, 90vw"
              />
            </div>
          </ParallaxIllustration>
        </section>

        {/* Footer */}
        <footer className="border-t border-line/50 px-6 md:px-10 py-8 text-xs text-muted flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© 2025 split payments, inc.</div>
          <div className="flex items-center gap-6">
            <a href="/policy">privacy</a>
            <a href="/terms">terms</a>
            <a href="/support">contact</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
