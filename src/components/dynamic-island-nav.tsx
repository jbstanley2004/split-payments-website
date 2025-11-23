"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/lib/stub";

type DynamicIslandNavProps = {
  className?: string;
  logoPriority?: boolean;
};

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Payments", href: "/payments" },
  { label: "Funding", href: "/funding" },
  // { label: "Partnerships", href: "/partnerships" },
] as const;

const SAFE_AREA_TOP_OFFSET = "calc(env(safe-area-inset-top, 0px) + 1.25rem)";

export function DynamicIslandNav({ className, logoPriority = false }: DynamicIslandNavProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileOpen]);

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 h-20 z-40 bg-white/10 backdrop-blur-xl backdrop-saturate-150 pointer-events-none"
        style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-5 sm:top-6 md:top-8 z-50 flex items-center justify-between px-6 pointer-events-none",
          className,
        )}
        style={{ top: SAFE_AREA_TOP_OFFSET }}
      >
        <div className="pointer-events-auto flex w-full items-center justify-between">
          {/* Left: Split logo */}
          <Link
            href="/"
            aria-label="Split home"
            className="flex items-center gap-2 relative z-[60]"
          >
            <Image
              src="/new_logo_no_bg_smooth.png"
              alt="Split"
              height={36}
              width={90}
              className="h-9 w-auto object-contain"
              priority={logoPriority}
            />
          </Link>

          {/* Desktop: nav links */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-all duration-300 text-brand-black hover:text-brand-black relative",
                  "[text-shadow:_0_0_12px_rgb(255_255_255_/_90%),_0_0_4px_rgb(255_255_255_/_80%)]"
                )}
              >
                <span className="w-1 h-1 rounded-full bg-[#FF4306]" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile: Hamburger/Close button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center gap-2 rounded-full border border-border-subtle bg-white px-3 py-1.5 text-[11px] font-poppins font-medium uppercase tracking-[0.16em] text-main shadow-soft relative z-[60]"
            onClick={() => setIsMobileOpen((open) => !open)}
            aria-expanded={isMobileOpen}
            aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="dot" />
            {isMobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* Dynamic Island Expandable Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileOpen(false)}
            />

            {/* Expanding Menu Container */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.5,
                y: -20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
                y: -20,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="fixed top-28 left-1/2 -translate-x-1/2 w-[85%] max-w-sm z-50 md:hidden pointer-events-auto"
            >
              <div className="bg-white/95 backdrop-blur-xl rounded-[32px] shadow-2xl border border-gray-200/50 overflow-hidden">
                {/* Menu Items */}
                <nav className="py-6 px-4">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        damping: 20,
                        stiffness: 300,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200",
                          pathname === item.href
                            ? "bg-black text-white"
                            : "text-brand-black hover:bg-gray-100"
                        )}
                      >
                        <span className={cn(
                          "w-2 h-2 rounded-full",
                          pathname === item.href ? "bg-[#FF4306]" : "bg-gray-300"
                        )} />
                        <span className="text-lg font-medium font-poppins">{item.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="border-t border-gray-200/50 p-4"
                >
                  <Link
                    href="/get-started"
                    onClick={() => setIsMobileOpen(false)}
                    className="block w-full bg-black text-white text-center py-4 rounded-2xl font-poppins font-semibold hover:bg-brand-charcoal transition-colors"
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>

              {/* Decorative glow effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FF4306]/20 to-transparent blur-2xl" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
