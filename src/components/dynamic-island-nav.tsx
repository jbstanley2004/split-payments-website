"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/stub";

import splitFavicon from "public/favicon.svg";

// extended nav item type to support sections
type NavItem = {
  label: string;
  href: string;
  sectionId?: string;
};


type DynamicIslandNavProps = {
  navItems?: NavItem[];
  className?: string;
  logoPriority?: boolean;
};

const ALL_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Payments", href: "/payments" },
  { label: "Funding", href: "/funding" },
];

const CHIP_COLORS: Record<string, string> = {
  Home: "#d8d1c6",
  Payments: "#6A9BCC",
  Funding: "#BCD1CA",
};

// Function to get nav items
function getNavItemsForPage(): NavItem[] {
  return ALL_NAV_ITEMS;
}

export function DynamicIslandNav({
  navItems,
  className,
  logoPriority = false,
}: DynamicIslandNavProps) {
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Get nav items
  const displayedNavItems = useMemo(() => {
    if (navItems) {
      return navItems; // Use custom nav items if provided
    }
    return getNavItemsForPage();
  }, [navItems]);

  const collapseOffsets = useMemo(() => {
    if (displayedNavItems.length <= 1) return [0];
    const step = 60 / Math.max(displayedNavItems.length - 1, 1);
    const start = (displayedNavItems.length - 1) / 2;
    return displayedNavItems.map((_, index) => (start - index) * step);
  }, [displayedNavItems]);

  // Haptic feedback for mobile
  const triggerHaptic = useCallback(() => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      // Subtle vibration pattern: 10ms vibration
      navigator.vibrate(10);
    }
  }, []);

  // Haptic for link clicks - slightly different pattern
  const triggerLinkHaptic = useCallback(() => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      // Double tap pattern for navigation: short-pause-short
      navigator.vibrate([8, 20, 8]);
    }
  }, []);

  const scrollToSection = useCallback((sectionId?: string) => {
    if (!sectionId || typeof window === 'undefined') return;
    const el = document.getElementById(sectionId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const newUrl = sectionId === 'home' ? '/' : `/#${sectionId}`;
    const current = window.location.pathname + window.location.hash;
    if (current !== newUrl) {
      window.history.pushState(null, '', newUrl);
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

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-3 z-50 flex items-center justify-center px-6 pointer-events-none",
        className,
      )}
    >
      <div
        className="hidden md:flex pointer-events-auto items-center justify-center gap-1.5"
        onMouseEnter={() => setIsDesktopExpanded(true)}
        onMouseLeave={() => setIsDesktopExpanded(false)}
      >
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ opacity: isDesktopExpanded ? 0 : 1, scale: isDesktopExpanded ? 0.85 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="pointer-events-none absolute inline-flex items-center justify-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#E8E6DC]/80 bg-[#D97757] shadow-[0_20px_50px_rgba(217,119,87,0.35)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div className="flex items-center justify-center">
                  <Image
                    src={splitFavicon}
                    alt="Split"
                    width={68}
                    height={68}
                    className="h-10 w-auto object-contain"
                    priority={logoPriority}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {displayedNavItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: collapseOffsets[index] ?? 0, scale: 0.8 }}
              animate={{
                opacity: isDesktopExpanded ? 1 : 0,
                x: isDesktopExpanded ? 0 : collapseOffsets[index] ?? 0,
                scale: isDesktopExpanded ? 1.08 : 0.8,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.05 * index,
              }}
              className="ml-2 transition-all duration-300"
              style={{ pointerEvents: isDesktopExpanded ? "auto" : "none" }}
            >
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full border border-[#E8E6DC] px-4 py-2 text-[11px] font-poppins font-medium uppercase tracking-[0.16em] text-[#141413] shadow-[0_18px_40px_rgba(20,20,19,0.14)] whitespace-nowrap"
                style={{ backgroundColor: CHIP_COLORS[item.label] || "#f0ebe2" }}
                onClick={(e) => {
                  if (item.sectionId) {
                    e.preventDefault();
                    triggerLinkHaptic();
                    scrollToSection(item.sectionId);
                  } else {
                    triggerLinkHaptic();
                  }
                }}
              >
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        ref={navRef}
        className="md:hidden pointer-events-auto flex items-center justify-center gap-1.5"
        onClick={() => {
          triggerHaptic();
          setIsMobileExpanded((prev) => !prev);
        }}
      >
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ opacity: isMobileExpanded ? 0 : 1, scale: isMobileExpanded ? 0.85 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="pointer-events-none absolute inline-flex items-center justify-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E8E6DC]/80 bg-[#D97757] shadow-[0_16px_40px_rgba(217,119,87,0.35)]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div className="flex items-center justify-center">
                  <Image
                    src={splitFavicon}
                    alt="Split"
                    width={60}
                    height={60}
                    className="h-8 w-auto object-contain"
                    priority={logoPriority}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {displayedNavItems.map((item, index) => (
            <motion.div
              key={item.label}
              animate={{
                opacity: isMobileExpanded ? 1 : 0,
                x: isMobileExpanded ? 0 : collapseOffsets[index] ?? 0,
                scale: isMobileExpanded ? 1.05 : 0.8,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.05 * index,
              }}
              className="relative ml-2 transition-all duration-300"
              style={{ pointerEvents: isMobileExpanded ? "auto" : "none" }}
            >
              <Link
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full border border-[#E8E6DC] px-3.5 py-1.5 text-[11px] font-poppins font-medium uppercase tracking-[0.16em] text-[#141413] shadow-[0_14px_32px_rgba(20,20,19,0.14)] whitespace-nowrap"
                style={{ backgroundColor: CHIP_COLORS[item.label] || "#f0ebe2" }}
                onClick={(e) => {
                  if (item.sectionId) {
                    e.preventDefault();
                    triggerLinkHaptic();
                    scrollToSection(item.sectionId);
                  } else {
                    triggerLinkHaptic();
                  }
                  setIsMobileExpanded(false);
                }}
              >
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[#D97757]" />
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  );
}
