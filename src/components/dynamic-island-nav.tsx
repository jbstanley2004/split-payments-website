"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/stub";

import darkModeLogo from "public/dark_mode_logo.png";

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

const DEFAULT_ITEMS: NavItem[] = [
  { label: "Funding", href: "/#funding" },
  { label: "Payments", href: "/payments" },
  { label: "Industries", href: "/industries" },
  { label: "Get Started", href: "/get-started", variant: "cta" },
];

function getRotationVariants(direction: Direction) {
  const initialRotateX = direction === "down" ? -45 : direction === "up" ? 45 : 0;
  const exitRotateX = direction === "down" ? 45 : direction === "up" ? -45 : 0;
  const initialRotateY = direction === "right" ? -45 : direction === "left" ? 45 : 0;
  const exitRotateY = direction === "right" ? 45 : direction === "left" ? -45 : 0;

  return {
    initial: {
      opacity: 0,
      rotateX: initialRotateX,
      rotateY: initialRotateY,
      scale: 0.92,
    },
    animate: {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
      opacity: 0,
      rotateX: exitRotateX,
      rotateY: exitRotateY,
      scale: 0.92,
      transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
    },
  } as const;
}

export function DynamicIslandNav({
  navItems = DEFAULT_ITEMS,
  className,
  homeHref = "/",
  logoPriority = false,
  showHomeLogoOnMobile = false,
}: DynamicIslandNavProps) {
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<Direction>("down");
  const [logoIteration, setLogoIteration] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTriggerRef = useRef(0);

  const collapseOffsets = useMemo(() => {
    if (navItems.length <= 1) return [0];
    const step = 60 / Math.max(navItems.length - 1, 1);
    const start = (navItems.length - 1) / 2;
    return navItems.map((_, index) => (start - index) * step);
  }, [navItems]);

  const advanceLogo = useCallback(() => {
    setLogoIteration((prev) => prev + 1);
  }, []);

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      advanceLogo();
    }, 2200);
  }, [advanceLogo]);

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetInterval]);

  const handleDirectionChange = useCallback(
    (direction: Direction) => {
      const now = Date.now();
      if (now - lastScrollTriggerRef.current > 400) {
        setScrollDirection(direction);
        advanceLogo();
        resetInterval();
        lastScrollTriggerRef.current = now;
      } else {
        setScrollDirection(direction);
      }
    },
    [advanceLogo, resetInterval],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    let lastScrollY = window.scrollY;
    let lastScrollX = window.scrollX;
    let touchStartX = 0;
    let touchStartY = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;

      // Collapse mobile nav when scrolling
      if (isMobileExpanded) {
        setIsMobileExpanded(false);
      }

      if (Math.abs(currentScrollY - lastScrollY) > Math.abs(currentScrollX - lastScrollX)) {
        if (currentScrollY > lastScrollY) {
          handleDirectionChange("down");
        } else if (currentScrollY < lastScrollY) {
          handleDirectionChange("up");
        }
      } else if (Math.abs(currentScrollX - lastScrollX) > 5) {
        if (currentScrollX > lastScrollX) {
          handleDirectionChange("right");
        } else if (currentScrollX < lastScrollX) {
          handleDirectionChange("left");
        }
      }

      lastScrollY = currentScrollY;
      lastScrollX = currentScrollX;
    };

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        handleDirectionChange(event.deltaX > 0 ? "right" : "left");
      } else if (Math.abs(event.deltaY) > 5) {
        handleDirectionChange(event.deltaY > 0 ? "down" : "up");
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0]?.clientX ?? 0;
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!touchStartX && !touchStartY) return;

      const touchEndX = event.touches[0]?.clientX ?? 0;
      const touchEndY = event.touches[0]?.clientY ?? 0;
      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaX) > 30 || Math.abs(deltaY) > 30) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          handleDirectionChange(deltaX > 0 ? "left" : "right");
        } else {
          handleDirectionChange(deltaY > 0 ? "up" : "down");
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
            className="pointer-events-none absolute flex h-8 items-center justify-center rounded-full border border-white/10 bg-black/80 px-2.5 py-1 shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-[20px] backdrop-saturate-[180%]"
          >
            <div className="relative flex h-4 w-auto items-center justify-center" style={{ perspective: 600 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={logoIteration}
                  {...getRotationVariants(scrollDirection)}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={darkModeLogo}
                    alt="Split"
                    width={96}
                    height={32}
                    className="h-4 w-auto object-contain"
                    priority={logoPriority}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              animate={{
                opacity: isDesktopExpanded ? 1 : 0,
                x: isDesktopExpanded ? 0 : collapseOffsets[index] ?? 0,
                scale: isDesktopExpanded ? 1 : 0.85,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative ml-2 rounded-full border border-white/10 bg-black/80 px-3 py-1 shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-[20px] backdrop-saturate-[180%]"
              style={{ pointerEvents: isDesktopExpanded ? "auto" : "none" }}
            >
              <Link
                href={item.href}
                className={cn(
                  "text-xs font-medium transition-colors font-poppins whitespace-nowrap",
                  item.variant === "cta"
                    ? "text-white px-2.5 py-0.5 inline-flex items-center justify-center border border-white/20 rounded-full bg-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/90"
                    : "text-white/80 hover:text-[var(--theme-accent)]",
                )}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div
        className="md:hidden pointer-events-auto flex items-center justify-center gap-1.5"
        onClick={() => setIsMobileExpanded((prev) => !prev)}
      >
        <div className="relative flex items-center justify-center">
          <motion.div
            animate={{ opacity: isMobileExpanded ? 0 : 1, scale: isMobileExpanded ? 0.85 : 1 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="pointer-events-none absolute flex h-9 items-center justify-center rounded-full border border-black/15 bg-black/85 px-3 py-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-[20px] backdrop-saturate-[180%]"
          >
            <div className="relative flex h-5 w-auto items-center justify-center" style={{ perspective: 600 }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={logoIteration}
                  {...getRotationVariants(scrollDirection)}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={darkModeLogo}
                    alt="Split"
                    width={96}
                    height={32}
                    className="h-5 w-auto object-contain"
                    priority={logoPriority}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {navItems.map((item, index) => (
            <motion.div
              key={item.label}
              animate={{
                opacity: isMobileExpanded ? 1 : 0,
                x: isMobileExpanded ? 0 : collapseOffsets[index] ?? 0,
                scale: isMobileExpanded ? 1 : 0.85,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative ml-2 rounded-full border border-black/15 bg-black/85 px-3 py-1 shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-[20px] backdrop-saturate-[180%]"
              style={{ pointerEvents: isMobileExpanded ? "auto" : "none" }}
            >
              <Link
                href={item.href}
                className={cn(
                  "text-xs font-medium transition-colors font-poppins whitespace-nowrap",
                  item.variant === "cta"
                    ? "text-white px-2.5 py-0.5 inline-flex items-center justify-center border border-white/20 rounded-full bg-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/90"
                    : "text-white/80 hover:text-[var(--theme-accent)]",
                )}
                onClick={() => setIsMobileExpanded(false)}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  );
}
