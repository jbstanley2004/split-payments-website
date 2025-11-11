"use client";

import { useEffect, useRef } from "react";

export function BackgroundRipple() {
  const fullLandingImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initRipples = async () => {
      if (typeof window === "undefined" || !fullLandingImageRef.current) return;

      try {
        const $ = (await import("jquery")).default;
        (window as any).$ = $;
        (window as any).jQuery = $;

        await import("jquery.ripples");

        if (fullLandingImageRef.current) {
          ($ as any)(fullLandingImageRef.current).ripples({
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
      if (fullLandingImageRef.current && typeof window !== "undefined") {
        try {
          const $ = (window as any).$;
          if ($ && $.fn.ripples) {
            ($ as any)(fullLandingImageRef.current).ripples("destroy");
          }
        } catch (error) {
          console.error("Failed to destroy ripples:", error);
        }
      }
    };
  }, []);

  return (
    <>
      <div
        ref={fullLandingImageRef}
        className="fixed inset-0 z-0 w-full h-full min-h-screen min-h-[100dvh]"
        style={{
          backgroundImage: "url(/hero_image_formatted.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />
      <div
        className="fixed inset-0 z-0 pointer-events-auto"
        style={{
          height: "50%",
          background: "transparent",
        }}
      />
    </>
  );
}
