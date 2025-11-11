"use client";
import { motion, useAnimationControls, PanInfo } from "framer-motion";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

const industries = [
  "/industries/car_repair.webp",
  "/industries/clothing.webp",
  "/industries/convenience_store.webp",
  "/industries/franchise.webp",
  "/industries/hair_beauty.webp",
  "/industries/home_goods_furniture.webp",
  "/industries/hotels.webp",
  "/industries/pharmacy.webp",
  "/industries/professional_services.webp",
  "/industries/restaurants.webp",
];

export default function IndustriesCarousel() {
  const [isMobile, setIsMobile] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const controls = useAnimationControls();
  const isDragging = useRef(false);

  // detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Hide swipe hint after first interaction or after 5 seconds
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => setShowSwipeHint(false), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowSwipeHint(false);
    }
  }, [isMobile]);

  const duration = isMobile ? 45 : 35;

  // start motion
  useEffect(() => {
    if (!isDragging.current) {
      controls.start({
        x: ["0%", "-100%"],
        transition: {
          duration,
          ease: "linear",
          repeat: Infinity,
        },
      });
    }
  }, [controls, duration]);

  // pause / resume on hover
  const handleMouseEnter = () => {
    if (!isMobile) controls.stop();
  };
  const handleMouseLeave = () => {
    if (!isMobile)
      controls.start({
        x: ["0%", "-100%"],
        transition: {
          duration,
          ease: "linear",
          repeat: Infinity,
        },
      });
  };

  // Handle drag on mobile
  const handleDragStart = () => {
    if (isMobile) {
      isDragging.current = true;
      controls.stop();
      setShowSwipeHint(false);

      // Haptic feedback
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(10);
      }
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (isMobile) {
      isDragging.current = false;

      // Satisfying release haptic
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate([8, 10, 8]); // Double pulse on release
      }

      // Resume auto-scroll after drag
      controls.start({
        x: ["0%", "-100%"],
        transition: {
          duration,
          ease: "linear",
          repeat: Infinity,
        },
      });
    }
  };

  return (
    <section
      className="relative overflow-hidden bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-800 pt-6 pb-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="text-center text-gray-800 dark:text-gray-200 text-2xl font-medium mb-10 font-poppins">
        Industries We Power
      </h2>

      {/* Swipe hint indicator - mobile only */}
      {isMobile && showSwipeHint && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="text-center mb-4"
        >
          <span className="text-sm text-gray-500 dark:text-gray-400 font-poppins inline-flex items-center gap-2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="animate-[slide_1.5s_ease-in-out_infinite]"
            >
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            Swipe to explore
          </span>
        </motion.div>
      )}

      <div className="flex overflow-hidden whitespace-nowrap">
        <motion.div
          className="flex gap-8 sm:gap-6 md:gap-8"
          animate={controls}
          drag={isMobile ? "x" : false}
          dragConstraints={{ left: -2000, right: 0 }}
          dragElastic={0.1}
          dragMomentum={true}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ cursor: isMobile ? "grab" : "default" }}
        >
          {[...industries, ...industries].map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-[140px] sm:h-[200px] md:h-[240px] w-auto"
            >
              <Image
                src={src}
                alt={`Industry ${(i % industries.length) + 1}`}
                width={400}
                height={300}
                className="h-full w-auto object-contain rounded-lg"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Edge gradients for clean fade */}
      <div className="pointer-events-none absolute top-0 left-0 h-full w-40 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent" />
      <div className="pointer-events-none absolute top-0 right-0 h-full w-40 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent" />
    </section>
  );
}
