"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlackCardSvg, WhiteCardSvg } from "./CardAssets";

export default function PaymentHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current === 0 ? 1 : 0));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[400px] w-full max-w-[500px] flex items-center justify-center perspective-1000">
      {/* White Card (Background/Foreground) */}
      <motion.div
        className="absolute w-[340px]"
        initial={{ y: 0, scale: 0.95, zIndex: 0, opacity: 0.5 }}
        animate={{
          y: activeIndex === 0 ? 40 : -20,
          scale: activeIndex === 0 ? 0.95 : 1,
          zIndex: activeIndex === 0 ? 0 : 10,
          opacity: activeIndex === 0 ? 0.6 : 1,
          rotateX: activeIndex === 0 ? 5 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="rounded-2xl shadow-2xl bg-white">
            <WhiteCardSvg />
        </div>
      </motion.div>

      {/* Black Card (Foreground/Background) */}
      <motion.div
        className="absolute w-[340px]"
        initial={{ y: 0, scale: 1, zIndex: 10, opacity: 1 }}
        animate={{
          y: activeIndex === 1 ? 40 : -20,
          scale: activeIndex === 1 ? 0.95 : 1,
          zIndex: activeIndex === 1 ? 0 : 10,
          opacity: activeIndex === 1 ? 0.6 : 1,
          rotateX: activeIndex === 1 ? 5 : 0,
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="rounded-2xl shadow-2xl shadow-black/20 bg-brand-black">
            <BlackCardSvg />
        </div>
      </motion.div>
      
      {/* Floating Elements / Particles */}
       <motion.div
        className="absolute top-0 right-0 w-12 h-12 bg-brand-gray rounded-full opacity-50 blur-xl"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}
