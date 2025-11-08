"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionProps,
  type MotionValue,
} from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { SplitLogo } from "@/components/split-logo";
import Hero from "@/components/Hero";
import IndustriesCarousel from "@/components/IndustriesCarousel";
import fundingPreviewLight from "public/product-overview-light.jpg";
import fundingPreviewDark from "public/product-overview.jpg";
import paymentsPreviewLight from "public/product-invoice-light.jpg";
import paymentsPreviewDark from "public/product-invoice.jpg";
import industriesPreviewLight from "public/industries-hero.png";
import industriesPreviewDark from "public/industries-hero.png";
import getStartedPreviewLight from "public/product-vault-light.jpg";
import getStartedPreviewDark from "public/product-vault.jpg";

type MobileNavPreview = {
  alt: string;
  lightSrc: StaticImageData;
  darkSrc: StaticImageData;
};

type MobileNavChild = {
  label: string;
  href: string;
};

type MobileNavItem = {
  label: string;
  href: string;
  description: string;
  preview: MobileNavPreview;
  children?: MobileNavChild[];
};

const mobileNavItems: MobileNavItem[] = [
  {
    label: "Funding",
    href: "/#funding",
    description:
      "Unlock working capital tailored for multi-location growth without leaving the page you're on.",
    preview: {
      alt: "Funding overview preview",
      lightSrc: fundingPreviewLight,
      darkSrc: fundingPreviewDark,
    },
  },
  {
    label: "Payments",
    href: "/payments",
    description:
      "Accept in-person and online payments with unified reconciliation and instant transparency.",
    preview: {
      alt: "Unified payments preview",
      lightSrc: paymentsPreviewLight,
      darkSrc: paymentsPreviewDark,
    },
  },
  {
    label: "Industries",
    href: "/industries",
    description:
      "See how Split tailors the platform for restaurants, retail, hospitality, and more.",
    preview: {
      alt: "Industries spotlight",
      lightSrc: industriesPreviewLight,
      darkSrc: industriesPreviewDark,
    },
    children: [
      { label: "Restaurants", href: "/industries?focus=restaurants" },
      { label: "Retail", href: "/industries?focus=retail" },
      { label: "Hotels", href: "/industries?focus=hotels" },
      { label: "Health & Beauty", href: "/industries?focus=beauty" },
      { label: "Services", href: "/industries?focus=services" },
      { label: "Franchises", href: "/industries?focus=franchise" },
    ],
  },
  {
    label: "Get Started",
    href: "/get-started",
    description:
      "Start your custom onboarding to bring Split to every location in a single flow.",
    preview: {
      alt: "Get started preview",
      lightSrc: getStartedPreviewLight,
      darkSrc: getStartedPreviewDark,
    },
  },
];

type ParallaxIllustrationProps = MotionProps & {
  className?: string;
  children: ReactNode;
  offset?: [number, number];
};

function ParallaxIllustration({
  className,
  children,
  offset = [-6, 6],
  ...motionProps
}: ParallaxIllustrationProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    offset.map((value) => `${value}%`)
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}

