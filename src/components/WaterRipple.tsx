"use client";

import React, { useState, useRef, useEffect } from "react";
import "./WaterRipple.css";

interface WaterRippleProps {
  children: React.ReactNode;
}

export function WaterRipple({ children }: WaterRippleProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile and reduced motion preferences
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener("resize", checkMobile);

    // Listen for reduced motion preference changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const triggerAnimation = () => {
    // Skip animation if user prefers reduced motion
    if (prefersReducedMotion) return;

    // Only trigger animation if not already animating
    if (!isAnimating) {
      setIsAnimating(true);

      // Haptic feedback - fires immediately with the ripple
      if (typeof navigator !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(15);
      }

      // Clear any existing timeout
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      // Reset animation state after the longest animation completes
      // Mobile: shorter duration (4s), Desktop: full duration (6.5s)
      const animationDuration = isMobile ? 4000 : 6500;
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, animationDuration);
    }
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      triggerAnimation();
    }
  };

  const handleClick = () => {
    if (isMobile) {
      triggerAnimation();
    }
  };

  return (
    <div
      className="water-ripple-container"
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      {/* SVG filter for water distortion effect */}
      <svg className="water-filter" width="0" height="0">
        <defs>
          <filter id="waterDistortion">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="3"
              result="turbulence"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Multiple ripple layers for realistic water effect */}
      <div className={`ripple-effect ${isAnimating ? "active" : ""}`}>
        {/* Primary ripples - main wave propagation */}
        <div className="ripple-wave ripple-1"></div>
        <div className="ripple-wave ripple-2"></div>
        <div className="ripple-wave ripple-3"></div>
        <div className="ripple-wave ripple-4"></div>
        <div className="ripple-wave ripple-5"></div>

        {/* Secondary ripples - smaller interference patterns */}
        <div className="ripple-secondary secondary-1"></div>
        <div className="ripple-secondary secondary-2"></div>
        <div className="ripple-secondary secondary-3"></div>

        {/* Distortion overlay */}
        <div className="water-distortion"></div>
      </div>

      {/* Button content */}
      {children}
    </div>
  );
}
