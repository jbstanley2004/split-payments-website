"use client";

import React from "react";
import RippleShaders from "@/components/ui/ripple-shaders";

interface WaterRippleProps {
  // The imageUrl prop is no longer needed with RippleShaders
}

export function WaterRipple({}: WaterRippleProps) {
  const waterMaskStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0% 100%)',
    zIndex: 5,
  };

  return (
    <div style={waterMaskStyle}>
      <RippleShaders
        speed={1.2}
        intensity={1.5}
        colorScheme={[0.1, 0.5, 1.0]}
        rippleCount={4}
        frequency={1.0}
      />
    </div>
  );
}