export default function Page() {
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTimeRef = useRef<number>(0);

  const rotatingTitles = ["Funding", "Payments", "Industries"];

  // Function to advance to next title
  const advanceTitle = useCallback(() => {
    setCurrentTitle((prev) => (prev + 1) % rotatingTitles.length);
  }, [rotatingTitles.length]);

  // Function to reset the auto-rotation interval
  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(advanceTitle, 2000);
  }, [advanceTitle]);

  // Detect scroll and swipe direction with immediate title change
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastScrollX = window.scrollX;
    let touchStartX = 0;
    let touchStartY = 0;

    const handleDirectionChange = (direction: 'up' | 'down' | 'left' | 'right') => {
      const now = Date.now();
      // Throttle to prevent too rapid changes (min 400ms between changes)
      if (now - lastScrollTimeRef.current > 400) {
        setScrollDirection(direction);
        advanceTitle();
        resetInterval();
        lastScrollTimeRef.current = now;
      } else {
        // Still update direction even if not advancing title
        setScrollDirection(direction);
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;

      // Determine vertical scroll direction
      if (Math.abs(currentScrollY - lastScrollY) > Math.abs(currentScrollX - lastScrollX)) {
        if (currentScrollY > lastScrollY) {
          handleDirectionChange('down');
        } else if (currentScrollY < lastScrollY) {
          handleDirectionChange('up');
        }
      }
      // Determine horizontal scroll direction
      else if (Math.abs(currentScrollX - lastScrollX) > 5) {
        if (currentScrollX > lastScrollX) {
          handleDirectionChange('right');
        } else if (currentScrollX < lastScrollX) {
          handleDirectionChange('left');
        }
      }

      lastScrollY = currentScrollY;
      lastScrollX = currentScrollX;
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX || !touchStartY) return;

      const touchEndX = e.touches[0].clientX;
      const touchEndY = e.touches[0].clientY;
      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;

      // Only detect swipes if movement is significant
      if (Math.abs(deltaX) > 30 || Math.abs(deltaY) > 30) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          // Horizontal swipe
          handleDirectionChange(deltaX > 0 ? 'left' : 'right');
        } else {
          // Vertical swipe
          handleDirectionChange(deltaY > 0 ? 'up' : 'down');
        }
      }
    };

    // Detect horizontal scroll with trackpad (shift + scroll)
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        handleDirectionChange(e.deltaX > 0 ? 'right' : 'left');
      } else if (Math.abs(e.deltaY) > 5) {
        handleDirectionChange(e.deltaY > 0 ? 'down' : 'up');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [advanceTitle, resetInterval]);

  // Initialize auto-rotation interval
  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetInterval]);

  return (
    <main className="relative min-h-screen font-lora text-text">
      {/* All content with relative positioning */}
      <div className="relative z-10 bg-bg">
        {/* Dynamic Island Header */}
        <header className="fixed top-3 left-0 right-0 z-50 flex items-center justify-between px-6 pointer-events-none">
          {/* Desktop Logo - Left Side */}
          <Link href="/" className="hidden md:flex items-center pointer-events-auto">
            <SplitLogo imageClassName="h-11 w-auto" priority />
          </Link>

          {/* Desktop Dynamic Island - Center */}
          <div
            className="hidden md:flex gap-1.5 items-center justify-center pointer-events-auto absolute left-1/2 transform -translate-x-1/2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Center rotating title - fades out on hover */}
            <motion.div
              animate={{
                opacity: isHovered ? 0 : 1,
                scale: isHovered ? 0.8 : 1,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="absolute backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/80 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] px-3.5 py-1 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTitle}
                  initial={{
                    opacity: 0,
                    y: scrollDirection === 'down' ? 20 : scrollDirection === 'up' ? -20 : 0,
                    x: scrollDirection === 'right' ? 20 : scrollDirection === 'left' ? -20 : 0,
                  }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{
                    opacity: 0,
                    y: scrollDirection === 'down' ? -20 : scrollDirection === 'up' ? 20 : 0,
                    x: scrollDirection === 'right' ? -20 : scrollDirection === 'left' ? 20 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-xs text-white/70 font-medium whitespace-nowrap block text-center font-poppins"
                >
                  {rotatingTitles[currentTitle]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Pod 1: Funding */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : 40,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/80 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] px-3 py-1"
              style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            >
              <Link href="/#funding" className="text-xs text-white/80 hover:text-[var(--theme-accent)] transition-colors font-medium whitespace-nowrap font-poppins">
                Funding
              </Link>
            </motion.div>

            {/* Pod 2: Payments */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : 20,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/80 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] px-3 py-1"
              style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            >
              <Link href="/payments" className="text-xs text-white/80 hover:text-[var(--theme-accent)] transition-colors font-medium whitespace-nowrap font-poppins">
                Payments
              </Link>
            </motion.div>

            {/* Pod 3: Industries */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -20,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/80 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] px-3 py-1"
              style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            >
              <Link href="/industries" className="text-xs text-white/80 hover:text-[var(--theme-accent)] transition-colors font-medium whitespace-nowrap font-poppins">
                Industries
              </Link>
            </motion.div>

            {/* Pod 4: Get Started */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
                x: isHovered ? 0 : -40,
                scale: isHovered ? 1 : 0.8,
              }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="backdrop-blur-[20px] backdrop-saturate-[180%] bg-black/80 rounded-full border border-white/10 shadow-[0_4px_16px_rgba(0,0,0,0.3)] px-2.5 py-1"
              style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
            >
              <Link href="/get-started" className="text-white px-2.5 py-0.5 rounded-full text-xs font-bold border border-white/20 hover:border-[var(--theme-accent)] hover:bg-[var(--theme-accent)] transition-all duration-300 whitespace-nowrap inline-block font-poppins">
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between w-full pointer-events-auto">
            <Link href="/" className="flex items-center">
              <span className="sr-only">Split</span>
              <SplitLogo priority />
            </Link>

            <span className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] font-medium text-[var(--theme-text-secondary)] shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/10 dark:text-white/80">
              Navigation lives below
            </span>
          </div>

          <MobileOrbitNav items={mobileNavItems} />
        </header>

        {/* Hero */}
        <Hero />

        {/* Payments / POS */}
        <section
          id="pos"
          className="px-6 md:px-10 py-8 md:py-12 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-10 md:gap-0 md:min-h-[620px] border-b border-line/50"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full md:w-1/2 max-w-xl mx-auto md:mx-0 text-center md:text-left md:h-full md:flex md:flex-col md:justify-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-semibold leading-tight text-[var(--theme-text-primary)] mb-4">Payments built for every business</h2>
            <p className="text-lg font-lora text-[var(--theme-text-secondary)] mb-6 max-w-md mx-auto md:mx-0">
              POS, online, and mobile — fast, secure, and all connected to split.
            </p>
            <ul className="text-[var(--theme-text-secondary)] space-y-2 text-sm inline-block text-left font-lora">
              <li>✔ real-time reporting & reconciliation</li>
              <li>✔ competitive, transparent pricing</li>
              <li>✔ multi-location management</li>
            </ul>
          </motion.div>

          <ParallaxIllustration
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full md:w-1/2 flex justify-center md:justify-end md:h-full"
            offset={[-3, 9]}
          >
            <div className="relative w-full max-w-[540px] md:max-w-none aspect-[4/3] md:aspect-auto md:h-full md:min-h-[600px]">
              <Image
                src="/merchants.png"
                alt="merchants"
                fill
                className="object-contain object-center md:object-right-top"
                sizes="(min-width: 1280px) 50vw, (min-width: 768px) 52vw, 90vw"
              />
            </div>
          </ParallaxIllustration>
        </section>

        {/* Industries Carousel */}
        <IndustriesCarousel />

        {/* Footer */}
        <footer className="border-t border-line/50 px-6 md:px-10 py-8 text-xs text-muted flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© 2025 split payments, inc.</div>
          <div className="flex items-center gap-6">
            <a href="/policy">privacy</a>
            <a href="/terms">terms</a>
            <a href="/support">contact</a>
          </div>
        </footer>
      </div>
    </main>
  );
}

function MobileOrbitNav({ items }: { items: MobileNavItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const previewTimeout = useRef<NodeJS.Timeout | null>(null);
  const previewActivatedRef = useRef(false);
  const orbitProgress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(orbitProgress, 1, {
      duration: 32,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => {
      controls.stop();
    };
  }, [orbitProgress]);

  useEffect(() => {
    return () => {
      if (previewTimeout.current) {
        clearTimeout(previewTimeout.current);
      }
    };
  }, []);

  const handlePointerStart = useCallback(
    (index: number) => {
      previewActivatedRef.current = false;

      if (previewTimeout.current) {
        clearTimeout(previewTimeout.current);
      }

      previewTimeout.current = setTimeout(() => {
        previewActivatedRef.current = true;
        setPreviewIndex(index);
      }, 420);
    },
    [],
  );

  const handlePointerCancel = useCallback(() => {
    previewActivatedRef.current = false;
    if (previewTimeout.current) {
      clearTimeout(previewTimeout.current);
      previewTimeout.current = null;
    }
  }, []);

  const handlePointerEnd = useCallback(
    (index: number) => {
      if (previewActivatedRef.current) {
        if (previewTimeout.current) {
          clearTimeout(previewTimeout.current);
        }

        previewTimeout.current = setTimeout(() => {
          setPreviewIndex(null);
          previewActivatedRef.current = false;
        }, 1400);

        return;
      }

      handlePointerCancel();
      setPreviewIndex(null);
      setActiveIndex(index);
    },
    [handlePointerCancel],
  );

  useEffect(() => {
    setPreviewIndex(null);
    previewActivatedRef.current = false;
  }, [activeIndex]);

  const activeItem = items[activeIndex] ?? items[0];
  const activeChildren = activeItem?.children ?? [];
  const hasChildren = activeChildren.length > 0;
  const previewItem = previewIndex !== null ? items[previewIndex] : null;

  const childRingGroups = useMemo(() => {
    if (!hasChildren) {
      return [] as MobileNavChild[][];
    }

    if (activeChildren.length <= 4) {
      return [activeChildren] as MobileNavChild[][];
    }

    return [
      activeChildren.slice(0, 4),
      activeChildren.slice(4),
    ] as MobileNavChild[][];
  }, [activeChildren, hasChildren]);

  return (
    <div className="md:hidden">
      <div className="fixed inset-x-0 bottom-6 z-[60] flex justify-center px-4">
        <div className="relative w-full max-w-[420px]">
          <div className="pointer-events-none absolute inset-x-12 -top-14 h-32 rounded-full bg-gradient-to-t from-black/30 via-black/5 to-transparent dark:from-black/60" />

          <AnimatePresence>
            {previewItem && (
              <motion.div
                key={previewItem.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="pointer-events-none absolute bottom-[calc(100%+1.1rem)] left-1/2 w-[min(320px,calc(100vw-3rem))] -translate-x-1/2 overflow-hidden rounded-3xl border border-black/10 bg-white/90 shadow-[0_24px_60px_rgba(15,15,20,0.28)] backdrop-blur-2xl dark:border-white/10 dark:bg-black/75"
              >
                <PreviewMedia preview={previewItem.preview} />
                <div className="space-y-2 p-4">
                  <p className="text-sm font-semibold tracking-tight text-[var(--theme-text-primary)] dark:text-white">
                    {previewItem.label}
                  </p>
                  <p className="text-xs leading-relaxed text-[var(--theme-text-secondary)] dark:text-white/70">
                    {previewItem.description}
                  </p>
                  <Link
                    href={previewItem.href}
                    className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] font-medium text-[var(--theme-text-primary)] shadow-sm transition-opacity hover:opacity-80 dark:border-white/20 dark:bg-white/10 dark:text-white"
                  >
                    Open section
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pointer-events-auto relative flex flex-col items-center rounded-[36px] border border-black/10 bg-white/80 px-8 pt-6 pb-8 shadow-[0_28px_80px_rgba(15,15,20,0.32)] backdrop-blur-3xl dark:border-white/10 dark:bg-black/70">
            <div className="relative flex h-32 w-full items-center justify-center">
              <div className="pointer-events-none absolute inset-x-6 h-32 rounded-full border border-black/10 bg-gradient-to-br from-white/35 via-white/10 to-transparent dark:border-white/10 dark:from-white/10" />

              {items.map((item, index) => (
                <OrbitDot
                  key={item.label}
                  item={item}
                  index={index}
                  total={items.length}
                  radius={68}
                  progress={orbitProgress}
                  isActive={index === activeIndex}
                  onPressStart={() => handlePointerStart(index)}
                  onPressEnd={() => handlePointerEnd(index)}
                  onPressCancel={handlePointerCancel}
                />
              ))}

              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-black/10 bg-white/90 shadow-[0_12px_30px_rgba(15,15,20,0.22)] dark:border-white/20 dark:bg-black/80">
                <SplitLogo imageClassName="h-9 w-auto" />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeItem && (
                <motion.div
                  key={activeItem.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className="mt-6 flex flex-col items-center gap-3 text-center"
                >
                  <span className="text-sm font-semibold tracking-tight text-[var(--theme-text-primary)] dark:text-white">
                    {activeItem.label}
                  </span>
                  <p className="max-w-[240px] text-xs leading-relaxed text-[var(--theme-text-secondary)] dark:text-white/70">
                    {activeItem.description}
                  </p>
                  <Link
                    href={activeItem.href}
                    className="inline-flex items-center rounded-full bg-[var(--theme-accent)] px-5 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.02]"
                  >
                    Go now
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {hasChildren && (
              <motion.div
                key={activeItem.label}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="pointer-events-auto mx-auto mt-9 flex h-48 w-48 items-center justify-center"
              >
                <div className="absolute h-10 w-10 rounded-full border border-black/10 dark:border-white/10" />
                <div className="absolute h-24 w-24 rounded-full border border-black/10 opacity-60 dark:border-white/10" />
                <div className="absolute h-36 w-36 rounded-full border border-black/10 opacity-40 dark:border-white/10" />

                {childRingGroups.map((group, ringIndex) => (
                  <ChildRing
                    key={`${activeItem.label}-ring-${ringIndex}`}
                    links={group}
                    radius={ringIndex === 0 ? 88 : 134}
                    delayOffset={ringIndex * 0.12}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function OrbitDot({
  item,
  index,
  total,
  radius,
  progress,
  isActive,
  onPressStart,
  onPressEnd,
  onPressCancel,
}: {
  item: MobileNavItem;
  index: number;
  total: number;
  radius: number;
  progress: MotionValue<number>;
  isActive: boolean;
  onPressStart: () => void;
  onPressEnd: () => void;
  onPressCancel: () => void;
}) {
  const angle = useMemo(() => (total === 0 ? 0 : (index / total) * Math.PI * 2), [index, total]);
  const x = useTransform(progress, (latest) => Math.cos(angle + latest * Math.PI * 2) * radius);
  const y = useTransform(progress, (latest) => Math.sin(angle + latest * Math.PI * 2) * radius);

  return (
    <motion.button
      layout
      type="button"
      style={{ x, y }}
      className={`absolute top-1/2 left-1/2 flex h-11 -translate-x-1/2 -translate-y-1/2 items-center rounded-full border border-black/10 bg-white/85 text-xs font-medium text-[var(--theme-text-primary)] shadow-[0_14px_32px_rgba(15,15,20,0.24)] backdrop-blur-2xl transition-colors dark:border-white/10 dark:bg-black/70 dark:text-white ${isActive ? "gap-2 px-4 pr-5 bg-[var(--theme-accent)] text-white dark:bg-[var(--theme-accent)]" : "w-11 justify-center"}`}
      onPointerDown={onPressStart}
      onPointerUp={onPressEnd}
      onPointerLeave={onPressCancel}
      onPointerCancel={onPressCancel}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onPressEnd();
        }
      }}
      aria-label={item.label}
      aria-pressed={isActive}
    >
      <span
        aria-hidden
        className={`block h-2.5 w-2.5 rounded-full bg-gradient-to-br from-[var(--theme-accent)]/70 to-[var(--theme-accent)]/30 transition-colors dark:from-white/80 dark:to-white/40 ${isActive ? "bg-white dark:bg-white" : ""}`}
      />
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.span
            key="label"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="overflow-hidden whitespace-nowrap text-[11px] font-medium tracking-wide"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function ChildRing({
  links,
  radius,
  delayOffset = 0,
}: {
  links: MobileNavChild[];
  radius: number;
  delayOffset?: number;
}) {
  const total = links.length || 1;

  return (
    <>
      {links.map((link, index) => {
        const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={`${link.href}-${link.label}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              delay: delayOffset + index * 0.06,
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
            className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
            style={{ transform: `translate(${x}px, ${y}px)` }}
          >
            <Link
              href={link.href}
              aria-label={link.label}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/80 text-[var(--theme-text-primary)] shadow-[0_16px_36px_rgba(15,15,20,0.25)] backdrop-blur-xl transition-opacity hover:opacity-80 dark:border-white/10 dark:bg-black/70 dark:text-white"
            >
              <span className="text-[11px] font-semibold tracking-wide">
                {link.label.split(" ")[0]}
              </span>
            </Link>
            <span className="max-w-[90px] text-center text-[10px] font-medium text-[var(--theme-text-secondary)] dark:text-white/70">
              {link.label}
            </span>
          </motion.div>
        );
      })}
    </>
  );
}

function PreviewMedia({ preview }: { preview: MobileNavPreview }) {
  return (
    <div className="relative h-32 w-full overflow-hidden">
      <Image
        alt={preview.alt}
        src={preview.lightSrc}
        className="block h-full w-full object-cover dark:hidden"
        priority={false}
      />
      <Image
        alt={preview.alt}
        src={preview.darkSrc}
        className="hidden h-full w-full object-cover dark:block"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
    </div>
  );
}
