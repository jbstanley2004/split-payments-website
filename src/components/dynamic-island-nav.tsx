"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/stub";
import OrangePushButton from "./OrangePushButton";

import darkModeLogo from "public/split.svg";

type Direction = "up" | "down" | "left" | "right";

type NavItem = {
  label: string;
  href: string;
  variant?: "default" | "cta";
};

type DynamicIslandNavProps = {
  navItems?: NavItem[];
  className?: string;
  homeHref?: string;
  logoPriority?: boolean;
  showHomeLogoOnMobile?: boolean;
};

const ALL_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Payments", href: "/payments" },
  { label: "Funding", href: "/funding" },
  { label: "Get Started", href: "/get-started", variant: "cta" },
];

// Helper function to normalize paths for comparison
function normalizePath(path: string): string {
  // Remove trailing slashes and hash fragments for comparison
  return path.replace(/\/$/, '').split('#')[0] || '/';
}

// Helper function to check if a nav item matches the current path
function isCurrentPage(itemHref: string, currentPath: string): boolean {
  const normalizedItemHref = normalizePath(itemHref);
  const normalizedCurrentPath = normalizePath(currentPath);

  // Exact match for home page
  if (normalizedItemHref === '/' && normalizedCurrentPath === '/') {
    return true;
  }

  // For other pages, check if current path starts with the item href
  if (normalizedItemHref !== '/') {
    if (normalizedCurrentPath.startsWith(normalizedItemHref)) {
      return true;
    }
  }

  return false;
}

// Function to get filtered and ordered nav items based on current page
function getNavItemsForPage(currentPath: string): NavItem[] {
  // Filter out the current page
  const availableItems = ALL_NAV_ITEMS.filter(item => !isCurrentPage(item.href, currentPath));

  // If we're on the Get Started page, put Home in the middle
  if (normalizePath(currentPath) === '/get-started') {
    const home = availableItems.find(item => item.label === "Home");
    const others = availableItems.filter(item => item.label !== "Home");

    if (home && others.length >= 2) {
      // Put one item before Home, Home in middle, rest after
      return [others[0], home, ...others.slice(1)];
    }
    return availableItems;
  }

  // For all other pages, put Get Started in the middle
  const getStarted = availableItems.find(item => item.label === "Get Started");
  const others = availableItems.filter(item => item.label !== "Get Started");

  if (getStarted && others.length >= 2) {
    // Put one item before Get Started, Get Started in middle, rest after
    return [others[0], getStarted, ...others.slice(1)];
  }

  return availableItems;
}

export function DynamicIslandNav({
  navItems,
  className,
  homeHref = "/",
  logoPriority = false,
  showHomeLogoOnMobile = false,
}: DynamicIslandNavProps) {
  const pathname = usePathname();
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Get filtered and ordered nav items based on current page
  const displayedNavItems = useMemo(() => {
    if (navItems) {
      return navItems; // Use custom nav items if provided
    }
    return getNavItemsForPage(pathname || '/');
  }, [pathname, navItems]);

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
        className="hidden md:flex pointer-events-auto items-center justify-center gap-3"
        onMouseEnter={() => setIsDesktopExpanded(true)}
        onMouseLeave={() => setIsDesktopExpanded(false)}
      >
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ opacity: isDesktopExpanded ? 0 : 1, scale: isDesktopExpanded ? 0.85 : 1 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="pointer-events-none absolute inline-flex items-center justify-center rounded-full border border-white/10 bg-black/80 px-4 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-saturate-[180%]"
          >
            <div className="relative flex items-center justify-center" style={{ perspective: 1000 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  className="flex items-center justify-center"
                >
                  <Image
                    src={darkModeLogo}
                    alt="Split"
                    width={76}
                    height={30}
                    className="h-5 w-auto object-contain"
                    priority={logoPriority}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {displayedNavItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: collapseOffsets[index] ?? 0, scale: 0.85 }}
              animate={{
                opacity: isDesktopExpanded ? 1 : 0,
                x: isDesktopExpanded ? 0 : collapseOffsets[index] ?? 0,
                scale: isDesktopExpanded ? 1.1 : 0.85,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
              className="ml-2 rounded-full border border-white/10 bg-black/80 px-3 py-1 shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-saturate-[180%]"
              style={{ pointerEvents: isDesktopExpanded ? "auto" : "none" }}
            >
              {item.variant === "cta" ? (
                <Link href={item.href} passHref>
                  <OrangePushButton onClick={triggerLinkHaptic}>{item.label}</OrangePushButton>
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className="text-xs font-medium transition-colors font-poppins whitespace-nowrap text-white/80 hover:text-[var(--theme-accent)]"
                  onClick={triggerLinkHaptic}
                >
                  {item.label}
                </Link>
              )}
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
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="pointer-events-none absolute inline-flex items-center justify-center rounded-full border border-black/15 bg-black/85 px-4 py-2 shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-saturate-[180%]"
          >
            <div className="relative flex h-7 w-auto items-center justify-center" style={{ perspective: 1000 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  className="flex items-center justify-center"
                >
                  <Image
                    src={darkModeLogo}
                    alt="Split"
                    width={106}
                    height={42}
                    className="h-7 w-auto object-contain"
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
                scale: isMobileExpanded ? 1 : 0.85,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative ml-2 rounded-full border border-black/15 bg-black/85 px-3 py-1 shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-saturate-[180%]"
              style={{ pointerEvents: isMobileExpanded ? "auto" : "none" }}
            >
              {item.variant === "cta" ? (
                <Link href={item.href} passHref>
                  <OrangePushButton onClick={() => {
                    triggerLinkHaptic();
                    setIsMobileExpanded(false);
                  }}>{item.label}</OrangePushButton>
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className="text-xs font-medium transition-colors font-poppins whitespace-nowrap text-white/80 hover:text-[var(--theme-accent)]"
                  onClick={() => {
                    triggerLinkHaptic();
                    setIsMobileExpanded(false);
                  }}
                >
                  {item.label}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  );
}
