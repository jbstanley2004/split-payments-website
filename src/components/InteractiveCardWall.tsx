"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { CARDS } from "@/data/cards";
import { useEffect, useState } from "react";

export default function InteractiveCardWall() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effect: Move the background slightly slower than scroll
  // or just have a subtle float effect. 
  // Since the page can be long, we'll use a minimal movement to avoid running out of cards
  // or rely on the 'fixed' positioning which creates a natural parallax against scrolling content.
  const y = useTransform(scrollY, [0, 1000], [0, -50]); 

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Generate enough cards to fill a large screen density
  // We duplicate the CARDS array multiple times
  const displayCards = Array(10).fill(CARDS).flat().slice(0, 150);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-brand-gray">
        {/* 
            We enable pointer-events-auto on the grid so hover effects work, 
            but the container passes clicks through to underlying elements if needed 
            (though this is the background layer).
        */}
      <motion.div 
        style={{ y }} 
        className="w-full h-[120vh] -mt-[10vh] grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-0 p-0 pointer-events-auto"
      >
        {displayCards.map((card, idx) => (
          <motion.div
            key={`${card.name}-${idx}`}
            className="relative aspect-[1.586] w-full rounded-lg overflow-hidden shadow-sm bg-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: Math.min(idx * 0.005, 1) }} // Cap delay so bottom cards don't take forever
            whileHover={{ 
              scale: 1.5, 
              zIndex: 50,
              transition: { duration: 0.2 }
            }}
          >
            <Image
              src={card.image}
              alt={card.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 33vw, (max-width: 1200px) 16vw, 10vw"
            />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Beige Overlay Removed for cleaner look */}
    </div>
  );
}
