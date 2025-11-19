"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Use the Capital Offer card (black) as the main card, and a single SVG card for the stack
const MAIN_CARD_IMAGE = "/capital-offer-desktop.svg";

// Use the same card repeatedly for a clean, graphic fan effect.
// If a different SVG works better visually, swap the path here.
const STACK_CARD_IMAGE = "/svg/cards/card-3.svg";

// How many echo cards to render in the stack behind the main card
const ECHO_CARD_COUNT = 11;

type EchoCardConfig = {
  index: number;
  zIndex: number;
  baseScale: number;
  baseY: number;
  baseX: number;
  baseOpacity: number;
};

export default function CardStackAnimation() {
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0); // -1 (left) to 1 (right)
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const relativeX = (event.clientX - centerX) / (rect.width / 2 || 1);
    // Clamp to [-1, 1] for stability
    const clamped = Math.max(-1, Math.min(1, relativeX));
    setDirection(clamped);
  };

  // Precompute configs so each card has slightly different offsets and opacity,
  // creating a smooth depth gradient and parallax-like feel.
  const echoCards = useMemo<EchoCardConfig[]>(() => {
    const cards: EchoCardConfig[] = [];
    for (let i = 0; i < ECHO_CARD_COUNT; i++) {
      const depthFromBack = i; // 0 = very back, increases toward front
      const depthRatio = depthFromBack / (ECHO_CARD_COUNT - 1 || 1);

      // Vertical offset: deeper cards sink lower
      const baseY = 70 - depthRatio * 40; // ~70px -> ~30px

      // Horizontal offset: cards appear to slide in from the right initially
      const baseX = 80 - depthRatio * 70; // ~80px -> ~10px

      // Scale: subtle growth toward the front
      const baseScale = 0.8 + depthRatio * 0.16; // 0.8 -> ~0.96

      // Opacity: slightly darker and softer in the distance
      const baseOpacity = 0.18 + depthRatio * 0.45; // 0.18 -> ~0.63

      cards.push({
        index: i,
        zIndex: i + 1,
        baseScale,
        baseY,
        baseX,
        baseOpacity,
      });
    }
    return cards;
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-[340px] md:w-[440px] lg:w-[520px] h-[320px] md:h-[340px] flex items-center justify-center perspective-1000"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Stack Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Large echo stack */}
        {echoCards.map((card) => {
          const t = card.index / (ECHO_CARD_COUNT - 1 || 1);

          // All cards are vertically fanned downward; horizontal offset is driven by cursor direction.
          const verticalOffset = t * 90; // ~0 -> ~90px
          const depthScale = 1 - t * 0.04; // slight shrink as cards go back
          const depthOpacity = 0.75 - t * 0.45; // fade into the stack

          // Horizontal fan: direction (-1..1) nudges cards left/right more as they get deeper.
          const directionalOffset = direction * (8 + t * 20);

          const hoverOpacity = isHovered ? depthOpacity * 0.95 : depthOpacity;
          const hoverScale = isHovered ? depthScale + 0.01 : depthScale;

          return (
            <motion.div
              key={card.index}
              initial={{
                opacity: 0,
                scale: depthScale * 0.96,
                y: verticalOffset + 40,
                x: directionalOffset * 0.3,
              }}
              animate={{
                opacity: hoverOpacity,
                scale: hoverScale,
                y: verticalOffset + (isHovered ? -4 : 0),
                x: directionalOffset,
              }}
              transition={{
                delay: 0.06 + card.index * 0.05,
                duration: 0.7,
                ease: "easeOut",
              }}
              className="absolute w-[88%] max-w-[360px] md:max-w-[420px] aspect-[1.586]"
              style={{ zIndex: card.zIndex }}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/12 bg-black">
                <Image
                  src={STACK_CARD_IMAGE}
                  alt={`Echo Card ${card.index + 1}`}
                  fill
                  className="object-cover"
                />
                {/* Tone down and tint back cards so they feel recessed */}
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background:
                      "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.1), transparent 55%)",
                    opacity: 0.7 - t * 0.35,
                  }}
                />
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.7)",
                    opacity: 0.4 + t * 0.25,
                  }}
                />
              </div>
            </motion.div>
          );
        })}

        {/* Main Card (Black Capital Offer) */}
        <motion.div
          initial={{ opacity: 0, y: -10, x: 0, scale: 0.96 }}
          animate={{
            opacity: 1,
            y: isHovered ? -16 : -8,
            x: direction * 4,
            scale: isHovered ? 1.03 : 1,
            rotate: direction * 1.2,
            boxShadow: isHovered
              ? "0 32px 110px rgba(0,0,0,0.9)"
              : "0 24px 80px rgba(0,0,0,0.8)",
          }}
          transition={{
            delay: 0.06 + ECHO_CARD_COUNT * 0.05,
            duration: 0.85,
            type: "spring",
            stiffness: 130,
            damping: 22,
          }}
          className="absolute w-[90%] max-w-[380px] md:max-w-[440px] aspect-[1.586] cursor-pointer"
          style={{ zIndex: ECHO_CARD_COUNT + 5 }}
        >
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black">
            <Image
              src={MAIN_CARD_IMAGE}
              alt="Capital Offer"
              fill
              className="object-contain bg-black"
            />
          </div>
        </motion.div>

        {/* Soft base glow to ground the stack */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.9 : 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pointer-events-none absolute -bottom-10 left-1/2 h-32 w-[80%] -translate-x-1/2 blur-3xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.9), transparent 70%)",
            zIndex: 0,
          }}
        />
      </div>
    </motion.div>
  );
}
