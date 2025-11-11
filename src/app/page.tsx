"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";
import "@/components/WaterRipple.css";

export default function HomePage() {
  // Initialize ripple effect on the background
  useEffect(() => {
    let mounted = true;

    const initRipples = async () => {
      try {
        console.log("Starting ripple initialization...");

        // Load jQuery
        const jQuery = (await import("jquery")).default;
        console.log("jQuery loaded:", !!jQuery);

        // Make jQuery available globally
        (window as any).$ = jQuery;
        (window as any).jQuery = jQuery;

        // Load jquery.ripples
        await import("jquery.ripples");
        console.log("jquery.ripples loaded");

        // Check if ripples method is available
        console.log("Ripples available:", typeof jQuery.fn.ripples);

        if (!mounted) return;

        // Give the DOM time to render
        setTimeout(() => {
          if (!mounted) return;

          const backgroundElement = document.querySelector(".ripple-background");
          console.log("Background element found:", !!backgroundElement);

          if (backgroundElement) {
            const $background = jQuery(backgroundElement);
            console.log("jQuery wrapper created, length:", $background.length);

            try {
              // Apply the exact configuration from water-ripple-effect
              ($background as any).ripples({
                resolution: 200,
                perturbance: 0.04,
                interactive: true,
              });

              console.log("Ripples applied successfully");

              // Apply water mask after initialization
              setTimeout(() => {
                if (!mounted) return;

                const canvas = backgroundElement.querySelector("canvas");
                console.log("Canvas found:", !!canvas);

                if (canvas) {
                  (canvas as HTMLElement).style.clipPath = "var(--water-mask-clip-path)";
                  ((canvas as HTMLElement).style as any).webkitClipPath = "var(--water-mask-clip-path)";
                  console.log("Water mask applied to canvas");
                }
              }, 200);
            } catch (rippleError) {
              console.error("Error applying ripples:", rippleError);
            }
          } else {
            console.error("Background element not found");
          }
        }, 500);
      } catch (error) {
        console.error("Failed to initialize ripple effect:", error);
      }
    };

    initRipples();

    // Cleanup
    return () => {
      mounted = false;
      try {
        const $ = (window as any).$;
        if ($ && $(".ripple-background").length > 0) {
          ($(".ripple-background") as any).ripples("destroy");
          console.log("Ripples destroyed");
        }
      } catch (error) {
        console.error("Failed to cleanup ripple effect:", error);
      }
    };
  }, []);

  return (
    <main className="relative min-h-screen min-h-[100dvh] font-lora text-text">
      {/* Fixed Background with ripple effect */}
      <div
        className="fixed inset-0 z-0 w-full h-full min-h-screen min-h-[100dvh] ripple-background"
        style={{
          backgroundImage: 'url(/hero_image_formatted.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* All content with relative positioning */}
      <div className="relative z-10 min-h-screen min-h-[100dvh]">
        <DynamicIslandNav />

        {/* Hero Content */}
        <section className="min-h-screen min-h-[100dvh] flex items-end justify-center text-center pb-24 md:pb-32">
          <motion.div
            initial={{ opacity: 0, translateY: 30 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-center gap-10 max-w-4xl px-6"
            style={{ willChange: "transform, opacity" }}
          >
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-poppins font-semibold leading-tight text-black dark:text-black">
              The new standard in merchant cash advances
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-lora text-gray-700 dark:text-gray-700">
              A smarter way to fund your business — seamless integration, instant access, and full transparency.
            </p>

            {/* Get Started Button - matching the site's button style */}
            <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform, opacity" }}
            >
              <Link href="/get-started" passHref>
                <OrangePushButton>Get Started</OrangePushButton>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
