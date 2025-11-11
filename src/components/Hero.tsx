"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import OrangePushButton from "./OrangePushButton";

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

  // scroll motion - improved smoothness with custom easing
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [35, 25]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 6]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const layoutClasses = reverse
    ? "flex-col lg:flex-row-reverse"
    : "flex-col lg:flex-row";

  const handleImageHover = () => {
    // Subtle haptic on image hover
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(5);
    }
  };

  const handleImageTap = () => {
    // Gentle haptic on image tap
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(10);
    }
  };

  return (
    <section
      ref={ref}
      id={id}
      className={`relative flex ${layoutClasses} items-center justify-between py-24 px-6 lg:px-16 bg-white dark:bg-[#0a0a0a] overflow-hidden min-h-[620px]`}
    >
      {/* background glow */}
      <div className="absolute right-0 top-1/2 translate-y-[-50%] w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.04)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />

      {/* text */}
      <div
        className="max-w-xl relative z-10 text-center lg:text-left w-full lg:w-1/2"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-semibold leading-tight text-[var(--theme-text-primary)]">
          {title}
        </h1>
        <p className="mt-6 text-lg font-lora text-[var(--theme-text-secondary)] max-w-md mx-auto lg:mx-0">
          {text}
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
          <Link href="/get-started" passHref>
            <OrangePushButton>Get started</OrangePushButton>
          </Link>
          <a
            href="/#funding"
            className="text-[var(--theme-text-primary)] font-lora hover:text-[var(--theme-accent)] transition-colors duration-300 text-base inline-flex items-center"
          >
            Learn more →
          </a>
        </div>
      </div>

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
          y: [0, -8, 0], // continuous float - slightly more pronounced
        }}
        transition={{
          opacity: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] },
          y: { duration: 7, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] },
        }}
        whileHover={{
          y: -12,
          transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
        }}
        onHoverStart={handleImageHover}
        onTapStart={handleImageTap}
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
            transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
          }}
        >
          {/* light mode */}
          <div className="dark:hidden">
            <Image
              src={imageSrcLight}
              alt="Split merchant dashboard showing sales based funding and payment analytics"
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
              alt="Split merchant dashboard dark mode view"
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

// Framer Motion 3D Carousel Component
function FramerCarousel3D() {
  const baseImages = [
    '/industries/restaurants.webp',
    '/industries/clothing.webp',
    '/industries/car_repair.webp',
    '/industries/convenience_store.webp',
    '/industries/franchise.webp',
    '/industries/hair_beauty.webp',
    '/industries/home_goods_furniture.webp',
    '/industries/hotels.webp',
    '/industries/pharmacy.webp',
    '/industries/professional_services.webp'
  ];

  const industryImages = [...baseImages, ...baseImages, ...baseImages];
  const totalItems = industryImages.length;

  const rotation = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const velocity = useRef(0);
  const lastY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-rotate animation
  useAnimationFrame((time, delta) => {
    if (!isDragging) {
      // Auto-rotation speed
      const autoRotateSpeed = 0.08 * (delta / 16.67);

      // Apply velocity with friction
      if (Math.abs(velocity.current) > 0.01) {
        rotation.set(rotation.get() + velocity.current);
        velocity.current *= 0.95;
      } else {
        rotation.set(rotation.get() + autoRotateSpeed);
      }
    }
  });

  const handleDragStart = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    lastY.current = clientY;
    lastTime.current = Date.now();
    velocity.current = 0;

    // Stronger haptic feedback on drag start
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(15); // Stronger initial feedback
    }
  };

  const handleCarouselHover = () => {
    // Subtle haptic when hovering over carousel
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(5);
    }
  };

  const handleDrag = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
    const currentTime = Date.now();
    const deltaTime = Math.max(currentTime - lastTime.current, 1);
    const deltaY = clientY - lastY.current;

    const delta = -deltaY * 0.5;
    rotation.set(rotation.get() + delta);

    // Calculate velocity for momentum
    velocity.current = -deltaY * 0.5 / (deltaTime / 16.67);

    lastY.current = clientY;
    lastTime.current = currentTime;
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    // Stronger "release" haptic when drag ends
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([12, 10, 8]); // Triple pulse for satisfying release
    }
  };

  return (
    <div
      className="relative w-full h-[600px] overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onMouseEnter={handleCarouselHover}
      onTouchStart={handleDragStart}
      onTouchMove={handleDrag}
      onTouchEnd={handleDragEnd}
      style={{ perspective: '1000px' }}
    >
      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        {industryImages.map((src, i) => {
          const angle = (i / totalItems) * 360;
          const radius = 500; // Distance from center

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: '400px',
                height: '400px',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
              animate={{
                rotateX: rotation.get() + angle,
              }}
              transition={{
                type: "tween",
                ease: "linear",
                duration: 0,
              }}
            >
              <div
                className="w-full h-full rounded-[20%] overflow-hidden bg-cover bg-center"
                style={{
                  backgroundImage: `url(${src})`,
                  transform: `translateZ(-${radius}px) scale(0.31)`,
                  transformOrigin: '50% 50%',
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
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
            Flexible funding
            <br />
            for growing merchants
          </>
        }
        text="Unlock working capital through your daily card sales with no fixed payments, hidden fees, or credit barriers. Funding that moves with your business, not against it."
      />

      {/* Section 2 – Framer Motion carousel instead of GSAP */}
      <section
        id="payment-infrastructure"
        className="relative flex flex-col lg:flex-row-reverse items-center justify-between py-24 px-6 lg:px-16 bg-white dark:bg-[#0a0a0a] overflow-hidden min-h-[620px]"
      >
        {/* background glow */}
        <div className="absolute right-0 top-1/2 translate-y-[-50%] w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.04)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />

        {/* text */}
        <div className="max-w-xl relative z-10 text-center lg:text-left w-full lg:w-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-semibold leading-tight text-[var(--theme-text-primary)]">
            Payment infrastructure
            <br />
            built for every business
          </h1>
          <p className="mt-6 text-lg font-lora text-[var(--theme-text-secondary)] max-w-md mx-auto lg:mx-0">
            Accept payments anywhere with secure, integrated tools that connect directly to Split. Real time reporting, transparent pricing, and the flexibility to manage it all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link href="/get-started" passHref>
              <OrangePushButton>Get started</OrangePushButton>
            </Link>
            <a
              href="/#funding"
              className="text-[var(--theme-text-primary)] font-lora hover:text-[var(--theme-accent)] transition-colors duration-300 text-base inline-flex items-center"
            >
              Learn more →
            </a>
          </div>
        </div>

        {/* 3D Carousel with Framer Motion */}
        <div className="relative mt-16 lg:mt-0 lg:ml-16 w-full lg:w-1/2 flex justify-center lg:justify-end">
          <FramerCarousel3D />
        </div>
      </section>
    </>
  );
}
