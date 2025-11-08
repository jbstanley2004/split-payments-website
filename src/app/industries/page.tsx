"use client";

import { SplitLogo } from "@/components/split-logo";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";

export default function IndustriesPage() {
  const ref = useRef(null);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTimeRef = useRef<number>(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
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
  const industries = [
    {
      title: "Restaurants",
      description:
        "Enhance the dining experience with flexible payment options, from tableside payments to online ordering.",
      image: "/industries/restaurants.webp",
    },
    {
      title: "Auto Repair",
      description:
        "From the front desk to the service bay, accept payments easily and get customers back on the road faster.",
      image: "/industries/car_repair.webp",
    },
    {
      title: "Retail & Clothing",
      description:
        "Boost sales and improve customer flow with our integrated POS and payment solutions for clothing boutiques.",
      image: "/industries/clothing.webp",
    },
    {
      title: "Pharmacies & Healthcare",
      description:
        "Provide a seamless and secure payment process for patients with our HIPAA-compliant solutions.",
      image: "/industries/pharmacy.webp",
    },
    {
      title: "Home Goods & Furniture",
      description:
        "Support big-ticket purchases and manage complex inventories with our versatile retail payment systems.",
      image: "/industries/home_goods_furniture.webp",
    },
    {
      title: "Salons & Spas",
      description:
        "Let clients book and pay with ease, so you can focus on providing exceptional beauty and wellness services.",
      image: "/industries/hair_beauty.webp",
    },
    {
      title: "Hotels & Hospitality",
      description:
        "From check-in to check-out, offer guests a smooth and secure payment experience for their stay.",
      image: "/industries/hotels.webp",
    },
    {
      title: "Franchises",
      description:
        "Standardize payment processing across all your locations with our scalable and easy-to-manage franchise solutions.",
      image: "/industries/franchise.webp",
    },
    {
      title: "Convenience Stores",
      description:
        "Streamline checkout and manage inventory with our fast and reliable payment solutions for convenience stores.",
      image: "/industries/convenience_store.webp",
    },
    {
      title: "Professional Services",
      description:
        "Simplify client billing and invoicing with our secure online payment portals for professional firms.",
      image: "/industries/professional_services.webp",
    },
  ];

  return (
    <main ref={ref} className="relative min-h-screen font-jetbrains text-text">
      {/* Fixed Parallax Background */}
      <motion.div
        style={{ y }}
        className="fixed inset-0 z-0"
      >
        <Image
          src="/industries-hero.png"
          alt="Industries We Serve"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-bg/70" />
      </motion.div>

      {/* All content with relative positioning */}
      <div className="relative z-10">
        {/* Dynamic Island Header */}
        <header className="fixed top-3 left-0 right-0 z-50 flex items-center justify-between px-6 pointer-events-none">
          {/* Desktop Logo - Left Side */}
          <Link href="/" className="flex items-center pointer-events-auto">
            <SplitLogo imageClassName="h-11 w-auto" priority />
          </Link>

          {/* Dynamic Island - Center */}
          <div
            className="flex gap-1.5 items-center justify-center pointer-events-auto absolute left-1/2 transform -translate-x-1/2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Center rotating title */}
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
              <a href="/#funding" className="text-xs text-white/80 hover:text-[var(--theme-accent)] transition-colors font-medium whitespace-nowrap font-poppins">Funding</a>
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
              <Link href="/payments" className="text-xs text-white/80 hover:text-[var(--theme-accent)] transition-colors font-medium whitespace-nowrap font-poppins">Payments</Link>
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
              <Link href="/industries" className="text-xs text-white/80 hover:text-[var(--theme-accent)] transition-colors font-medium whitespace-nowrap font-poppins">Industries</Link>
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
        </header>

        {/* Hero */}
        <section className="px-6 md:px-10 py-32 md:py-48 min-h-[80vh] flex items-center border-b border-line/50">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl leading-tight mb-6">
              Industries We Serve
            </h1>
            <p className="text-muted text-lg md:text-xl mb-8">
              We provide tailored payment solutions for a wide range of businesses.
              Our broad partnerships and industry relationships enable us to deliver
              the most effective and affordable services for your needs.
            </p>
          </motion.div>
        </section>

        {/* Industries Grid */}
        <section className="px-6 md:px-10 py-16 md:py-24 border-b border-line/50">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-line overflow-hidden hover:border-muted transition-colors flex flex-col bg-bg/80 backdrop-blur-sm"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-medium mb-3">{industry.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {industry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 md:px-10 py-16 md:py-24 border-b border-line/50">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto border border-line p-12 bg-bg/80 backdrop-blur-sm"
          >
            <h2 className="text-3xl md:text-4xl mb-4">Don't See Your Industry?</h2>
            <p className="text-muted mb-8 text-lg">
              We support many other business types, including high-risk industries.
              Request a free comparison to see how we can help.
            </p>
            <Link href="/get-started" className="btn inline-block">
              Request a Free Comparison
            </Link>
          </motion.div>
        </section>

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
