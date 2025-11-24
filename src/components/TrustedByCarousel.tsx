"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useInViewport } from "@/hooks/useInViewport";

// Full list of brand logos
const ALL_LOGOS = [
  "/brand_animations/pax.svg",
  "/brand_animations/clover_1.svg",
  "/brand_animations/clover_2.svg",
  "/brand_animations/verifone_1.svg",
  "/brand_animations/verifone_2.svg",
  "/brand_animations/dejavoo.webp",
  "/brand_animations/ingenico.svg",
  "/brand_animations/quickbooks.svg",
  "/brand_animations/authorize.svg",
  "/brand_animations/nmi.svg",
  "/brand_animations/svg0.svg",
  "/brand_animations/svg1.svg",
  "/brand_animations/svg2.svg",
  "/brand_animations/svg7.svg",
  "/brand_animations/svg15.svg",
  "/brand_animations/svg18.svg",
  "/brand_animations/svg19.svg",
  "/brand_animations/svg33.svg",
  "/brand_animations/svg34.svg",
  "/brand_animations/svg35.svg",
  "/brand_animations/svg36.svg",
  "/brand_animations/svg37.svg",
  "/brand_animations/svg92.svg",
];

export default function TrustedByCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInViewport = useInViewport(containerRef);

  // Responsive column count - we'll handle this by rendering a fixed number 
  // and letting CSS grid handle the layout, but for the "living" aspect 
  // we need to know how many slots we have.
  // Let's assume a max of 8 slots for desktop, 4 for mobile.
  // To keep it simple and robust, we'll initialize with enough items for desktop
  // and hide some via CSS if needed, or just show them all in a responsive grid.
  // The user asked for "one row", so we should try to fit them.
  // On mobile, 8 items in one row is too small. 
  // Maybe 4 items on mobile, 8 on desktop?
  // But the state needs to match the rendered slots.

  // Let's use a window resize listener or just pick a safe number like 6 or 8 
  // and allow them to wrap if necessary? No, user said "one row".
  // So on mobile we might only show 3 or 4.
  // Let's use a state that updates on mount/resize to determine slot count.

  const [slotCount, setSlotCount] = useState(4); // Default to mobile count
  const [activeLogos, setActiveLogos] = useState<string[]>([]);

  useEffect(() => {
    const updateSlots = () => {
      // md breakpoint is typically 768px
      if (window.innerWidth >= 1024) {
        setSlotCount(8);
      } else if (window.innerWidth >= 768) {
        setSlotCount(6);
      } else {
        setSlotCount(4);
      }
    };

    // Initial set
    updateSlots();

    // Initialize logos
    setActiveLogos(ALL_LOGOS.slice(0, window.innerWidth >= 1024 ? 8 : (window.innerWidth >= 768 ? 6 : 4)));

    window.addEventListener('resize', updateSlots);
    return () => window.removeEventListener('resize', updateSlots);
  }, []);

  // Update active logos when slot count changes
  useEffect(() => {
    setActiveLogos(prev => {
      if (prev.length === slotCount) return prev;
      if (prev.length > slotCount) return prev.slice(0, slotCount);
      // If we need more, add unique ones
      const needed = slotCount - prev.length;
      const available = ALL_LOGOS.filter(l => !prev.includes(l));
      return [...prev, ...available.slice(0, needed)];
    });
  }, [slotCount]);

  useEffect(() => {
    if (!isInViewport || activeLogos.length === 0) return;

    const interval = setInterval(() => {
      setActiveLogos(current => {
        const newLogos = [...current];
        const randomSlotIndex = Math.floor(Math.random() * current.length);

        // Find logos not currently visible
        const availableLogos = ALL_LOGOS.filter(logo => !current.includes(logo));

        if (availableLogos.length > 0) {
          const randomLogo = availableLogos[Math.floor(Math.random() * availableLogos.length)];
          newLogos[randomSlotIndex] = randomLogo;
        }

        return newLogos;
      });
    }, 2000); // Swap every 2 seconds

    return () => clearInterval(interval);
  }, [isInViewport, activeLogos.length]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="mt-16 w-full px-4 md:px-0"
    >
      <div className="w-full grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-8 items-center justify-items-center">
        {activeLogos.map((logo, index) => (
          <LogoCell key={`${index}`} logo={logo} />
        ))}
      </div>
    </motion.div>
  );
}

function LogoCell({ logo }: { logo: string }) {
  return (
    <div className="w-full h-12 relative flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={logo}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(4px)" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src={logo}
            alt="Brand Logo"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 25vw, (max-width: 1024px) 16vw, 12vw"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
