"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function HeroOptimized() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scroll-linked transforms for the image
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [35, 25]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 6]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const imageOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Text fade & lift
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

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
        style={{ opacity: textOpacity, y: textY }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl font-jetbrains leading-tight text-[#0b0b0b] dark:text-white">
          Accept payments.
          <br />
          Access capital.
          <br />
          Grow with split.
        </h1>
        <p className="mt-6 text-lg text-[#4f4f4f] dark:text-[#aaaaaa] max-w-md mx-auto lg:mx-0">
          Flexible merchant funding and payment services built for high-growth
          businesses. No gradients. No color noise. Just clarity.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
          <Link
            href="/get-started"
            className="border border-white px-5 py-3 text-sm hover:bg-white hover:text-black transition-colors text-white dark:text-white"
          >
            get started
          </Link>
          <a
            href="/#funding"
            className="text-[#4f4f4f] dark:text-[#aaaaaa] hover:text-[#0b0b0b] dark:hover:text-white font-jetbrains text-sm transition-colors"
          >
            learn more →
          </a>
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
          y: [0, -12, 0], // Continuous float
        }}
        transition={{
          opacity: { duration: 0.8, ease: "easeOut" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{ y: -10, transition: { duration: 0.4, ease: "easeOut" } }}
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
            transition: { duration: 0.5, ease: "easeOut" },
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
