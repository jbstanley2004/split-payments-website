"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/stub";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

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

  const activeLabel = useMemo(() => {
    const match = NAV_ITEMS.find(
      (item) => pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
    );
    return match?.label ?? "Split";
  }, [pathname]);

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
        className="fixed inset-x-0 top-0 h-20 z-40 bg-white/40 backdrop-blur-xl backdrop-saturate-150 pointer-events-none"
        style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}
      />
      <header
        className={cn(
          "fixed inset-x-0 top-5 sm:top-6 md:top-8 z-50 flex items-center justify-between px-6 pointer-events-none",
          className,
        )}
        style={{ top: SAFE_AREA_TOP_OFFSET }}
      >
        <div className="pointer-events-auto flex w-full items-center justify-between relative">
          {/* Logo - Centered on mobile, Left on desktop */}
          <div
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 md:flex md:items-center md:gap-2 z-[60] cursor-pointer"
            onClick={() => {
              if (window.innerWidth < 768) {
                if (navigator.vibrate) navigator.vibrate(10);
                setIsMobileOpen(!isMobileOpen);
              }
            }}
          >
            <Image
              src="/new_logo_no_bg_smooth.png"
              alt="Split"
              height={36}
              width={90}
              className="h-9 w-auto object-contain"
              priority={logoPriority}
            />
          </div>

          {/* Desktop: nav links */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-all duration-300 relative",
                  (pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href)))
                    ? "text-black font-semibold"
                    : "text-black/70 hover:text-black"
                )}
              >
                {(pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))) && (
                  <motion.span
                    layoutId="activeNavDot"
                    className="w-1.5 h-1.5 rounded-full bg-[#FF4306]"
                  />
                )}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Empty div to balance flex layout on desktop if needed, or just keep existing structure */}
          <div className="hidden md:block w-[90px]"></div>
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
                x: "-50%"
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                x: "-50%"
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
                y: -20,
                x: "-50%"
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="fixed top-24 left-1/2 w-[85%] max-w-sm z-50 md:hidden pointer-events-auto"
            >
              <div className="bg-white/95 backdrop-blur-xl rounded-[32px] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] border border-gray-200/70 overflow-hidden ring-1 ring-black/5">
                <div className="px-6 pt-6 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#FF4306]" aria-hidden />
                    <span className="text-sm font-medium text-brand-black/70 font-poppins uppercase tracking-[0.12em]">
                      {activeLabel}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileOpen(false)}
                    className="text-xs font-medium text-brand-black/50 underline underline-offset-4"
                  >
                    Close
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="px-4 pb-5">
                  <div className="rounded-3xl bg-gradient-to-b from-white/80 to-white/60 border border-black/5 shadow-sm p-2 space-y-1">
                    {NAV_ITEMS.map((item, index) => {
                      const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                      return (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: index * 0.08,
                            type: "spring",
                            damping: 20,
                            stiffness: 300,
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsMobileOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 relative",
                              isActive
                                ? "bg-black/4 text-brand-black font-semibold"
                                : "text-brand-black/80 hover:bg-black/5",
                            )}
                          >
                            {isActive && (
                              <motion.span
                                layoutId="activeNavDotMobile"
                                className="absolute left-3 w-1.5 h-1.5 rounded-full bg-[#FF4306]"
                              />
                            )}
                            <span className="text-base font-medium font-poppins">{item.label}</span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </nav>

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 }}
                  className="px-6 pb-6"
                >
                  <Link href="/get-started" onClick={() => setIsMobileOpen(false)} className="block w-full">
                    <PrimaryButton
                      variant="outline-orange"
                      className="w-full text-base sm:text-lg px-7 sm:px-8 py-4"
                    >
                      Get Started
                    </PrimaryButton>
                  </Link>
                </motion.div>
              </div>

              {/* Decorative glow effect */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FF4306]/14 to-transparent blur-2xl" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
