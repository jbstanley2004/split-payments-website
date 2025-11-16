"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/stub";
import OrangePushButton from "./OrangePushButton";

import splitFavicon from "public/favicon.svg";

// extended nav item type to support sections
type NavItem = {
  label: string;
  href: string;
  variant?: "default" | "cta";
  sectionId?: string;
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
  const normalizedPath = normalizePath(currentPath);
  const baseItems =
    normalizedPath === "/"
      ? ALL_NAV_ITEMS.filter(item => item.label !== "Get Started")
      : ALL_NAV_ITEMS;

  // Filter out the current page
  const availableItems = baseItems.filter(item => !isCurrentPage(item.href, currentPath));

  // If we're on the Get Started page, put Home in the middle
  if (normalizedPath === '/get-started') {
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
              initial={{ opacity: 0, x: collapseOffsets[index] ?? 0, scale: 0.85 }}
              animate={{
                opacity: isDesktopExpanded ? 1 : 0,
                x: isDesktopExpanded ? 0 : collapseOffsets[index] ?? 0,
                scale: isDesktopExpanded ? 1 : 0.85,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.05 * index,
              }}
              className={cn(
                "ml-2 transition-all duration-300",
                item.variant === "cta"
                  ? "border-none bg-transparent px-0 py-0 shadow-none"
                  : "rounded-full border border-[#E8E6DC] bg-[#f0ebe2] px-3.5 py-1.5 shadow-[0_15px_30px_rgba(20,20,19,0.14)]"
              )}
              style={{ pointerEvents: isDesktopExpanded ? "auto" : "none" }}
            >
              {item.variant === "cta" ? (
                <Link
                  href={item.href}
                  onClick={(e) => {
                    if (item.sectionId) {
                      e.preventDefault();
                      triggerLinkHaptic();
                      scrollToSection(item.sectionId);
                    } else {
                      triggerLinkHaptic();
                    }
                  }}
                  passHref
                >
                  <OrangePushButton>{item.label}</OrangePushButton>
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-[11px] font-lora text-[#3F3A32] transition-colors whitespace-nowrap"
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
                scale: isMobileExpanded ? 1 : 0.85,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.05 * index,
              }}
              className={cn(
                "relative ml-2 transition-all duration-300",
                item.variant === "cta"
                  ? "border-none bg-transparent px-0 py-0 shadow-none"
                  : "rounded-full border border-[#E8E6DC] bg-[#f0ebe2] px-3 py-1.5 shadow-[0_12px_28px_rgba(20,20,19,0.14)]"
              )}
              style={{ pointerEvents: isMobileExpanded ? "auto" : "none" }}
            >
              {item.variant === "cta" ? (
                <Link
                  href={item.href}
                  passHref
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
                  <OrangePushButton>{item.label}</OrangePushButton>
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-[11px] font-lora text-[#3F3A32] whitespace-nowrap"
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
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  );
}
