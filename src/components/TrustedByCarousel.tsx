"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const brandLogos = [
  "/brand_logos/svg0.svg",
  "/brand_logos/svg1.svg",
  "/brand_logos/svg2.svg",
  "/brand_logos/svg7.svg",
  "/brand_logos/svg15.svg",
  "/brand_logos/svg18.svg",
  "/brand_logos/svg19.svg",
  "/brand_logos/svg33.svg",
  "/brand_logos/svg34.svg",
  "/brand_logos/svg35.svg",
  "/brand_logos/svg36.svg",
  "/brand_logos/svg37.svg",
  "/brand_logos/svg92.svg",
];

export default function TrustedByCarousel() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className="mt-16 w-full"
    >
      {/* Carousel Container */}
      <div
        className="relative overflow-hidden w-full"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        {/* Removed overlay divs for cleaner mask-based transition */}

        <div className="flex items-center gap-16 md:gap-24 animate-scroll w-max">
          {/* Duplicate logos for seamless loop - tripled to ensure coverage */}
          {[...brandLogos, ...brandLogos, ...brandLogos].map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="flex-shrink-0"
            >
              <Image
                src={logo}
                alt={`Brand ${index}`}
                width={120}
                height={60}
                className="object-contain h-10 w-auto"
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
