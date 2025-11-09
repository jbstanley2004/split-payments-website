"use client";

import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useState, useRef } from "react";

interface SplitPressButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function SplitPressButton({ href, onClick, className = "" }: SplitPressButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Motion values for realistic physics
  const buttonY = useMotionValue(0);
  const shadowBlur = useMotionValue(30);
  const shadowY = useMotionValue(15);
  const shadowOpacity = useMotionValue(0.5);

  // Spring physics for smooth, realistic motion
  const ySpring = useSpring(buttonY, {
    stiffness: 400,
    damping: 25,
    mass: 0.8
  });

  const handlePress = () => {
    if (isPressed) return;

    setIsPressed(true);

    // Animate button press down
    animate(buttonY, 14, {
      type: "spring",
      stiffness: 500,
      damping: 30,
    });

    animate(shadowBlur, 8, { duration: 0.15 });
    animate(shadowY, 2, { duration: 0.15 });
    animate(shadowOpacity, 0.2, { duration: 0.15 });

    // Release and trigger action
    setTimeout(() => {
      animate(buttonY, 0, {
        type: "spring",
        stiffness: 400,
        damping: 25,
      });
      animate(shadowBlur, 30, { duration: 0.2 });
      animate(shadowY, 15, { duration: 0.2 });
      animate(shadowOpacity, 0.5, { duration: 0.2 });

      setTimeout(() => {
        setIsPressed(false);

        // Trigger click action
        if (onClick) {
          onClick();
        } else if (href) {
          window.location.href = href;
        }
      }, 100);
    }, 120);
  };

  const handleMouseEnter = () => {
    if (!isPressed) {
      animate(buttonY, -3, {
        type: "spring",
        stiffness: 400,
        damping: 20,
      });
      animate(shadowBlur, 35, { duration: 0.2 });
      animate(shadowY, 18, { duration: 0.2 });
    }
  };

  const handleMouseLeave = () => {
    if (!isPressed) {
      animate(buttonY, 0, {
        type: "spring",
        stiffness: 400,
        damping: 20,
      });
      animate(shadowBlur, 30, { duration: 0.2 });
      animate(shadowY, 15, { duration: 0.2 });
    }
  };

  return (
    <div className={`inline-block ${className}`}>
      {/* 3D Button Container */}
      <div className="relative" style={{ perspective: "1000px" }}>
        <motion.button
          ref={buttonRef}
          className="relative cursor-pointer border-none bg-transparent p-0 select-none"
          style={{
            y: ySpring,
            transformStyle: "preserve-3d",
          }}
          onMouseDown={handlePress}
          onTouchStart={handlePress}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          whileTap={{ scale: 0.99 }}
        >
          {/* Button Face (Top Surface) */}
          <div
            className="relative px-10 py-4 rounded-2xl flex items-center justify-center gap-3"
            style={{
              background: "linear-gradient(180deg, #e89173 0%, #d97757 100%)",
              boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.4), inset 0 -2px 4px rgba(0, 0, 0, 0.2)",
              transformStyle: "preserve-3d",
              transform: "translateZ(16px)",
            }}
          >
            {/* Shine overlay */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 40%, rgba(255,255,255,0.1) 100%)",
              }}
            />

            {/* Text Content */}
            <span
              className="relative z-10 font-poppins text-white text-xl font-bold"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,0.4)" }}
            >
              Let&apos;s
            </span>

            {/* Split SVG Logo */}
            <svg
              className="relative z-10 h-6 w-auto"
              viewBox="0 0 618 370"
              fill="white"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
              }}
            >
              <path d="M 409.50,370.00 L 398.00,369.50 398.50,0.00 410.00,0.50 409.50,370.00 Z M 476.50,70.00 L 463.50,69.00 455.00,60.50 455.00,45.50 463.50,37.00 478.50,37.00 488.00,47.50 487.00,61.50 483.50,66.00 476.50,70.00 Z M 95.50,273.00 L 70.50,273.00 39.50,267.00 16.50,257.00 0.00,244.50 10.50,225.00 34.50,242.00 51.50,248.00 67.50,251.00 97.50,251.00 108.50,249.00 129.50,239.00 138.00,228.50 140.00,222.50 140.00,207.50 137.00,200.50 128.50,192.00 100.50,180.00 64.50,172.00 40.50,164.00 25.50,155.00 17.00,146.50 9.00,132.50 6.00,116.50 7.00,103.50 10.00,92.50 20.00,76.50 40.50,61.00 62.50,54.00 77.50,52.00 100.50,52.00 123.50,56.00 138.50,61.00 157.00,72.50 147.50,93.00 132.50,83.00 112.50,76.00 100.50,74.00 77.50,74.00 66.50,76.00 54.50,80.00 41.50,88.00 34.00,97.50 32.00,103.50 31.00,119.50 35.00,129.50 42.50,137.00 58.50,145.00 115.50,160.00 131.50,166.00 149.50,177.00 162.00,195.50 165.00,209.50 164.00,224.50 161.00,234.50 152.00,248.50 142.50,257.00 130.50,264.00 112.50,270.00 95.50,273.00 Z M 594.50,272.00 L 580.50,272.00 567.50,269.00 556.50,263.00 546.00,251.50 541.00,239.50 539.00,226.50 539.00,127.50 510.00,126.50 510.50,108.00 539.00,107.50 539.50,66.00 563.00,66.50 563.50,108.00 609.00,108.50 608.50,128.00 563.00,128.50 563.00,224.50 566.00,236.50 573.50,246.00 582.50,250.00 597.50,250.00 610.50,245.00 618.00,260.50 618.00,263.50 614.50,266.00 594.50,272.00 Z M 227.50,330.00 L 205.50,330.00 204.00,328.50 204.00,107.50 225.50,107.00 227.00,128.50 228.50,130.00 251.50,113.00 270.50,106.00 290.50,104.00 317.50,109.00 333.50,117.00 346.00,127.50 355.00,138.50 364.00,156.50 369.00,176.50 369.00,200.50 361.00,227.50 352.00,242.50 335.50,258.00 318.50,267.00 297.50,272.00 282.50,272.00 259.50,266.00 249.50,261.00 230.50,243.00 228.50,243.00 227.50,330.00 Z M 481.50,269.00 L 459.00,268.50 459.50,107.00 482.00,107.50 483.00,267.50 481.50,269.00 Z M 292.00,250.50 L 302.50,249.00 318.50,242.00 333.00,228.50 341.00,214.50 344.00,204.50 345.00,179.50 343.00,169.50 337.00,155.50 323.50,139.00 302.50,128.00 280.50,126.00 269.50,128.00 253.50,135.00 239.00,148.50 229.00,168.50 227.00,178.50 227.00,196.50 231.00,212.50 237.00,224.50 247.50,237.00 255.50,243.00 270.50,249.00 280.50,251.00 292.00,250.50 Z" />
            </svg>
          </div>

          {/* Button Sides (3D Depth) */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "linear-gradient(180deg, #c86846 0%, #b75735 100%)",
              transform: "translateZ(0px)",
              zIndex: -1,
            }}
          />

          {/* Front Face */}
          <div
            className="absolute bottom-0 left-0 right-0 rounded-b-2xl"
            style={{
              height: "16px",
              background: "linear-gradient(180deg, #b75735 0%, #a84d2e 100%)",
              transform: "rotateX(90deg) translateZ(8px)",
              transformOrigin: "bottom",
            }}
          />

          {/* Left Side */}
          <div
            className="absolute top-0 left-0 bottom-0 rounded-l-2xl"
            style={{
              width: "16px",
              background: "linear-gradient(90deg, #a84d2e 0%, #b75735 100%)",
              transform: "rotateY(-90deg) translateZ(8px)",
              transformOrigin: "left",
            }}
          />

          {/* Right Side */}
          <div
            className="absolute top-0 right-0 bottom-0 rounded-r-2xl"
            style={{
              width: "16px",
              background: "linear-gradient(90deg, #b75735 0%, #a84d2e 100%)",
              transform: "rotateY(90deg) translateZ(8px)",
              transformOrigin: "right",
            }}
          />
        </motion.button>

        {/* Dynamic Shadow */}
        <motion.div
          className="absolute top-full left-1/2 -translate-x-1/2 w-[90%] h-3 pointer-events-none rounded-full"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.5) 0%, transparent 70%)",
            filter: `blur(${shadowBlur.get()}px)`,
            y: shadowY,
            opacity: shadowOpacity,
          }}
        />
      </div>
    </div>
  );
}
