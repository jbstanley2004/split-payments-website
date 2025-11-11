"use client";

import React, { useEffect, useRef } from "react";
import "./WaterRipple.css";

interface WaterRippleProps {
  children: React.ReactNode;
}

export function WaterRipple({ children }: WaterRippleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleInitialized = useRef(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined" || rippleInitialized.current) return;

    // Dynamically import jQuery and jquery.ripples
    const loadRipples = async () => {
      try {
        // Load jQuery
        const $ = (await import("jquery")).default;

        // Make jQuery available globally for jquery.ripples
        (window as any).$ = $;
        (window as any).jQuery = $;

        // Load jquery.ripples
        await import("jquery.ripples");

        // Apply ripples to the background image
        const backgroundElement = document.querySelector(".ripple-background");
        if (backgroundElement) {
          // Apply the exact configuration from water-ripple-effect
          ($(".ripple-background") as any).ripples({
            resolution: 200,
            perturbance: 0.04,
            interactive: true, // Enable interactive mode for cursor-based ripples
          });

          rippleInitialized.current = true;

          // After ripples is initialized, apply the water mask to the canvas
          setTimeout(() => {
            const canvas = backgroundElement.querySelector("canvas");
            if (canvas) {
              // Apply CSS mask to restrict ripples to water area
              canvas.style.clipPath = "var(--water-mask-clip-path)";
              (canvas.style as any).webkitClipPath = "var(--water-mask-clip-path)";
            }
          }, 100);
        }
      } catch (error) {
        console.error("Failed to initialize ripple effect:", error);
      }
    };

    loadRipples();

    // Cleanup
    return () => {
      try {
        const $ = (window as any).$;
        if ($ && $(".ripple-background").length) {
          const rippleElement = $(".ripple-background")[0];
          if (rippleElement && (rippleElement as any).ripples) {
            ($(".ripple-background") as any).ripples("destroy");
          }
        }
      } catch (error) {
        console.error("Failed to cleanup ripple effect:", error);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="water-ripple-container">
      {children}
    </div>
  );
}
