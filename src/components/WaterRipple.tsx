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
      {/* Ripple effect overlay */}
      <div className={`ripple-effect ${isHovered ? "active" : ""}`}>
        <div className="ripple ripple-1"></div>
        <div className="ripple ripple-2"></div>
        <div className="ripple ripple-3"></div>
      </div>

      {/* Button content */}
      {children}
    </div>
  );
}
