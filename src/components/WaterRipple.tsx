"use client";

import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "jquery.ripples";
import "./WaterRipple.css";

interface WaterRippleProps {
  imageUrl: string;
}

export function WaterRipple({ imageUrl }: WaterRippleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rippleElement = containerRef.current;
    if (typeof window !== "undefined" && rippleElement) {
      try {
        ($(rippleElement) as any).ripples({
          imageUrl: imageUrl,
          resolution: 512,
          dropRadius: 20,
          perturbance: 0.04,
        });
      } catch (e) {
        console.error("Error initializing ripples:", e);
      }
    }

    return () => {
      if (typeof window !== "undefined" && rippleElement) {
        try {
          ($(rippleElement) as any).ripples('destroy');
        } catch(e) {
          console.error("Error destroying ripples:", e);
        }
      }
    };
  }, [imageUrl]);

  return (
    <div
      ref={containerRef}
      className="water-ripple-zone"
    />
  );
}
