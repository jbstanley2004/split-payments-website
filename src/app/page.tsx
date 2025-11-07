"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/#funding", label: "funding" },
  { href: "/payments", label: "payments" },
  { href: "/industries", label: "industries" },
];

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-screen font-jetbrains bg-bg text-text overflow-x-hidden">
      {/* Sticky Glass Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-6 backdrop-blur-xl bg-bg/60 border-b border-white/10 relative">
        <Link
          href="/"
          className="text-2xl tracking-tight lowercase text-white hover:text-white"
          onClick={closeMenu}
        >
          split
        </Link>

        <nav className="hidden md:flex gap-8 text-sm text-muted">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-white transition-colors"
            >
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
            <div
              className="fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm md:hidden"
              onClick={closeMenu}
            />
            <nav className="fixed left-6 right-6 top-24 z-50 flex flex-col gap-3 rounded-xl border border-line bg-bg/95 p-6 text-sm shadow-xl md:hidden">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:text-white transition-colors"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </>
        ) : null}
      </header>

      {/* Hero */}
      <section className="section px-6 md:px-10 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2"
        >
          <h1 className="text-4xl md:text-5xl leading-tight mb-6">
            Accept payments. <br /> Access capital. <br /> Grow with split.
          </h1>
          <p className="text-muted mb-8">
            Flexible merchant funding and payment services built for high-growth
            businesses. No gradients. No color noise. Just clarity.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/get-started" className="btn" onClick={closeMenu}>
              get started
            </Link>
            <a href="/#funding" className="text-muted hover:text-white text-sm">
              learn more →
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <Image
            src="/graphic3.png"
            alt="split hero"
            width={720}
            height={480}
            className="w-full max-w-md object-contain"
            sizes="(min-width: 768px) 32rem, 90vw"
            priority
          />
        </motion.div>
      </section>

      {/* Funding Feature */}
      <section
        id="funding"
        className="section px-6 md:px-10 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2"
        >
          <Image
            src="/graphic4.png"
            alt="funding graphic"
            width={640}
            height={420}
            className="w-full max-w-md object-contain"
            sizes="(min-width: 768px) 28rem, 90vw"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl mb-4">Sales-based capital access</h2>
          <p className="text-muted mb-6">
            Access fast, flexible capital — powered by your daily sales. No fixed
            monthly minimums or hard credit checks.
          </p>
          <ul className="text-muted space-y-2 text-sm">
            <li>✔ pre-approved based on processing history</li>
            <li>✔ automated repayment from card sales</li>
            <li>✔ funding in as little as 24 hours</li>
          </ul>
        </motion.div>
      </section>

      {/* Payments / POS */}
      <section
        id="pos"
        className="section px-6 md:px-10 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl mb-4">Payments built for every business</h2>
          <p className="text-muted mb-6">
            POS, online, and mobile — fast, secure, and all connected to split.
          </p>
          <ul className="text-muted space-y-2 text-sm">
            <li>✔ real-time reporting & reconciliation</li>
            <li>✔ competitive, transparent pricing</li>
            <li>✔ multi-location management</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <Image
            src="/merchants.png"
            alt="merchants"
            width={720}
            height={480}
            className="w-full max-w-md object-contain"
            sizes="(min-width: 768px) 32rem, 90vw"
          />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line px-6 md:px-10 py-8 text-xs text-muted flex flex-col md:flex-row items-center justify-between gap-4">
        <div>© 2025 split payments, inc.</div>
        <div className="flex items-center gap-6">
          <a href="/policy">privacy</a>
          <a href="/terms">terms</a>
          <a href="/support">contact</a>
        </div>
      </footer>
    </main>
  );
}
