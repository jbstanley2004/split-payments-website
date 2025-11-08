"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function IndustriesPage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main ref={ref} className="relative min-h-screen font-jetbrains text-text">
      {/* Fixed Parallax Background */}
      <motion.div
        style={{ y }}
        className="fixed inset-0 z-0"
      >
        <Image
          src="/industries-hero.png"
          alt="Industries We Serve"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-bg/70" />
      </motion.div>

      {/* All content with relative positioning */}
      <div className="relative z-10">
        <DynamicIslandNav showHomeLogoOnMobile />

        {/* Hero */}
        <section className="px-6 md:px-10 py-32 md:py-48 min-h-[80vh] flex items-center border-b border-line/50">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl leading-tight mb-6">
              Industries We Serve
            </h1>
            <p className="text-muted text-lg md:text-xl mb-8">
              We provide tailored payment solutions for a wide range of businesses.
              Our broad partnerships and industry relationships enable us to deliver
              the most effective and affordable services for your needs.
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
