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

function getRotationVariants(direction: Direction, velocity: number = 1) {
  // Allow much higher velocities for ultra-fast blur effect
  const normalizedVelocity = Math.max(0.1, Math.min(velocity, 100));

  // Calculate rotation degrees - allow up to 9000 degrees (25 full rotations) for blur effect
  const baseRotation = 90;
  const rotationMultiplier = normalizedVelocity < 1
    ? 0.5 + (normalizedVelocity * 0.5) // 0.5-1x for slow swipes
    : normalizedVelocity; // 1-100x for extremely fast swipes
  const rotationDegrees = baseRotation * rotationMultiplier;

  // Aggressive duration scaling for fast swipes
  const baseDuration = 0.4;
  const duration = normalizedVelocity > 5
    ? Math.max(0.15, baseDuration / (normalizedVelocity / 4)) // Very fast animation for blur
    : baseDuration * (1.2 - normalizedVelocity * 0.15); // Slightly longer for slow swipes

  const initialRotateX = direction === "down" ? -rotationDegrees : direction === "up" ? rotationDegrees : 0;
  const exitRotateX = direction === "down" ? rotationDegrees : direction === "up" ? -rotationDegrees : 0;
  const initialRotateY = direction === "right" ? -rotationDegrees : direction === "left" ? rotationDegrees : 0;
  const exitRotateY = direction === "right" ? rotationDegrees : direction === "left" ? -rotationDegrees : 0;

  const initialY = direction === "down" ? -20 : direction === "up" ? 20 : 0;
  const exitY = direction === "down" ? 20 : direction === "up" ? -20 : 0;
  const initialX = direction === "right" ? -20 : direction === "left" ? 20 : 0;
  const exitX = direction === "right" ? 20 : direction === "left" ? -20 : 0;

  return {
    initial: {
      opacity: 0,
      rotateX: initialRotateX,
      rotateY: initialRotateY,
      y: initialY,
      x: initialX,
      scale: 0.8,
    },
    animate: {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      y: 0,
      x: 0,
      scale: 1,
      transition: { duration, ease: [0.34, 1.56, 0.64, 1] },
    },
    exit: {
      opacity: 0,
      rotateX: exitRotateX,
      rotateY: exitRotateY,
      y: exitY,
      x: exitX,
      scale: 0.8,
      transition: { duration: duration * 0.875, ease: [0.4, 0, 1, 1] },
    },
  } as const;
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
  const [scrollDirection, setScrollDirection] = useState<Direction>("down");
  const [logoIteration, setLogoIteration] = useState(0);
  const [velocity, setVelocity] = useState(1);
  const lastScrollTriggerRef = useRef(0);

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

  const advanceLogo = useCallback(() => {
    setLogoIteration((prev) => prev + 1);
  }, []);

  // Haptic feedback for mobile
  const triggerHaptic = useCallback(() => {
    if (typeof window !== "undefined" && "vibrate" in navigator) {
      // Subtle vibration pattern: 10ms vibration
      navigator.vibrate(10);
    }
  }, []);

  const handleDirectionChange = useCallback(
    (direction: Direction, velocityValue: number = 1) => {
      const now = Date.now();
      // Reduced throttle to 100ms for more responsive rotations
      if (now - lastScrollTriggerRef.current > 100) {
        setScrollDirection(direction);
        setVelocity(velocityValue);
        advanceLogo();
        lastScrollTriggerRef.current = now;
      } else {
        setScrollDirection(direction);
        setVelocity(velocityValue);
      }
    },
    [advanceLogo],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastScrollY = window.scrollY;
    let lastScrollX = window.scrollX;
    let lastScrollTime = Date.now();
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;
      const currentTime = Date.now();
      const timeDelta = Math.max(currentTime - lastScrollTime, 1);

      // Collapse mobile nav when scrolling
      if (isMobileExpanded) {
        setIsMobileExpanded(false);
      }

      const deltaY = Math.abs(currentScrollY - lastScrollY);
      const deltaX = Math.abs(currentScrollX - lastScrollX);

      if (deltaY > deltaX) {
        const scrollVelocity = (deltaY / timeDelta) * 20; // Increased scaling for more dynamic effect
        const normalizedVelocity = Math.max(0.5, Math.min(scrollVelocity, 100));

        // Swapped directions to match touch behavior
        if (currentScrollY > lastScrollY) {
          handleDirectionChange("up", normalizedVelocity);
        } else if (currentScrollY < lastScrollY) {
          handleDirectionChange("down", normalizedVelocity);
        }
      } else if (deltaX > 5) {
        const scrollVelocity = (deltaX / timeDelta) * 20;
        const normalizedVelocity = Math.max(0.5, Math.min(scrollVelocity, 100));

        if (currentScrollX > lastScrollX) {
          handleDirectionChange("right", normalizedVelocity);
        } else if (currentScrollX < lastScrollX) {
          handleDirectionChange("left", normalizedVelocity);
        }
      }

      lastScrollY = currentScrollY;
      lastScrollX = currentScrollX;
      lastScrollTime = currentTime;
    };

    const handleWheel = (event: WheelEvent) => {
      // Wheel delta values are good indicators of velocity
      // Typical values: 1-100 for trackpad, 50-300+ for mouse wheel
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        const wheelVelocity = Math.abs(event.deltaX) / 10; // More aggressive scaling
        const normalizedVelocity = Math.max(0.5, Math.min(wheelVelocity, 100));
        handleDirectionChange(event.deltaX > 0 ? "right" : "left", normalizedVelocity);
      } else if (Math.abs(event.deltaY) > 5) {
        const wheelVelocity = Math.abs(event.deltaY) / 10; // More aggressive scaling
        const normalizedVelocity = Math.max(0.5, Math.min(wheelVelocity, 100));
        // Swapped directions: wheel down (deltaY > 0) = "up", wheel up (deltaY < 0) = "down"
        handleDirectionChange(event.deltaY > 0 ? "up" : "down", normalizedVelocity);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0]?.clientX ?? 0;
      touchStartY = event.touches[0]?.clientY ?? 0;
      touchStartTime = Date.now();
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!touchStartX && !touchStartY) return;

      const touchEndX = event.touches[0]?.clientX ?? 0;
      const touchEndY = event.touches[0]?.clientY ?? 0;
      const touchEndTime = Date.now();

      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;
      const timeDelta = Math.max(touchEndTime - touchStartTime, 1);

      // Lower threshold for more responsive detection
      if (Math.abs(deltaX) > 15 || Math.abs(deltaY) > 15) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Calculate swipe velocity with aggressive scaling for blur effect
          const swipeVelocity = (Math.abs(deltaX) / timeDelta) * 15;
          const normalizedVelocity = Math.max(0.3, Math.min(swipeVelocity, 100));
          handleDirectionChange(deltaX > 0 ? "left" : "right", normalizedVelocity);
        } else {
          // Swapped directions: swipe UP (deltaY > 0) = "down", swipe DOWN (deltaY < 0) = "up"
          const swipeVelocity = (Math.abs(deltaY) / timeDelta) * 15;
          const normalizedVelocity = Math.max(0.3, Math.min(swipeVelocity, 100));
          handleDirectionChange(deltaY > 0 ? "down" : "up", normalizedVelocity);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleDirectionChange, isMobileExpanded]);

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
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="pointer-events-none absolute inline-flex items-center justify-center rounded-full border border-white/10 bg-black/80 px-4 py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-saturate-[180%]"
          >
            <div className="relative flex items-center justify-center" style={{ perspective: 1000 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={logoIteration}
                  {...getRotationVariants(scrollDirection, velocity)}
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
                scale: isDesktopExpanded ? 1 : 0.85,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="ml-2 rounded-full border border-white/10 bg-black/80 px-3 py-1 shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-saturate-[180%]"
              style={{ pointerEvents: isDesktopExpanded ? "auto" : "none" }}
            >
              {item.variant === "cta" ? (
                <Link href={item.href} passHref>
                  <OrangePushButton>{item.label}</OrangePushButton>
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className="text-xs font-medium transition-colors font-poppins whitespace-nowrap text-white/80 hover:text-[var(--theme-accent)]"
                >
                  {item.label}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div
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
                  key={logoIteration}
                  {...getRotationVariants(scrollDirection, velocity)}
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
                    triggerHaptic();
                    setIsMobileExpanded(false);
                  }}>{item.label}</OrangePushButton>
                </Link>
              ) : (
                <Link
                  href={item.href}
                  className="text-xs font-medium transition-colors font-poppins whitespace-nowrap text-white/80 hover:text-[var(--theme-accent)]"
                  onClick={() => {
                    triggerHaptic();
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
