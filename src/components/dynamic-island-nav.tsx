"use client";

import { useCallback, useEffect, useRef, useState, type FocusEvent } from "react";
import { AnimatePresence, motion, useSpring, type SpringOptions } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/stub";

import splitFavicon from "public/favicon.svg";

type DynamicIslandNavProps = {
  className?: string;
  logoPriority?: boolean;
};

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Payments", href: "/payments" },
  { label: "Funding", href: "/funding" },
] as const;

const CHIP_COLORS: Record<(typeof NAV_ITEMS)[number]["label"], string> = {
  Home: "#d8d1c6",
  Payments: "#6A9BCC",
  Funding: "#BCD1CA",
};

const SAFE_AREA_TOP_OFFSET = "calc(env(safe-area-inset-top, 0px) + 1.25rem)";

const PILL_BASE_CLASSES =
  "inline-flex items-center gap-2 rounded-full border border-[#E8E6DC] text-[11px] font-poppins font-medium uppercase tracking-[0.16em] text-[#141413] shadow-[0_18px_40px_rgba(20,20,19,0.14)] whitespace-nowrap";

const ORB_SPRING: SpringOptions = {
  stiffness: 70,
  damping: 18,
  mass: 1.5,
  restDelta: 0.0001,
  restSpeed: 0.0001,
};
const PILL_SPRING = { type: "spring", stiffness: 260, damping: 24, mass: 0.9 } as const;

export function DynamicIslandNav({
  className,
  logoPriority = false,
}: DynamicIslandNavProps) {
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const desktopOrbScale = useSpring(1, ORB_SPRING);
  const mobileOrbScale = useSpring(1, ORB_SPRING);

  // Haptic feedback for mobile
  const triggerHaptic = useCallback(() => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(10);
    }
  }, []);

  const triggerLinkHaptic = useCallback(() => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([8, 20, 8]);
    }
  }, []);

  const handleDesktopBlur = useCallback((event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsDesktopExpanded(false);
    }
  }, []);

  // Tap outside to close on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (isMobileExpanded && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMobileExpanded(false);
      }
    };

    if (isMobileExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileExpanded]);

  useEffect(() => {
    desktopOrbScale.set(isDesktopExpanded ? 0.9 : 1);
  }, [desktopOrbScale, isDesktopExpanded]);

  useEffect(() => {
    mobileOrbScale.set(isMobileExpanded ? 0.92 : 1);
  }, [mobileOrbScale, isMobileExpanded]);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-5 sm:top-6 md:top-8 z-50 flex items-center justify-center px-6 pointer-events-none",
        className,
      )}
      style={{ top: SAFE_AREA_TOP_OFFSET }}
    >
      <div
        className="hidden md:flex pointer-events-auto items-center justify-center gap-2"
        onMouseEnter={() => setIsDesktopExpanded(true)}
        onMouseLeave={() => setIsDesktopExpanded(false)}
        onFocus={() => setIsDesktopExpanded(true)}
        onBlur={handleDesktopBlur}
      >
        <motion.div
          style={{ scale: desktopOrbScale }}
          className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E8E6DC]/80 bg-[#D97757] shadow-[0_20px_50px_rgba(217,119,87,0.35)]"
        >
          <Image
            src={splitFavicon}
            alt="Split"
            width={68}
            height={68}
            className="h-10 w-auto object-contain"
            priority={logoPriority}
          />
        </motion.div>

        <div className="flex items-center gap-2">
          <AnimatePresence>
            {isDesktopExpanded &&
              NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={`desktop-${item.label}`}
                  initial={{ opacity: 0, y: 8, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.9 }}
                  transition={{ ...PILL_SPRING, delay: index * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className={cn(PILL_BASE_CLASSES, "px-4 py-2.5")}
                    style={{ backgroundColor: CHIP_COLORS[item.label] }}
                    onClick={triggerLinkHaptic}
                  >
                    <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>

      <div ref={navRef} className="md:hidden pointer-events-auto flex items-center justify-center gap-2">
        <motion.button
          type="button"
          aria-label={isMobileExpanded ? "Hide navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileExpanded}
          aria-controls="dynamic-island-mobile-list"
          onClick={() => {
            triggerHaptic();
            setIsMobileExpanded((prev) => !prev);
          }}
          style={{ scale: mobileOrbScale }}
          whileTap={{ scale: 0.9 }}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E8E6DC]/80 bg-[#D97757] shadow-[0_16px_40px_rgba(217,119,87,0.35)]"
        >
          <Image
            src={splitFavicon}
            alt="Split"
            width={60}
            height={60}
            className="h-8 w-auto object-contain"
            priority={logoPriority}
          />
        </motion.button>

        <div id="dynamic-island-mobile-list" className="flex items-center gap-2">
          <AnimatePresence>
            {isMobileExpanded &&
              NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={`mobile-${item.label}`}
                  initial={{ opacity: 0, y: 8, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.92 }}
                  transition={{ ...PILL_SPRING, delay: index * 0.04 }}
                >
                  <Link
                    href={item.href}
                    className={cn(PILL_BASE_CLASSES, "px-3.5 py-2 shadow-[0_14px_32px_rgba(20,20,19,0.14)]")}
                    style={{ backgroundColor: CHIP_COLORS[item.label] }}
                    onClick={() => {
                      triggerLinkHaptic();
                      setIsMobileExpanded(false);
                    }}
                  >
                    <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
