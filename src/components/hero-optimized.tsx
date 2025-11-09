"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ThickButton } from "@/components/ThickButton";
import { LogoIcon } from "@/components/logo-icon";

export default function HeroOptimized() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scroll-linked transforms for the image - improved smoothness
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [35, 25]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 6]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Keep text crisp and readable - removed fade effects for clarity

  return (
    <section
      ref={ref}
      className="relative flex flex-col lg:flex-row items-center justify-between py-24 px-6 lg:px-16 bg-[#faf9f6] dark:bg-[#0a0a0a] overflow-hidden min-h-[620px] border-b border-line/50"
    >
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 translate-y-[-50%] w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.04)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />

      {/* Text content */}
      <motion.div
        className="max-w-xl relative z-10 text-center lg:text-left w-full lg:w-1/2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <h1 className="text-4xl md:text-5xl font-poppins leading-tight text-[var(--theme-text-primary)]">
          Accept payments.
          <br />
          Access capital.
          <br />
          Grow with split.
        </h1>
        <p className="mt-6 text-lg font-lora text-[var(--theme-text-secondary)] max-w-md mx-auto lg:mx-0">
          Flexible merchant funding and payment services built for high-growth
          businesses. Clarity in payments. Powered by trust.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
          <ThickButton href="/get-started" thickness={50} travel={40} tilt={10}>
            <>Let's <LogoIcon /></>
          </ThickButton>
        </div>
      </motion.div>

      {/* Hero image with scroll + hover + continuous float */}
      <motion.div
        className="relative mt-16 lg:mt-0 lg:ml-16 w-full lg:w-1/2 flex justify-center lg:justify-end"
        style={{
          y,
          opacity: imageOpacity,
          scale,
          perspective: "1200px"
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: [0, -8, 0], // Continuous float - smooth motion
        }}
        transition={{
          opacity: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
          y: { duration: 7, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] },
        }}
        whileHover={{ y: -12, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }}
      >
        <motion.div
          className="relative w-full max-w-[600px]"
          style={{
            rotateY,
            rotateX,
            transformStyle: "preserve-3d"
          }}
          whileHover={{
            rotateY: 30,
            rotateX: 8,
            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
          }}
        >
          {/* Light mode */}
          <div className="dark:hidden">
            <Image
              src="/graphic3.png"
              alt="Split dashboard interface"
              width={600}
              height={380}
              priority
              className="drop-shadow-[0_40px_60px_rgba(0,0,0,0.15)] rounded-xl w-full h-auto"
            />
          </div>
          {/* Dark mode */}
          <div className="hidden dark:block">
            <Image
              src="/graphic4.png"
              alt="Split dashboard interface dark mode"
              width={600}
              height={380}
              priority
              className="drop-shadow-[0_40px_60px_rgba(0,0,0,0.3)] rounded-xl w-full h-auto"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
