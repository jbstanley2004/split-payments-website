"use client";

import { SplitLogo } from "@/components/split-logo";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { CreditCard, Check, Landmark, Laptop, Gift, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

const navItems = [
  { href: "/#funding", label: "funding" },
  { href: "/payments", label: "payments" },
  { href: "/industries", label: "industries" },
];

export default function PaymentsPage() {
  const ref = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const rotatingTitles = ["funding", "payments", "industries"];

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % rotatingTitles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [rotatingTitles.length]);

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
    <main ref={ref} className="relative min-h-screen font-jetbrains text-text">
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
        <header className="fixed top-3 left-0 right-0 z-50 flex items-center justify-center px-6 pointer-events-none">
          {/* Desktop Dynamic Island */}
          <div
            className="hidden md:flex gap-1.5 items-center justify-center pointer-events-auto"
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
              <Link href="/#funding" className="text-xs text-white/80 hover:text-[#d97757] transition-colors font-medium whitespace-nowrap">funding</Link>
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
              <Link href="/payments" className="text-xs text-white/80 hover:text-[#d97757] transition-colors font-medium whitespace-nowrap">payments</Link>
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
              <Link href="/industries" className="text-xs text-white/80 hover:text-[#d97757] transition-colors font-medium whitespace-nowrap">industries</Link>
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
              <Link href="/get-started" className="text-white px-2.5 py-0.5 rounded-full text-xs font-bold border border-white/20 hover:border-[#d97757] transition-colors whitespace-nowrap inline-block">get started</Link>
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
                  <Link key={item.href} href={item.href} className="text-white/80 hover:text-[#d97757] transition-colors" onClick={closeMenu}>
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
        <section className="px-6 md:px-10 py-32 md:py-48 min-h-[80vh] flex items-center border-b border-line/50">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl leading-tight mb-6">
              Payment Processing Made Simple
            </h1>
            <p className="text-muted text-lg md:text-xl mb-8">
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
                className="border border-line p-8 hover:border-muted transition-colors bg-bg/80 backdrop-blur-sm"
              >
                <div className="w-12 h-12 mb-6 flex items-center justify-start">
                  <solution.icon className="w-12 h-12 text-text" strokeWidth={1} />
                </div>
                <h3 className="text-xl font-medium mb-3">{solution.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
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
            <h2 className="text-3xl md:text-4xl mb-4">Find Your Perfect Solution</h2>
            <p className="text-muted mb-8 text-lg">
              Get in touch for a no-obligation cost review and discover the perfect
              payment solution for your business needs.
            </p>
            <Link href="/get-started" className="btn inline-block">
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
