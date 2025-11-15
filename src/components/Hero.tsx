"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import OrangePushButton from "./OrangePushButton";
import FundingCard from "./FundingCard";
import HowFundingWorksSection from "./sections/HowFundingWorksSection";

type AnimatedHeroProps = {
  imageSrcLight?: string;
  imageSrcDark?: string;
  /** Optional custom visual to render instead of the default image */
  visual?: React.ReactNode;
  title: React.ReactNode;
  text: string;
  /** When true, visual is left and text is right (desktop) */
  reverse?: boolean;
  id?: string;
};

// Small helper to detect if we should dial back animations (mobile / low-power)
const useReducedMotionHint = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const update = () => setReduced(mq.matches || isTouch);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
};

function AnimatedHero({ imageSrcLight, imageSrcDark, visual, title, text, reverse, id }: AnimatedHeroProps) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotionHint();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scroll motion with gentle parallax. When reduced motion is preferred, keep values minimal.
  const y = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, -16] : [0, -60]);
  const rotateY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [18, 10]);
  const rotateX = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [8, 4]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, prefersReduced ? 0.985 : 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, prefersReduced ? 0.98 : 0.95]);

  const layoutClasses = reverse
    ? "flex-col lg:flex-row" // visual left, text right
    : "flex-col lg:flex-row";

  return (
    <section
      ref={ref}
      id={id}
      className={`relative flex ${layoutClasses} items-center justify-between py-24 px-6 lg:px-16 bg-[#F8F4EC] overflow-hidden min-h-[620px]`}
    >
      {/* background glow */}
      <div className="absolute right-0 top-1/2 translate-y-[-50%] w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.04)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />

      {/* visual */}
      <motion.div
        className="relative mt-6 lg:mt-0 lg:mr-16 w-full lg:w-1/2 flex justify-center lg:justify-start order-1 lg:order-none"
        style={{ y, opacity, scale, perspective: "1200px" }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
          y: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
        }}
        whileHover={
          prefersReduced
            ? undefined
            : { y: -12, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
        }
      >
        <motion.div
          className="relative w-full max-w-[600px]"
          style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
          whileHover={
            prefersReduced
              ? undefined
              : { rotateY: 0, rotateX: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
          }
        >
          {visual ? (
            visual
          ) : (
            <>
              <div className="dark:hidden">
                <Image
                  src={imageSrcLight || "/graphic4.png"}
                  alt="Split merchant dashboard showing sales based funding and payment analytics"
                  width={600}
                  height={380}
                  priority
                  className="drop-shadow-[0_40px_60px_rgba(0,0,0,0.15)] rounded-xl w-full h-auto"
                />
              </div>
              <div className="hidden dark:block">
                <Image
                  src={imageSrcDark || "/graphic4.png"}
                  alt="Split merchant dashboard dark mode view"
                  width={600}
                  height={380}
                  priority
                  className="drop-shadow-[0_40px_60px_rgba(0,0,0,0.3)] rounded-xl w-full h-auto"
                />
              </div>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* text */}
      <div className="max-w-xl relative z-10 text-center lg:text-left w-full lg:w-1/2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-semibold leading-tight text-[#141413]">
          {title}
        </h1>
        <p className="mt-6 text-lg font-lora text-[#524F49] max-w-md mx-auto lg:mx-0">
          {text}
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
          <Link href="/get-started" passHref>
            <OrangePushButton>Get started</OrangePushButton>
          </Link>
          <a
            href="/#how-funding-works"
            className="text-[#141413] font-lora hover:text-[#D97757] transition-colors duration-300 text-base inline-flex items-center"
          >
            Learn more →
          </a>
        </div>
      </div>
    </section>
  );
}

export function FlexibleFundingHero() {
  const [advance, setAdvance] = useState(25000);
  const [holdback, setHoldback] = useState(15);
  const [sales, setSales] = useState(1000);

  // Minimal presentation: just the interactive FundingCard over the global hero background
  return (
    <section
      id="flexible-funding"
      className="relative flex items-center justify-center py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="relative w-full max-w-[440px]">
        <FundingCard
          advance={advance}
          holdback={holdback}
          sales={sales}
          setAdvance={setAdvance}
          setHoldback={setHoldback}
          setSales={setSales}
        />
      </div>
    </section>
  );
}

export function HowFundingWorksBlock() {
  return <HowFundingWorksSection />;
}

// Backwards-compatible default export used on the dedicated /funding page
export default function Hero() {
  const [advance, setAdvance] = useState(25000);
  const [holdback, setHoldback] = useState(15);
  const [sales, setSales] = useState(1000);

  return (
    <>
      <FlexibleFundingHero />
      <HowFundingWorksSection />
    </>
  );
}
