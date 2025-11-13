"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import OrangePushButton from "./OrangePushButton";
import FundingCard from "./FundingCard";
import RelationshipLoop from "./RelationshipLoop";

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

function AnimatedHero({ imageSrcLight, imageSrcDark, visual, title, text, reverse, id }: AnimatedHeroProps) {
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
    ? "flex-col lg:flex-row" // visual left, text right
    : "flex-col lg:flex-row";

  return (
    <section
      ref={ref}
      id={id}
      className={`relative flex ${layoutClasses} items-center justify-between py-24 px-6 lg:px-16 bg-white dark:bg-[#0a0a0a] overflow-hidden min-h-[620px]`}
    >
      {/* background glow */}
      <div className="absolute right-0 top-1/2 translate-y-[-50%] w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.04)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />

      {/* visual */}
      <motion.div
        className="relative mt-6 lg:mt-0 lg:mr-16 w-full lg:w-1/2 flex justify-center lg:justify-start order-1 lg:order-none"
        style={{ y, opacity, scale, perspective: "1200px" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: [0, -8, 0] }}
        transition={{ opacity: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }, y: { duration: 7, repeat: Infinity, ease: [0.45, 0.05, 0.55, 0.95] } }}
        whileHover={{ y: -12, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }}
      >
        <motion.div
          className="relative w-full max-w-[600px]"
          style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
          whileHover={{ rotateY: 0, rotateX: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }}
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
    </section>
  );
}

