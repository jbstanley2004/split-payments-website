"use client";
import { motion, type MotionProps } from 'framer-motion';
import type { PropsWithChildren } from 'react';

export default function Reveal({ children, ...props }: PropsWithChildren<MotionProps>) {
  return (
    <motion.div {...props}>
      {children}
    </motion.div>
  );
}
