"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

type AnimatedHeroProps = {
  imageSrcLight: string;
  imageSrcDark: string;
  title: React.ReactNode;
  text: string;
  reverse?: boolean;
  id?: string;
};

function AnimatedHero({ imageSrcLight, imageSrcDark, title, text, reverse, id }: AnimatedHeroProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // scroll motion
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [35, 25]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 6]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  // text fade later (fix early disappearance)
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.7], [0, -40]);

  const layoutClasses = reverse
    ? "flex-col lg:flex-row-reverse"
    : "flex-col lg:flex-row";

  return (
    <section
      ref={ref}
      id={id}
      className={`relative flex ${layoutClasses} items-center justify-between py-24 px-6 lg:px-16 bg-white dark:bg-[#0a0a0a] overflow-hidden min-h-[620px]`}
    >
      {/* background glow */}
      <div className="absolute right-0 top-1/2 translate-y-[-50%] w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.04)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />

      {/* text */}
      <motion.div
        className="max-w-xl relative z-10 text-center lg:text-left w-full lg:w-1/2"
        style={{ opacity: textOpacity, y: textY }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-semibold leading-tight text-black dark:text-white">
          {title}
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto lg:mx-0">
          {text}
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
          <Link
            href="/get-started"
            className="border border-gray-200 px-6 py-3 rounded-md text-orange-500 font-mono hover:bg-orange-50 dark:border-gray-700 dark:hover:bg-[#111] transition-colors"
          >
            get started
          </Link>
          <a
            href="/#funding"
            className="text-gray-800 dark:text-gray-200 font-mono hover:underline text-base"
          >
            learn more →
          </a>
        </div>
      </motion.div>

      {/* animated hero image */}
      <motion.div
        className="relative mt-16 lg:mt-0 lg:ml-16 w-full lg:w-1/2 flex justify-center lg:justify-end"
        style={{
          y,
          opacity,
          scale,
          perspective: "1200px"
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: [0, -6, 0], // continuous float
        }}
        transition={{
          opacity: { duration: 0.8, ease: "easeOut" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        whileHover={{
          y: -10,
          transition: { duration: 0.6, ease: "easeOut" },
        }}
      >
        <motion.div
          className="relative w-full max-w-[600px]"
          style={{
            rotateY,
            rotateX,
            transformStyle: "preserve-3d"
          }}
          whileHover={{
            rotateY: 0,
            rotateX: 0,
            transition: { duration: 0.6, ease: "easeOut" },
          }}
        >
          {/* light mode */}
          <div className="dark:hidden">
            <Image
              src={imageSrcLight}
              alt="Split interface"
              width={600}
              height={380}
              priority
              className="drop-shadow-[0_40px_60px_rgba(0,0,0,0.15)] rounded-xl w-full h-auto"
            />
          </div>
          {/* dark mode */}
          <div className="hidden dark:block">
            <Image
              src={imageSrcDark}
              alt="Split interface dark"
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

export default function Hero() {
  return (
    <>
      {/* Section 1 – dark graphic4 first */}
      <AnimatedHero
        id="funding"
        imageSrcLight="/graphic4.png"
        imageSrcDark="/graphic4.png"
        title={
          <>
            Sales-based capital access
            <br />
            for growing merchants.
          </>
        }
        text="Access fast, flexible capital — powered by your daily sales. No fixed monthly minimums or hard credit checks."
      />

      {/* Section 2 – light graphic3 below */}
      <AnimatedHero
        imageSrcLight="/graphic3.png"
        imageSrcDark="/graphic3.png"
        title={
          <>
            Payment infrastructure
            <br />
            built for every business.
          </>
        }
        text="POS, online, and mobile — fast, secure, and all connected to split. Real-time reporting and transparent pricing."
        reverse
      />
    </>
  );
}
