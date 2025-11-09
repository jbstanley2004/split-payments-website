"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

/**
 * HeroBackground Component
 *
 * Renders the hero background with fallback options:
 * 1. Custom generated image (hero-bg.webp) - Unreal/Ghibli style
 * 2. CSS gradient fallback (if image not found)
 *
 * Usage: Replace .hero-bg div in page.tsx with <HeroBackground />
 */

export function HeroBackground() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Check if custom hero image exists
  useEffect(() => {
    const img = new window.Image();
    img.src = "/hero-bg.webp";
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, []);

  return (
    <div className="hero-bg" aria-hidden="true">
      {/* If custom image exists, use it */}
      {imageLoaded && !imageError && (
        <Image
          src="/hero-bg.webp"
          alt=""
          fill
          priority
          quality={90}
          className="hero-bg-image"
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      )}

      {/* CSS gradient layers (always present for blending/fallback) */}
      <div className="hero-bg-gradient" />

      <style jsx>{`
        .hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.95;
        }

        .hero-bg-gradient {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(140px 140px at 72% 18%, var(--accent-1) 0%, transparent 60%),
            radial-gradient(90px 90px at 78% 24%, rgba(255, 255, 255, 0.18) 0%, transparent 60%),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.06), transparent 30%),
            conic-gradient(
              from 200deg at 28% 110%,
              rgba(255, 255, 255, 0.04),
              transparent 55%,
              rgba(255, 255, 255, 0.04)
            );
          filter: saturate(1.02);
          animation: drift 26s linear infinite;
        }

        .hero-bg-gradient::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(50% 40% at 10% 20%, rgba(255, 255, 255, 0.06) 0%, transparent 70%),
            radial-gradient(40% 30% at 80% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
          animation: drift 26s linear infinite;
        }

        .hero-bg-gradient::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(70% 60% at -10% 120%, rgba(255, 255, 255, 0.03) 0%, transparent 60%),
            radial-gradient(60% 60% at 120% 130%, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
          transform: translateY(6%);
          animation: parallax 18s ease-in-out infinite;
        }

        /* If image is loaded, blend it with gradients */
        .hero-bg :global(.hero-bg-image) {
          mix-blend-mode: overlay;
          opacity: 0.8;
        }

        @keyframes drift {
          from { transform: translateX(-3%); }
          to { transform: translateX(3%); }
        }

        @keyframes parallax {
          0%, 100% { transform: translateY(6%); }
          50% { transform: translateY(2%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-bg-gradient,
          .hero-bg-gradient::before,
          .hero-bg-gradient::after {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
