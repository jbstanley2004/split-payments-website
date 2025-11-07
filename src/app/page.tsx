"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useTransform, type MotionProps, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SplitLogo } from "@/components/split-logo";
import HeroOptimized from "@/components/hero-optimized";

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
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const rotatingTitles = ["funding", "payments", "industries"];

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  // Rotate titles every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % rotatingTitles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [rotatingTitles.length]);

  return (
    <main className="relative min-h-screen font-jetbrains text-text">
      {/* All content with relative positioning */}
      <div className="relative z-10 bg-bg">
        {/* Dynamic Island Header */}
        <header className="fixed top-3 left-0 right-0 z-50 flex items-center justify-center px-6 pointer-events-none">
          {/* Desktop Dynamic Island */}
          <div
            className="hidden md:flex gap-1.5 items-center justify-center pointer-events-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Center rotating title - fades out on hover */}
            <motion.div
              animate={{
                opacity: isHovered ? 0 : 1,
                scale: isHovered ? 0.8 : 1,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/80 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] px-3.5 py-1 overflow-hidden"
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

            {/* Pod 1: Funding */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : 40,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/80 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] px-3 py-1"
              style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            >
              <Link href="/#funding" className="text-xs text-white/80 hover:text-[#ff6600] transition-colors font-medium whitespace-nowrap">
                funding
              </Link>
            </motion.div>

            {/* Pod 2: Payments */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : 20,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/80 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] px-3 py-1"
              style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            >
              <Link href="/payments" className="text-xs text-white/80 hover:text-[#ff6600] transition-colors font-medium whitespace-nowrap">
                payments
              </Link>
            </motion.div>

            {/* Pod 3: Industries */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -20,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/80 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] px-3 py-1"
              style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            >
              <Link href="/industries" className="text-xs text-white/80 hover:text-[#ff6600] transition-colors font-medium whitespace-nowrap">
                industries
              </Link>
            </motion.div>

            {/* Pod 4: Get Started */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -40,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/80 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] px-2.5 py-1"
              style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            >
              <Link href="/get-started" className="text-white px-2.5 py-0.5 rounded-full text-xs font-bold border border-white/20 hover:border-[#ff6600] transition-colors whitespace-nowrap inline-block">
                get started
              </Link>
            </motion.div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between w-full backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/85 rounded-full border border-white/10 px-4 py-3 pointer-events-auto">
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
              <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden pointer-events-auto" onClick={closeMenu} />
              <nav className="fixed left-6 right-6 top-24 z-50 flex flex-col gap-3 rounded-xl border border-white/10 bg-black/95 backdrop-blur-[20px] backdrop-saturate-[180%] p-6 text-sm shadow-xl md:hidden pointer-events-auto">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="text-white/80 hover:text-[#ff6600] transition-colors" onClick={closeMenu}>
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
        <HeroOptimized />

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
            initial={{ opacity: 0, x: -20, scale: 0.92 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              scale: {
                type: "spring",
                stiffness: 110,
                damping: 14,
                mass: 0.9
              }
            }}
            className="w-full md:w-1/2 flex justify-center md:justify-start md:h-full"
            offset={[-5, 7]}
          >
            <motion.div
              className="relative w-full max-w-[660px] md:max-w-none aspect-[4/3] md:aspect-auto md:h-full md:min-h-[630px]"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }
              }}
              style={{
                filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.12))"
              }}
            >
              <Image
                src="/graphic3.png"
                alt="funding graphic"
                fill
                className="object-contain object-center md:object-left-top"
                sizes="(min-width: 1280px) 50vw, (min-width: 768px) 52vw, 90vw"
              />
            </motion.div>
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
