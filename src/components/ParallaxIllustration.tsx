"use client";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionProps } from "framer-motion";

export type ParallaxIllustrationProps = MotionProps & {
  className?: string;
  children: ReactNode;
  offset?: [number, number];
};

export default function ParallaxIllustration({ className, children, offset = [-6, 6], ...motionProps }: ParallaxIllustrationProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], offset.map((value) => `${value}%`));
  return (
    <motion.div ref={ref} style={{ y }} className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}
