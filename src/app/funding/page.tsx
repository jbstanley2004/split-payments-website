"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionProps } from "framer-motion";
import Image from "next/image";
import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import Hero from "@/components/Hero";
import CardBeamAnimation from "@/components/CardBeamAnimation";

type ParallaxIllustrationProps = MotionProps & {
  className?: string;
  children: ReactNode;
  offset?: [number, number];
};

function ParallaxIllustration({
  className,
  children,
  offset = [-6, 6],
  ...motionProps
}: ParallaxIllustrationProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    offset.map((value) => `${value}%`)
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}

export default function FundingPage() {
  useEffect(() => {
    // Carousel initialization - exact code from 2020-6-4-photo-carousel
    const industryImages = [
      '/industries/restaurants.webp',
      '/industries/clothing.webp',
      '/industries/car_repair.webp',
      '/industries/convenience_store.webp',
      '/industries/franchise.webp',
      '/industries/hair_beauty.webp',
      '/industries/home_goods_furniture.webp',
      '/industries/hotels.webp',
      '/industries/pharmacy.webp',
      '/industries/professional_services.webp'
    ];

    const initCarousel = () => {
      if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) {
        console.error('GSAP or ScrollTrigger not loaded');
        return;
      }

      const c = document.getElementById('container');
      const scrollDist = document.getElementById('scrollDist');
      if (!c || !scrollDist) {
        console.error('Carousel elements not found');
        return;
      }

      const boxes = [];

      function makeBoxes(n) {
        for (let i = 0; i < n; i++) {
          const b = document.createElement('div');
          boxes.push(b);
          c.appendChild(b);
        }
      }

      makeBoxes(industryImages.length);

      window.gsap.to(c, 0.4, { perspective: 200, backgroundColor: 'transparent' });

      for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];
        window.gsap.set(b, {
          left: '50%',
          top: '50%',
          margin: -150,
          width: 300,
          height: 300,
          borderRadius: '20%',
          backgroundImage: 'url(' + industryImages[i] + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clearProps: 'transform',
          backfaceVisibility: 'hidden'
        });

        b.tl = window.gsap.timeline({ paused: true, defaults: { immediateRender: true } })
          .fromTo(b, {
            scale: 0.31,
            rotationX: i / boxes.length * 360,
            transformOrigin: String("50% 50% -500%")
          }, {
            rotationX: '+=360',
            ease: 'none'
          })
          .timeScale(0.05);
      }

      window.ScrollTrigger.create({
        trigger: '#scrollDist',
        start: "top top",
        end: "bottom bottom",
        onRefresh: self => {
          boxes.forEach((b) => { window.gsap.set(b.tl, { progress: self.progress }); });
        },
        onUpdate: self => {
          boxes.forEach((b) => { window.gsap.to(b.tl, { progress: self.progress }); });
        }
      });
    };

    // Wait for GSAP to be available
    const checkGSAP = setInterval(() => {
      if (window.gsap && window.ScrollTrigger) {
        clearInterval(checkGSAP);
        window.gsap.registerPlugin(window.ScrollTrigger);
        initCarousel();
      }
    }, 100);

    return () => {
      clearInterval(checkGSAP);
    };
  }, []);

  return (
    <main className="relative min-h-screen min-h-[100dvh] font-lora text-text">
      {/* All content with relative positioning */}
      <div className="relative z-10 bg-bg min-h-screen min-h-[100dvh]">
        <DynamicIslandNav />

        {/* Hero */}
        <Hero />

        {/* Payments / POS */}
        <section
          id="pos"
          className="px-6 md:px-10 py-8 md:py-12 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-10 md:gap-0 md:min-h-[620px] border-b border-line/50"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full md:w-1/2 max-w-xl mx-auto md:mx-0 text-center md:text-left md:h-full md:flex md:flex-col md:justify-center"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-semibold leading-tight text-[var(--theme-text-primary)] mb-4">Payments built for every business</h2>
            <p className="text-lg font-lora text-[var(--theme-text-secondary)] mb-6 max-w-md mx-auto md:mx-0">
              Simplify your operations with connected POS, online, and mobile payment solutions.
            </p>
            <ul className="text-[var(--theme-text-secondary)] space-y-2 text-sm inline-block text-left font-lora">
              <li>• Real time reporting and reconciliation</li>
              <li>• Transparent, competitive pricing</li>
              <li>• Easy management across multiple locations</li>
            </ul>
          </motion.div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-end md:h-full relative">
            <div id="carousel-wrapper" className="relative w-full h-[600px]">
              <div id="scrollDist"></div>
              <div id="container"></div>
            </div>
          </div>
        </section>

        {/* Card Beam Animation */}
        <CardBeamAnimation />

        {/* Footer */}
        <footer className="border-t border-line/50 px-6 md:px-10 py-8 text-xs text-muted flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© 2025 Split Payments, Inc. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="/policy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/support">Contact</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
