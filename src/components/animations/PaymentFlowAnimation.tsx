"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Floating animation variants
const float = (delay: number) => ({
  y: [0, -15, 0],
  rotate: [0, 2, -1, 0],
  transition: {
    duration: 5,
    delay: delay,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as any,
  },
});

export default function PaymentFlowAnimation() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center overflow-visible perspective-[1000px]">
      
      {/* Central Card - The "Hero" Payment */}
      <motion.div
        animate={float(0)}
        className="relative z-30 w-72 h-44 bg-black rounded-2xl shadow-2xl flex flex-col justify-between p-6 text-white border border-gray-800"
      >
        <div className="flex justify-between items-start">
            <div className="w-10 h-6 bg-gray-700 rounded opacity-50" />
            <span className="font-mono text-lg tracking-widest">**** 4242</span>
        </div>
        <div className="flex justify-between items-end">
            <div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Balance</div>
                <div className="text-2xl font-bold">$12,450.00</div>
            </div>
            <div className="w-8 h-8 bg-white rounded-full opacity-80" />
        </div>
      </motion.div>

      {/* Background Card 1 - Left */}
      <motion.div
        animate={float(1.5)}
        className="absolute top-20 left-10 z-20 w-56 h-36 bg-white rounded-xl shadow-xl border border-gray-200 p-4 flex flex-col justify-between rotate-[-12deg] opacity-90"
      >
         <div className="w-8 h-8 bg-blue-600 rounded-full mb-2" />
         <div className="h-2 w-24 bg-gray-100 rounded mb-2" />
         <div className="h-2 w-16 bg-gray-100 rounded" />
      </motion.div>

      {/* Background Card 2 - Right */}
      <motion.div
        animate={float(2.5)}
        className="absolute bottom-24 right-0 z-20 w-60 h-40 bg-white rounded-xl shadow-xl border border-gray-200 p-5 flex flex-col justify-between rotate-[8deg] opacity-95"
      >
         <div className="flex justify-between">
             <div className="w-12 h-4 bg-gray-200 rounded" />
             <div className="text-green-500 font-bold text-xs">+ $850.00</div>
         </div>
         <div className="space-y-2">
            <div className="w-full h-8 bg-gray-50 rounded border border-gray-100" />
            <div className="w-full h-8 bg-gray-50 rounded border border-gray-100" />
         </div>
      </motion.div>

      {/* Floating Terminal Icon - Top Right */}
      <motion.div
        animate={float(0.8)}
        className="absolute top-10 right-20 z-10 w-24 h-24 bg-gray-50 rounded-2xl shadow-lg border border-gray-200 flex items-center justify-center rotate-[5deg]"
      >
         <Image 
            src="/brand_images/products/ingenico/terminal1.webp"
            alt="Terminal"
            width={60}
            height={90}
            className="object-contain"
         />
      </motion.div>

      {/* Floating Graphic - Bottom Left */}
      <motion.div
        animate={float(3)}
        className="absolute bottom-10 left-20 z-10 w-20 h-20 bg-blue-600 rounded-2xl shadow-lg flex items-center justify-center rotate-[-5deg]"
      >
         <div className="text-white font-bold text-2xl">%</div>
      </motion.div>

    </div>
  );
}
