"use client";

import { useRef, useEffect } from "react";
import styles from "./GlowingCard.module.css";

const GlowingCard = ({ children, title, icon: Icon, className }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const pointerPositionRelativeToElement = (el, e) => {
      const pos = [e.clientX, e.clientY];
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = pos[0] - left;
      const y = pos[1] - top;
      const px = clamp((100 / width) * x);
      const py = clamp((100 / height) * y);
      return { pixels: [x, y], percent: [px, py] };
    };

    const centerOfElement = (el) => {
      const { width, height } = el.getBoundingClientRect();
      return [width / 2, height / 2];
    };

    const distanceFromCenter = (card, x, y) => {
      const [cx, cy] = centerOfElement(card);
      return [x - cx, y - cy];
    };

    const closenessToEdge = (card, x, y) => {
      const [cx, cy] = centerOfElement(card);
      const [dx, dy] = distanceFromCenter(card, x, y);
      let k_x = Infinity;
      let k_y = Infinity;
      if (dx !== 0) {
        k_x = cx / Math.abs(dx);
      }
      if (dy !== 0) {
        k_y = cy / Math.abs(dy);
      }
      return clamp(1 / Math.min(k_x, k_y), 0, 1);
    };

    const angleFromPointerEvent = (card, dx, dy) => {
      let angleRadians = 0;
      let angleDegrees = 0;
      if (dx !== 0 || dy !== 0) {
        angleRadians = Math.atan2(dy, dx);
        angleDegrees = angleRadians * (180 / Math.PI) + 90;
        if (angleDegrees < 0) {
          angleDegrees += 360;
        }
      }
      return angleDegrees;
    };

    const round = (value, precision = 3) => parseFloat(value.toFixed(precision));

    const clamp = (value, min = 0, max = 100) =>
      Math.min(Math.max(value, min), max);

    const cardUpdate = (e) => {
      const position = pointerPositionRelativeToElement(card, e);
      const [px, py] = position.pixels;
      const [dx, dy] = distanceFromCenter(card, px, py);
      const edge = closenessToEdge(card, px, py);
      const angle = angleFromPointerEvent(card, dx, dy);

      card.style.setProperty("--pointer-x", `${round(position.percent[0])}%`);
      card.style.setProperty("--pointer-y", `${round(position.percent[1])}%`);
      card.style.setProperty("--pointer-°", `${round(angle)}deg`);
      card.style.setProperty("--pointer-d", `${round(edge * 100)}`);
    };

    card.addEventListener("pointermove", cardUpdate);
    return () => {
      card.removeEventListener("pointermove", cardUpdate);
    };
  }, []);

  return (
    <div ref={cardRef} className={`${styles.card} ${className}`}>
      <span className={styles.glow}></span>
      <div className={styles.glassFilter}></div>
      <div className={styles.glassOverlay}></div>
      <div className={styles.glassSpecular}></div>
      <div className={styles.inner}>
        <header>
          {Icon && <Icon className="w-8 h-8 text-[#0A0A0A]" strokeWidth={1.5} />}
          <h2>{title}</h2>
        </header>
        <div className={styles.content}>{children}</div>
      </div>

      {/* SVG Filter for liquid glass distortion effect */}
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
        <filter id="lensFilter" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
          <feComponentTransfer in="SourceAlpha" result="alpha">
            <feFuncA type="identity" />
          </feComponentTransfer>
          <feGaussianBlur in="alpha" stdDeviation="50" result="blur" />
          <feDisplacementMap in="SourceGraphic" in2="blur" scale="50" xChannelSelector="A" yChannelSelector="A" />
        </filter>
      </svg>
    </div>
  );
};

export default GlowingCard;
