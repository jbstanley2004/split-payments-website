"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
                  pathname === item.href
                    ? "text-black font-semibold"
                    : "text-brand-black/60 hover:text-brand-black",
                  "[text-shadow:_0_0_12px_rgb(255_255_255_/_90%),_0_0_4px_rgb(255_255_255_/_80%)]"
                )}
              >
                {pathname === item.href && (
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
              <div className="bg-white/95 backdrop-blur-xl rounded-[32px] shadow-2xl border border-gray-200/50 overflow-hidden">
                {/* Menu Items */}
                <nav className="py-6 px-4">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
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
                        <span className="w-2 h-2 rounded-full bg-[#FF4306]" />
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
