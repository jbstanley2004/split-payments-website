"use client";

import React, { useState, useRef } from "react";
import "./WaterRipple.css";

interface WaterRippleProps {
  children: React.ReactNode;
}

export function WaterRipple({ children }: WaterRippleProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    // Only trigger animation if not already animating
    if (!isAnimating) {
      setIsAnimating(true);

      // Clear any existing timeout
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      // Reset animation state after the longest animation completes (6.5s)
      // This is ripple-5: 4.6s duration + 1.9s delay = 6.5s total
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 6500);
    }
  };

  return (
    <div
      className="water-ripple-container"
      onMouseEnter={handleMouseEnter}
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
