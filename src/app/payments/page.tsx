"use client";

import { SplitLogo } from "@/components/split-logo";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { CreditCard, Check, Landmark, Laptop, Gift, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";

const navItems = [
  { href: "/#funding", label: "Funding" },
  { href: "/payments", label: "Payments" },
  { href: "/industries", label: "Industries" },
];

const cardColors = [
  "#C67C5F", // Terracotta
  "#B7CDC5", // Mint
  "#E4DACB", // Beige
  "#C9C8DA", // Lavender
  "#6999CA", // Blue
];

export default function PaymentsPage() {
  const ref = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTimeRef = useRef<number>(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const rotatingTitles = ["Funding", "Payments", "Industries"];

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

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

  const solutions = [
    {
      title: "Credit Card Acceptance",
      description:
        "Seamlessly process credit card transactions in-store, online, or on-the-go with our reliable and secure systems.",
      icon: CreditCard,
    },
    {
      title: "Check Processing",
      description:
        "Traditional and electronic checks, risk-free check guarantee programs, and check conversion to access funds at lower rates.",
      icon: Check,
    },
    {
      title: "ACH Payments",
      description:
        "The most cost-effective ACH transfers for payroll, recurring billing, and B2B payments.",
      icon: Landmark,
    },
    {
      title: "Point of Sale (POS) systems",
      description:
        "Whether it's in-store, on the go, or online, we provide a range of POS systems to meet the needs of hardworking customers.",
      icon: Laptop,
    },
    {
      title: "Gift Card and Loyalty Programs",
      description:
        "Customizable gift card and loyalty programs that encourage customers to return and spend more.",
      icon: Gift,
    },
  ];

  return (
    <main ref={ref} className="relative min-h-screen font-lora text-text">
      {/* Fixed Parallax Background */}
      <motion.div
        style={{ y }}
        className="fixed inset-0 z-0"
      >
        <Image
          src="/payments-hero.png"
          alt="Payment Processing"
          fill
          className="object-contain md:object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-bg/70" />
      </motion.div>

      {/* All content with relative positioning */}
      <div className="relative z-10">
        {/* Dynamic Island Header */}
        <header className="fixed top-3 left-0 right-0 z-50 flex items-center justify-between px-6 pointer-events-none">
          {/* Desktop Logo - Left Side */}
          <Link href="/" className="hidden md:flex items-center pointer-events-auto">
            <SplitLogo imageClassName="h-8 w-auto" priority />
          </Link>

          {/* Desktop Dynamic Island - Center */}
          <div
            className="hidden md:flex gap-1.5 items-center justify-center pointer-events-auto absolute left-1/2 transform -translate-x-1/2"
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
              <Link href="/#funding" className="text-xs text-white/80 hover:text-[var(--theme-accent)] transition-colors font-medium whitespace-nowrap font-poppins">Funding</Link>
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
              <Link href="/payments" className="text-xs text-white/80 hover:text-[var(--theme-accent)] transition-colors font-medium whitespace-nowrap font-poppins">Payments</Link>
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
              <Link href="/industries" className="text-xs text-white/80 hover:text-[var(--theme-accent)] transition-colors font-medium whitespace-nowrap font-poppins">Industries</Link>
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
              <Link href="/get-started" className="text-white px-2.5 py-0.5 rounded-full text-xs font-bold border border-white/20 hover:border-[var(--theme-accent)] hover:bg-[var(--theme-accent)] transition-all duration-300 whitespace-nowrap inline-block font-poppins">Get Started</Link>
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
                  <Link key={item.href} href={item.href} className="text-white/80 hover:text-[var(--theme-accent)] transition-colors font-poppins" onClick={closeMenu}>
                    {item.label}
                  </Link>
                ))}
                <Link href="/get-started" className="btn mt-2 font-poppins" onClick={closeMenu}>
                  Get Started
                </Link>
              </nav>
            </>
          ) : null}
        </header>

        {/* Hero */}
        <section className="px-6 md:px-10 py-32 md:py-48 min-h-[80vh] flex items-center border-b border-line/50">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="font-poppins text-4xl md:text-6xl leading-tight mb-6">
              Payment Processing Made Simple
            </h1>
            <p className="font-lora text-[#2C2C2C] text-lg md:text-xl mb-8 leading-relaxed">
              From credit card processing to check services, gift cards, and ACH
              payments, we provide an all-in-one resource for your non-cash payment
              needs. Solutions ranging from card terminals to complex software
              integrations, all designed to streamline your payment operations, boost
              your sales, and enhance your customer's experience.
            </p>
          </motion.div>
        </section>

        {/* Solutions Grid */}
        <section className="px-6 md:px-10 py-16 md:py-24 border-b border-line/50">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {solutions.map((solution, index) => (
              <motion.div
                key={solution.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-black/[0.08] p-8 transition-colors"
                style={{ backgroundColor: cardColors[index] }}
              >
                <div className="w-12 h-12 mb-6 flex items-center justify-start">
                  <solution.icon className="w-12 h-12 text-[#0A0A0A]" strokeWidth={1} />
                </div>
                <h3 className="font-poppins text-xl font-medium mb-3 text-[#0A0A0A]">{solution.title}</h3>
                <p className="font-lora text-[#0A0A0A] text-sm leading-relaxed">
                  {solution.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-10 py-16 md:py-24 border-b border-line/50">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto border border-line p-12 bg-bg/80 backdrop-blur-sm"
          >
            <h2 className="font-poppins text-3xl md:text-4xl mb-4">Find Your Perfect Solution</h2>
            <p className="font-lora text-[#2C2C2C] mb-8 text-lg leading-relaxed">
              Get in touch for a no-obligation cost review and discover the perfect
              payment solution for your business needs.
            </p>
            <Link href="/get-started" className="btn inline-block font-poppins">
              Get a Cost Review
            </Link>
          </motion.div>
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