export default function Hero() {
  const [advance, setAdvance] = useState(55000);
  const [holdback, setHoldback] = useState(14);
  const [sales, setSales] = useState(2500);
  useEffect(() => {
    // Carousel initialization (unchanged)
    const baseImages = [
      "/industries/restaurants.webp",
      "/industries/clothing.webp",
      "/industries/car_repair.webp",
      "/industries/convenience_store.webp",
      "/industries/franchise.webp",
      "/industries/hair_beauty.webp",
      "/industries/home_goods_furniture.webp",
      "/industries/hotels.webp",
      "/industries/pharmacy.webp",
      "/industries/professional_services.webp",
    ];
    const industryImages = [...baseImages, ...baseImages, ...baseImages];
    const initCarousel = () => {
      if (typeof window === "undefined" || !window.gsap) return;
      const c = document.getElementById("container");
      if (!c) return;
      const boxes: any[] = [];
      let currentRotation = 0;
      let autoRotateSpeed = 0.0005;
      let isDragging = false;
      let velocity = 0;
      let lastY = 0;
      let lastTime = Date.now();
      function makeBoxes(n: number) {
        for (let i = 0; i < n; i++) {
          const b: any = document.createElement("div");
          boxes.push(b);
          c.appendChild(b);
        }
      }
      makeBoxes(30);
      // match original settings
      (window as any).gsap.to(c, 0.4, { perspective: 200, backgroundColor: "transparent" });
      for (let i = 0; i < boxes.length; i++) {
        const b: any = boxes[i];
        (window as any).gsap.set(b, {
          left: "50%",
          top: "50%",
          margin: -200,
          width: 400,
          height: 400,
          borderRadius: "20%",
          backgroundImage: "url(" + industryImages[i] + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          clearProps: "transform",
          backfaceVisibility: "hidden",
        });
        b.tl = (window as any).gsap
          .timeline({ paused: true, defaults: { immediateRender: true } })
          .fromTo(
            b,
            { scale: 0.31, rotationX: (i / boxes.length) * 360, transformOrigin: String("50% 50% -800%") },
            { rotationX: "+=360", ease: "none" }
          )
          .timeScale(0.05);
      }
      function animate() {
        if (!isDragging) {
          currentRotation += autoRotateSpeed;
          if (Math.abs(velocity) > 0.00001) {
            currentRotation += velocity;
            velocity *= 0.95;
          }
        }
        currentRotation = currentRotation % 1;
        if (currentRotation < 0) currentRotation += 1;
        boxes.forEach((b: any) => {
          (window as any).gsap.set(b.tl, { progress: currentRotation });
        });
        requestAnimationFrame(animate);
      }
      animate();
      const startDrag = (y: number) => {
        isDragging = true;
        lastY = y;
        lastTime = Date.now();
        velocity = 0;
        (c as any).style.cursor = "grabbing";
        if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(15);
      };
      const onDrag = (y: number) => {
        if (!isDragging) return;
        const t = Date.now();
        const dt = Math.max(t - lastTime, 1);
        const dY = y - lastY;
        const d = -dY * 0.002;
        currentRotation += d;
        velocity = (-dY * 0.002) / (dt / 16.67);
        lastY = y;
        lastTime = t;
      };
      const endDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        (c as any).style.cursor = "grab";
        if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate([12, 10, 8]);
      };
      c.addEventListener("mousedown", (e: any) => {
        e.preventDefault();
        startDrag(e.clientY);
      });
      document.addEventListener("mousemove", (e: any) => onDrag(e.clientY));
      document.addEventListener("mouseup", endDrag);
      c.addEventListener("touchstart", (e: any) => {
        e.preventDefault();
        startDrag(e.touches[0].clientY);
      }, { passive: false });
      document.addEventListener("touchmove", (e: any) => onDrag(e.touches[0].clientY));
      document.addEventListener("touchend", endDrag);
      (c as any).style.cursor = "grab";
    };
    const checkGSAP = setInterval(() => {
      if ((window as any).gsap) {
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
      {/* Section 1 – Funding hero (visual left) */}
      <AnimatedHero
        id="funding"
        reverse
        visual={
          <FundingCard
            advance={advance}
            holdback={holdback}
            sales={sales}
            setAdvance={setAdvance}
            setHoldback={setHoldback}
            setSales={setSales}
          />
        }
        title={
          <>
            Flexible funding
            <br />
            for growing merchants
          </>
        }
        text="Unlock working capital through your daily card sales with no fixed payments, hidden fees, or credit barriers. Funding that moves with your business, not against it."
      />

      {/* Relationship Loop + Copy (new section) */}
      <section className="relative py-10 lg:py-16 px-6 lg:px-16 bg-white dark:bg-[#0a0a0a]">
        <h3 className="text-xl md:text-2xl font-poppins font-semibold text-[var(--theme-text-primary)] mb-6">
          We build long-term funding relationships, not one-offs.
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="order-2 lg:order-1">
            <RelationshipLoop holdback={holdback} />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <h4 className="font-poppins text-lg font-semibold">Relationship, not a one-off</h4>
              <p className="font-lora">
                As you process with us, we review your rhythm and extend additional rounds of funding on a cadence that fits your
                business — biweekly, monthly, or as needed. The goal is to grow together, not to run a single transaction.
              </p>
            </div>
            <div>
              <h4 className="font-poppins text-lg font-semibold">Why it works</h4>
              <p className="font-lora">
                You already process card payments. Repayments come from a fixed percentage of those sales, so payments move in step
                with your revenue. When you have a slow day, you pay less. If there are no sales, there’s no payment.
              </p>
            </div>
            <div>
              <h4 className="font-poppins text-lg font-semibold">What we focus on</h4>
              <p className="font-lora">
                Our attention is on your card processing revenue. As long as that flow stays consistent, we keep funding you in new
                rounds. Typical qualification is around eight thousand dollars per month in processing volume. We don’t base
                decisions on personal credit or bank balances.
              </p>
            </div>
            <div>
              <h4 className="font-poppins text-lg font-semibold">Timeline for initial funding</h4>
              <ul className="list-disc pl-5 font-lora space-y-1">
                <li>Merchant account approval — about one day</li>
                <li>Virtual setup or POS shipped — same day for virtual, one to two days if equipment is shipped</li>
                <li>Remote activation and verification</li>
                <li>Funds deployed — typically within three to five days from agreement</li>
              </ul>
              <p className="font-lora text-sm opacity-70 mt-2">(Timelines are averages, not promises.)</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
