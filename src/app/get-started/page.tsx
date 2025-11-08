"use client";

import { SplitLogo } from "@/components/split-logo";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

export default function GetStarted() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTimeRef = useRef<number>(0);
  const rotatingTitles = ["Funding", "Payments", "Industries"];

  // Function to advance to next title
  const advanceTitle = useCallback(() => {
    setCurrentTitle((prev) => (prev + 1) % rotatingTitles.length);
  }, [rotatingTitles.length]);

  // Function to reset the auto-rotation interval
  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(advanceTitle, 2000);
  }, [advanceTitle]);

  // Detect scroll and swipe direction with immediate title change
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastScrollX = window.scrollX;
    let touchStartX = 0;
    let touchStartY = 0;

    const handleDirectionChange = (direction: 'up' | 'down' | 'left' | 'right') => {
      const now = Date.now();
      // Throttle to prevent too rapid changes (min 400ms between changes)
      if (now - lastScrollTimeRef.current > 400) {
        setScrollDirection(direction);
        advanceTitle();
        resetInterval();
        lastScrollTimeRef.current = now;
      } else {
        // Still update direction even if not advancing title
        setScrollDirection(direction);
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;

      // Determine vertical scroll direction
      if (Math.abs(currentScrollY - lastScrollY) > Math.abs(currentScrollX - lastScrollX)) {
        if (currentScrollY > lastScrollY) {
          handleDirectionChange('down');
        } else if (currentScrollY < lastScrollY) {
          handleDirectionChange('up');
        }
      }
      // Determine horizontal scroll direction
      else if (Math.abs(currentScrollX - lastScrollX) > 5) {
        if (currentScrollX > lastScrollX) {
          handleDirectionChange('right');
        } else if (currentScrollX < lastScrollX) {
          handleDirectionChange('left');
        }
      }

      lastScrollY = currentScrollY;
      lastScrollX = currentScrollX;
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX || !touchStartY) return;

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;
      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;

      // Only detect swipes if movement is significant
      if (Math.abs(deltaX) > 30 || Math.abs(deltaY) > 30) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          handleDirectionChange(deltaX > 0 ? 'left' : 'right');
        } else {
          // Vertical swipe
          handleDirectionChange(deltaY > 0 ? 'up' : 'down');
        }
      }
    };

    // Detect horizontal scroll with trackpad (shift + scroll)
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        handleDirectionChange(e.deltaX > 0 ? 'right' : 'left');
      } else if (Math.abs(e.deltaY) > 5) {
        handleDirectionChange(e.deltaY > 0 ? 'down' : 'up');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [advanceTitle, resetInterval]);

  // Initialize auto-rotation interval
  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetInterval]);

  return (
    <main className="min-h-screen font-jetbrains">
      {/* Dynamic Island Header */}
      <header className="fixed top-3 left-0 right-0 z-50 flex items-center justify-between px-6 pointer-events-none">
        {/* Desktop Logo - Left Side */}
        <Link href="/" className="flex items-center pointer-events-auto">
          <SplitLogo imageClassName="h-8 w-auto" priority />
        </Link>

        {/* Dynamic Island - Center */}
        <div
          className="flex gap-1.5 items-center justify-center pointer-events-auto absolute left-1/2 transform -translate-x-1/2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Center rotating title */}
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
                initial={{
                  opacity: 0,
                  y: scrollDirection === 'down' ? 20 : scrollDirection === 'up' ? -20 : 0,
                  x: scrollDirection === 'right' ? 20 : scrollDirection === 'left' ? -20 : 0,
                }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{
                  opacity: 0,
                  y: scrollDirection === 'down' ? -20 : scrollDirection === 'up' ? 20 : 0,
                  x: scrollDirection === 'right' ? -20 : scrollDirection === 'left' ? 20 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="text-xs text-white/70 font-medium whitespace-nowrap block text-center font-poppins"
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
            <a href="/#funding" className="text-xs text-white/80 hover:text-[var(--theme-accent)] transition-colors font-medium whitespace-nowrap font-poppins">Funding</a>
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
            <a href="/payments" className="text-xs text-white/80 hover:text-[var(--theme-accent)] transition-colors font-medium whitespace-nowrap font-poppins">Payments</a>
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
            <a href="/industries" className="text-xs text-white/80 hover:text-[var(--theme-accent)] transition-colors font-medium whitespace-nowrap font-poppins">Industries</a>
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
            <Link href="/get-started" className="text-white px-2.5 py-0.5 rounded-full text-xs font-bold border border-white/20 hover:border-[var(--theme-accent)] hover:bg-[var(--theme-accent)] transition-all duration-300 whitespace-nowrap inline-block font-poppins">
              Get Started
            </Link>
          </motion.div>
        </div>
      </header>

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
