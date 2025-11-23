"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroAnimation() {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      {/* Main Dashboard Graphic */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 w-full max-w-[600px] rounded-2xl shadow-2xl overflow-hidden border border-gray-100 bg-white mx-4"
      >
        <Image
          src="/brand_images/funding/json-example-platform.svg"
          alt="Split Platform Dashboard"
          width={600}
          height={400}
          className="w-full h-auto"
        />

        {/* Simulated UI Interaction Pulse */}
        <motion.div
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"
        />
      </motion.div>

      {/* Mobile App Graphic - Floating Effect */}
      <motion.div
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="absolute -bottom-10 -right-4 md:-right-10 z-20 w-[180px] md:w-[250px] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border-4 border-white bg-white"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/brand_images/funding/mobile-screenshot.svg"
            alt="Split Mobile App"
            width={250}
            height={500}
            className="w-full h-auto"
          />
        </motion.div>
      </motion.div>

      {/* Connecting Lines/Particles */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <motion.path
          d="M 400 300 Q 500 300 550 450"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="10 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />
      </svg>
    </div>
  );
}
