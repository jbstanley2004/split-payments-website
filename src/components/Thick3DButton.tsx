"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, transform } from 'framer-motion';

interface Thick3DButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  thickness?: number;
  travel?: number;
  tilt?: number;
  className?: string;
  colorScheme?: 'orange';
}

const colorSchemes = {
  orange: {
    '--cap-top': '#FF5319',    // Slightly lighter than brand
    '--cap-bottom': '#FF4306', // Brand Orange
    '--side-top': '#D63905',   // Smooth transition
    '--side-bottom': '#B33004', // Deep shadow
    '--base': '#8F2603',       // Anchoring dark
    '--text': '#ffffff',
  },
};

const Thick3DButton = ({
  children,
  thickness = 12, // Reduced from 30
  travel = 6,     // Reduced from 22
  tilt = 5,       // Reduced tilt
  className = '',
  colorScheme = 'orange',
  ...props
}: Thick3DButtonProps) => {
  // ... rest of the component remains the same, just using these cleaner defaults
  const ref = useRef<HTMLButtonElement>(null);

  const mouseX = useMotionValue(Infinity);
  const mouseY = useMotionValue(Infinity);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.1 }; // Tighter spring
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
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleHoverStart = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(2);
    }
  };

  const cssVariables = {
    ...colorSchemes[colorScheme],
    '--thickness': `${thickness}px`,
    '--travel': `${travel}px`,
    '--radius': '12px', // More refined radius
    '--specular': 'rgba(255,255,255,.3)', // Softer shine
    '--specular-falloff': 'rgba(255,255,255,.05)',
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
        transformStyle: 'preserve-3d',
      }}
      whileTap={{ scale: 0.99 }}
      className={`relative inline-block border-0 bg-transparent cursor-pointer rounded-[var(--radius)] select-none appearance-none outline-none focus-visible:shadow-[0_0_0_3px_rgba(255,255,255,.8),_0_0_0_6px_rgba(255,67,6,.6)] [-webkit-tap-highlight-color:transparent] ${className}`}
      {...props}
    >
      {/* Base plate */}
      <div
        className="absolute inset-0 rounded-[var(--radius)] bg-[var(--base)]"
        style={{
          boxShadow: `
            0 calc(var(--thickness) + 8px) 20px rgba(0,0,0,.15),
            0 calc(var(--thickness) + 3px) 6px rgba(0,0,0,.10),
            0 var(--thickness) 4px rgba(0,0,0,.15)
          `,
        }}
      />

      {/* Specular Highlight */}
      <motion.div
        className="absolute inset-[-1px] rounded-[var(--radius)] [mix-blend-mode:screen] blur-md pointer-events-none z-[5] opacity-90 transition-opacity duration-150"
        style={{
          background: `radial-gradient(100px 50px at ${mouseX.get()}px ${mouseY.get()}px, var(--specular), var(--specular-falloff) 50%, transparent 80%)`,
        }}
      />

      <motion.span
        style={{
            rotateX,
            rotateY,
            y: `calc(-1 * var(--thickness))`,
        }}
        className="relative inline-block py-4 px-8 rounded-[calc(var(--radius)-2px)] z-[2] [transform-style:preserve-3d] transition-transform duration-100 ease-[cubic-bezier(.2,.8,.1,1)]"

        whileHover={{ y: `calc(-1 * var(--thickness) + 1px)`}}
        whileTap={{ y: `calc(-1 * var(--thickness) + var(--travel))` }}
      >
        {/* Cap Front */}
        <div
            className='absolute inset-0 bg-gradient-to-b from-[var(--cap-top)] to-[var(--cap-bottom)] rounded-[calc(var(--radius)-2px)]'
            style={{
                boxShadow: `
                    inset 0 1px 0 rgba(255,255,255,.3),
                    inset 0 -2px 4px rgba(0,0,0,.15)
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
              inset 0 1px 0 rgba(255,255,255,.1),
              inset 0 -2px 4px rgba(0,0,0,.15)
            `,
          }}
          whileTap={{
            height: `calc(var(--thickness) - var(--travel))`,
            bottom: `calc(-1 * (var(--thickness) - var(--travel)))`,
          }}
        />

        <span
          className="relative inline-block text-[var(--text)] font-sans font-bold text-lg leading-tight tracking-wide"
          style={{
            transform: 'translateZ(4px)',
            textShadow: `0 1px 2px rgba(0,0,0,.1)`,
          }}
        >
          {children}
        </span>
      </motion.span>
    </motion.button>
  );
};

export default Thick3DButton;
