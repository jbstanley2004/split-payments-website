"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, transform } from 'framer-motion';

interface Thick3DButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  thickness?: number;
  travel?: number;
  tilt?: number;
  className?: string;
  colorScheme?: 'orange' | 'blue' | 'gold';
}

const colorSchemes = {
  orange: {
    '--cap-top': '#e07b66',
    '--cap-bottom': '#c75a45',
    '--side-top': '#b55642',
    '--side-bottom': '#8d3a2c',
    '--base': '#5e2a22',
    '--text': '#ffffff',
  },
  blue: {
    '--cap-top': '#6aa6ff',
    '--cap-bottom': '#3f7ce0',
    '--side-top': '#3a74cd',
    '--side-bottom': '#2a57a0',
    '--base': '#1f3666',
    '--text': '#ffffff',
  },
  gold: {
    '--cap-top': '#f1c56b',
    '--cap-bottom': '#d39c2e',
    '--side-top': '#c38f39',
    '--side-bottom': '#8b611f',
    '--base': '#5a3f16',
    '--text': '#1a1308',
  },
};

const Thick3DButton = ({
  children,
  thickness = 30,
  travel = 22,
  tilt = 10,
  className = '',
  colorScheme = 'orange',
  ...props
}: Thick3DButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  const springConfig = { damping: 15, stiffness: 200, mass: 0.1 };
  const rotateX = useSpring(useMotionValue(0), springConfig);
  const rotateY = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const transformedX = transform(x, [0, width], [-tilt, tilt]);
    const transformedY = transform(y, [0, height], [tilt, -tilt]);
    rotateX.set(transformedY);
    rotateY.set(transformedX);

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    mouseX.set(Infinity);
    mouseY.set(Infinity);
  };

  const handleTapStart = () => {
    // Strong haptic feedback on button press
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(20); // Stronger feedback for this big button
    }
  };

  const handleHoverStart = () => {
    // Subtle haptic feedback on hover
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(5); // Very subtle
    }
  };

  const cssVariables = {
    ...colorSchemes[colorScheme],
    '--thickness': `${thickness}px`,
    '--travel': `${travel}px`,
    '--radius': '22px', // Can be customized if needed
    '--specular': 'rgba(255,255,255,.65)',
    '--specular-falloff': 'rgba(255,255,255,.10)',
  } as React.CSSProperties;

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={handleHoverStart}
      onTapStart={handleTapStart}
      style={{
        ...cssVariables,
        perspective: '800px',
        transformStyle: 'preserve-d',
      }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-block border-0 bg-transparent cursor-pointer rounded-[var(--radius)] select-none appearance-none outline-none focus-visible:shadow-[0_0_0_3px_rgba(255,255,255,.8),_0_0_0_6px_rgba(36,120,255,.6)] [-webkit-tap-highlight-color:transparent] ${className}`}
      {...props}
    >
      {/* Base plate */}
      <div
        className="absolute inset-0 rounded-[var(--radius)] bg-[var(--base)]"
        style={{
          boxShadow: `
            0 calc(var(--thickness) + 18px) 44px rgba(0,0,0,.32),
            0 calc(var(--thickness) + 8px) 18px rgba(0,0,0,.26),
            0 var(--thickness) 8px rgba(0,0,0,.42)
          `,
        }}
      />

      {/* Specular Highlight */}
      <motion.div
        className="absolute inset-[-1px] rounded-[var(--radius)] [mix-blend-mode:screen] blur-lg pointer-events-none z-[5] opacity-90 transition-opacity duration-150"
        style={{
          background: `radial-gradient(140px 70px at ${mouseX.get()}px ${mouseY.get()}px, var(--specular), var(--specular-falloff) 45%, transparent 70%)`,
        }}
      />

      <motion.span
        style={{
            rotateX,
            rotateY,
            y: `calc(-1 * var(--thickness))`,
        }}
        className="relative inline-block py-5 px-11 rounded-[calc(var(--radius)-2px)] z-[2] [transform-style:preserve-3d] transition-transform duration-100 ease-[cubic-bezier(.2,.8,.1,1)]"

        whileHover={{ y: `calc(-1 * var(--thickness) + 2px)`}}
        whileTap={{ y: `calc(-1 * var(--thickness) + var(--travel))` }}
      >
        {/* Cap Front */}
        <div
            className='absolute inset-0 bg-gradient-to-b from-[var(--cap-top)] to-[var(--cap-bottom)] rounded-[calc(var(--radius)-2px)]'
            style={{
                boxShadow: `
                    inset 0 2px 0 rgba(255,255,255,.40),
                    inset 0 -3px 8px rgba(0,0,0,.28)
                `
            }}
        />

        {/* Sidewall */}
        <motion.div
          className="absolute left-0 right-0 z-[-1] pointer-events-none"
          style={{
            bottom: `calc(-1 * var(--thickness))`,
            height: `var(--thickness)`,
            background: 'linear-gradient(180deg, var(--side-top), var(--side-bottom))',
            borderRadius: '0 0 calc(var(--radius) - 2px) calc(var(--radius) - 2px)',
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,.12),
              inset 0 -3px 6px rgba(0,0,0,.28)
            `,
          }}
          whileTap={{
            height: `calc(var(--thickness) - var(--travel))`,
            bottom: `calc(-1 * (var(--thickness) - var(--travel)))`,
          }}
        />

        <span
          className="relative inline-block text-[var(--text)] font-sans font-extrabold text-[28px] leading-tight"
          style={{
            transform: 'translateZ(8px)',
            textShadow: `
              0 1px 0 rgba(255,255,255,.22),
              0 2px 6px rgba(0,0,0,.25)
            `,
          }}
        >
          {children}
        </span>
      </motion.span>
    </motion.button>
  );
};

export default Thick3DButton;
