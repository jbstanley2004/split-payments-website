"use client";

import React, { useState } from "react";
import "./WaterRipple.css";

interface WaterRippleProps {
  children: React.ReactNode;
}

export function WaterRipple({ children }: WaterRippleProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="water-ripple-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      <div className={`ripple-effect ${isHovered ? "active" : ""}`}>
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
