"use client";

import { useEffect, useRef } from "react";

export function BackgroundRipple() {
  const waterRippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initRipples = async () => {
      if (typeof window === "undefined" || !waterRippleRef.current) return;

      try {
        const $ = (await import("jquery")).default;
        (window as any).$ = $;
        (window as any).jQuery = $;

        await import("jquery.ripples");

        // Apply ripples exactly as in the example
        if (waterRippleRef.current) {
          ($ as any)(waterRippleRef.current).ripples({
            resolution: 200,
            perturbance: 0.04,
          });
        }
      } catch (error) {
        console.error("Failed to initialize ripples:", error);
      }
    };

    initRipples();

    return () => {
      if (waterRippleRef.current && typeof window !== "undefined") {
        try {
          const $ = (window as any).$;
          if ($ && $.fn.ripples) {
            ($ as any)(waterRippleRef.current).ripples("destroy");
          }
        } catch (error) {
          console.error("Failed to destroy ripples:", error);
        }
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 w-full h-full min-h-screen min-h-[100dvh]">
      {/* Static background for non-water areas */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url(/hero_image_formatted.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Water area with ripples - matches example implementation */}
      <div
        ref={waterRippleRef}
        className="absolute w-full"
        style={{
          top: "50%",
          height: "50%",
          backgroundImage: "url(/hero_image_formatted.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
