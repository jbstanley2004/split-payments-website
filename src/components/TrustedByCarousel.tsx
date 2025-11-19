"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const brandLogos = [
  "/brand_images/global/svg0.svg",
  "/brand_images/global/svg1.svg",
  "/brand_images/global/svg2.svg",
  "/brand_images/global/svg3.svg",
  "/brand_images/global/svg4.svg",
  "/brand_images/global/svg5.svg",
  "/brand_images/global/svg6.svg",
  "/brand_images/global/svg7.svg",
  "/brand_images/global/svg8.svg",
  "/brand_images/global/svg9.svg",
  "/brand_images/global/svg10.svg",
  "/brand_images/global/svg11.svg",
];

export default function TrustedByCarousel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="mt-16 w-full"
    >
      <div className="text-xs font-medium text-[#161616] uppercase tracking-wider font-semibold text-center mb-8">
        We Work With
      </div>
      
      {/* Carousel Container */}
      <div className="relative overflow-hidden w-full">
        <div className="flex items-center gap-8 md:gap-12 animate-scroll">
          {/* Duplicate logos for seamless loop */}
          {[...brandLogos, ...brandLogos].map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="flex-shrink-0"
            >
              <Image
                src={logo}
                alt={`Brand ${index}`}
                width={100}
                height={50}
                className="opacity-70 hover:opacity-100 transition-opacity duration-300 object-contain h-8 w-auto"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          display: flex;
          width: fit-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </motion.div>
  );
}
