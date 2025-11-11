"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import OrangePushButton from "./OrangePushButton";
import FundingBento from "./funding/FundingBento.v2";

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

export default function Hero() {
  useEffect(() => {
    // Carousel initialization
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

    // Repeat images 3 times to get 30 total
    const industryImages = [...baseImages, ...baseImages, ...baseImages];

    const initCarousel = () => {
      if (typeof window === 'undefined' || !window.gsap) {
        return;
      }

      const c = document.getElementById('container');
      if (!c) {
        return;
      }

      const boxes = [];
      let currentRotation = 0;
      let autoRotateSpeed = 0.0005; // Auto-rotate speed
      let isDragging = false;
      let velocity = 0;
      let lastY = 0;
      let lastTime = Date.now();

      function makeBoxes(n) {
        for (let i = 0; i < n; i++) {
          const b = document.createElement('div');
          boxes.push(b);
          c.appendChild(b);
        }
      }

      makeBoxes(30);

      // EXACT original parameters from 2020-6-4-photo-carousel
      window.gsap.to(c, 0.4, { perspective: 200, backgroundColor: 'transparent' });

      for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];
        window.gsap.set(b, {
          left: '50%',
          top: '50%',
          margin: -200,  // Only change: larger photos (400x400 instead of 300x300)
          width: 400,
          height: 400,
          borderRadius: '20%',
          backgroundImage: 'url(' + industryImages[i] + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          clearProps: 'transform',
          backfaceVisibility: 'hidden'  // Original used hidden
        });

        // Timeline parameters - adjusted cylinder radius to prevent overlap
        b.tl = window.gsap.timeline({ paused: true, defaults: { immediateRender: true } })
          .fromTo(b, {
            scale: 0.31,    // Original scale
            rotationX: i / boxes.length * 360,
            transformOrigin: String("50% 50% -800%")  // Increased from -500% to -800% for larger cylinder radius (prevents overlap)
          }, {
            rotationX: '+=360',
            ease: 'none'
          })
          .timeScale(0.05);
      }

      // Auto-rotate animation loop
      function animate() {
        if (!isDragging) {
          // Apply auto-rotation
          currentRotation += autoRotateSpeed;
          // Apply velocity (gradually decrease)
          if (Math.abs(velocity) > 0.00001) {
            currentRotation += velocity;
            velocity *= 0.95; // friction
          }
        }

        // Keep rotation in 0-1 range
        currentRotation = currentRotation % 1;
        if (currentRotation < 0) currentRotation += 1;

        boxes.forEach((b) => {
          window.gsap.set(b.tl, { progress: currentRotation });
        });

        requestAnimationFrame(animate);
      }
      animate();

      // Drag interaction
      const startDrag = (clientY) => {
        isDragging = true;
        lastY = clientY;
        lastTime = Date.now();
        velocity = 0;
        c.style.cursor = 'grabbing';

        // Haptic feedback on drag start
        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate(15);
        }
      };

      const onDrag = (clientY) => {
        if (!isDragging) return;

        const currentTime = Date.now();
        const deltaTime = Math.max(currentTime - lastTime, 1);
        const deltaY = clientY - lastY;

        // FIXED: Negative deltaY means cursor moved up, so rotation should be negative (same direction)
        const delta = -deltaY * 0.002;
        currentRotation += delta;

        // Calculate velocity for momentum
        velocity = -deltaY * 0.002 / (deltaTime / 16.67);

        lastY = clientY;
        lastTime = currentTime;
      };

      const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        c.style.cursor = 'grab';

        // Haptic feedback on release
        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
          navigator.vibrate([12, 10, 8]);
        }
      };

      // Mouse events
      c.addEventListener('mousedown', (e) => {
        e.preventDefault();
        startDrag(e.clientY);
      });
      document.addEventListener('mousemove', (e) => onDrag(e.clientY));
      document.addEventListener('mouseup', endDrag);

      // Touch events
      c.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrag(e.touches[0].clientY);
      }, { passive: false });
      document.addEventListener('touchmove', (e) => {
        onDrag(e.touches[0].clientY);
      });
      document.addEventListener('touchend', endDrag);

      c.style.cursor = 'grab';
    };

    // Wait for GSAP to be available
    const checkGSAP = setInterval(() => {
      if (window.gsap) {
        clearInterval(checkGSAP);
        initCarousel();
      }
    }, 100);

    return () => {
      clearInterval(checkGSAP);
    };
  }, []);

  return (
    <>
      {/* Section 1 – dark graphic4 first */}
      <FundingBento />

      {/* Section 2 – carousel instead of graphic3 */}
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

        {/* 3D Carousel */}
        <div className="relative mt-16 lg:mt-0 lg:ml-16 w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div id="carousel-wrapper" className="relative w-full h-[600px]">
            <div id="container"></div>
          </div>
        </div>
      </section>
    </>
  );
}
