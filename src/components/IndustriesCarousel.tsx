"use client";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  const controls = useAnimationControls();

  // detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const duration = isMobile ? 45 : 35;

  // start motion
  useEffect(() => {
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
      },
    });
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

  return (
    <section
      className="relative overflow-hidden bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-gray-800 py-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="text-center text-gray-800 dark:text-gray-200 text-2xl font-medium mb-10 font-poppins">
        Industries We Power
      </h2>

      <div className="flex overflow-hidden whitespace-nowrap">
        <motion.div
          className="flex gap-8 sm:gap-6 md:gap-8"
          animate={controls}
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
