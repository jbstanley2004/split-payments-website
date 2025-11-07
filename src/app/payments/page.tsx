"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { CreditCard, Check, Landmark, Laptop, Gift, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const navItems = [
  { href: "/#funding", label: "funding" },
  { href: "/payments", label: "payments" },
  { href: "/industries", label: "industries" },
];

export default function PaymentsPage() {
  const ref = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

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
        {/* Sticky Glass Header */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-6 backdrop-blur-xl bg-bg/30 border-b border-white/10">
          <Link
            href="/"
            className="text-2xl tracking-tight lowercase text-white hover:text-white"
            onClick={closeMenu}
          >
            split
          </Link>

          <nav className="hidden md:flex gap-8 text-sm text-muted">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={toggleMenu}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link href="/get-started" className="btn" onClick={closeMenu}>
              get started
            </Link>
          </div>

          {menuOpen ? (
            <>
              <div className="fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm md:hidden" onClick={closeMenu} />
              <nav className="fixed left-6 right-6 top-24 z-50 flex flex-col gap-3 rounded-xl border border-line bg-bg/95 p-6 text-sm shadow-xl md:hidden">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="hover:text-white transition-colors" onClick={closeMenu}>
                    {item.label}
                  </Link>
                ))}
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
