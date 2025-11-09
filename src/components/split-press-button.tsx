"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import splitLogoDark from "public/dark_mode_logo.png";

interface SplitPressButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function SplitPressButton({ href, onClick, className = "" }: SplitPressButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  // Motion values for realistic physics
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);

  // Spring physics for smooth, realistic motion
  const ySpring = useSpring(y, {
    stiffness: 300,
    damping: 20,
    mass: 0.5
  });

  const rotateXSpring = useSpring(rotateX, {
    stiffness: 300,
    damping: 20,
    mass: 0.5
  });

  // Transform values for 3D effect
  const shadowY = useTransform(ySpring, [0, 12], [20, 2]);
  const shadowBlur = useTransform(ySpring, [0, 12], [40, 10]);
  const shadowOpacity = useTransform(ySpring, [0, 12], [0.4, 0.1]);

  const handlePress = () => {
    setIsPressed(true);
    y.set(12);
    rotateX.set(2);

    // Release after a short delay
    setTimeout(() => {
      y.set(0);
      rotateX.set(0);
      setIsPressed(false);

      // Trigger click action after animation starts
      if (onClick) {
        onClick();
      } else if (href) {
        window.location.href = href;
      }
    }, 150);
  };

  const handleMouseEnter = () => {
    if (!isPressed) {
      y.set(-2);
      rotateX.set(-1);
    }
  };

  const handleMouseLeave = () => {
    if (!isPressed) {
      y.set(0);
      rotateX.set(0);
    }
  };

  return (
    <div
      className={`inline-block ${className}`}
      style={{ perspective: "1000px" }}
    >
      {/* Button Container with 3D Transform */}
      <motion.button
        className="relative cursor-pointer border-none bg-transparent p-0"
        style={{
          transformStyle: "preserve-3d",
          y: ySpring,
          rotateX: rotateXSpring,
        }}
        onMouseDown={handlePress}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handlePress}
        whileTap={{ scale: 0.98 }}
      >
        {/* Button Top Face */}
        <motion.div
          className="relative px-10 py-5 rounded-xl font-poppins font-bold text-xl text-white flex items-center gap-3 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #e89173 0%, #d97757 50%, #c86846 100%)",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(0, 0, 0, 0.2)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Shine effect */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)",
            }}
          />

          {/* Content */}
          <span className="relative z-10 font-poppins text-white" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
            Let&apos;s
          </span>
          <Image
            src={splitLogoDark}
            alt="Split"
            className="relative z-10 h-8 w-auto"
            style={{
              filter: "brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            }}
          />
        </motion.div>

        {/* Button Depth/Sides - Creates the "tall" 3D effect */}
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: "linear-gradient(180deg, #c86846 0%, #b75735 100%)",
            transform: "translateZ(-16px)",
            transformStyle: "preserve-3d",
            zIndex: -1,
          }}
        />

        {/* Left side face */}
        <div
          className="absolute top-0 left-0 h-full rounded-l-xl"
          style={{
            width: "16px",
            background: "linear-gradient(90deg, #a84d2e 0%, #c86846 100%)",
            transform: "rotateY(-90deg) translateZ(0px)",
            transformOrigin: "left",
            transformStyle: "preserve-3d",
          }}
        />

        {/* Right side face */}
        <div
          className="absolute top-0 right-0 h-full rounded-r-xl"
          style={{
            width: "16px",
            background: "linear-gradient(90deg, #c86846 0%, #a84d2e 100%)",
            transform: "rotateY(90deg) translateZ(0px)",
            transformOrigin: "right",
            transformStyle: "preserve-3d",
          }}
        />

        {/* Animated Shadow */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            transform: "translateZ(-17px)",
            boxShadow: shadowY.get() !== undefined
              ? `0 ${shadowY.get()}px ${shadowBlur.get()}px rgba(0, 0, 0, ${shadowOpacity.get()})`
              : "0 20px 40px rgba(0, 0, 0, 0.4)",
          }}
        />
      </motion.button>

      {/* Base Shadow (static) */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none -z-10"
        style={{
          top: "100%",
          height: "8px",
          background: "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.3) 0%, transparent 70%)",
          filter: "blur(4px)",
          opacity: shadowOpacity,
        }}
      />
    </div>
  );
}
