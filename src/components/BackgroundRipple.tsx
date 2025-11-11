"use client";

import { useEffect, useRef } from "react";

export function BackgroundRipple() {
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import jQuery and jquery.ripples only on client side
    const initRipples = async () => {
      if (typeof window === "undefined" || !rippleContainerRef.current) return;

      try {
        // Import jQuery
        const $ = (await import("jquery")).default;

        // Make jQuery available globally for jquery.ripples
        if (typeof window !== "undefined") {
          (window as any).$ = $;
          (window as any).jQuery = $;
        }

        // Import jquery.ripples
        await import("jquery.ripples");

        // Initialize ripples on the entire background
        if (rippleContainerRef.current) {
          ($ as any)(rippleContainerRef.current).ripples({
            resolution: 200,
            perturbance: 0.04,
          });
        }
      } catch (error) {
        console.error("Failed to initialize ripples:", error);
      }
    };

    initRipples();

    // Cleanup function
    return () => {
      if (rippleContainerRef.current && typeof window !== "undefined") {
        try {
          const $ = (window as any).$;
          if ($ && $.fn.ripples) {
            ($ as any)(rippleContainerRef.current).ripples("destroy");
          }
        } catch (error) {
          console.error("Failed to destroy ripples:", error);
        }
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 w-full h-full min-h-screen min-h-[100dvh]">
      {/* Background image with ripple effect */}
      <div
        ref={rippleContainerRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url(/hero_image_formatted.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay to block ripple interactions on land areas (top ~55% of screen) */}
      {/* Based on the hero image, water starts at approximately 55% down */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-auto"
        style={{
          height: "55%",
          background: "transparent",
        }}
      />

      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
