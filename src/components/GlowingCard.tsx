"use client";

import { useRef } from "react";
import styles from "./GlowingCard.module.css";
import liquidStyles from "./LiquidGlass.module.css";

const GlowingCard = ({ children, title, icon: Icon, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Get pointer position relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate percentage position
    const px = Math.max(0, Math.min(100, (100 / rect.width) * x));
    const py = Math.max(0, Math.min(100, (100 / rect.height) * y));

    // Calculate distance from center
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;

    // Calculate angle
    let angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    // Calculate closeness to edge (0-1)
    let k_x = Infinity;
    let k_y = Infinity;
    if (dx !== 0) k_x = cx / Math.abs(dx);
    if (dy !== 0) k_y = cy / Math.abs(dy);
    const edge = Math.max(0, Math.min(1, 1 / Math.min(k_x, k_y)));

    // Set CSS custom properties
    card.style.setProperty('--pointer-x', `${px.toFixed(3)}%`);
    card.style.setProperty('--pointer-y', `${py.toFixed(3)}%`);
    card.style.setProperty('--pointer-angle', `${angle.toFixed(3)}deg`);
    card.style.setProperty('--pointer-distance', `${(edge * 100).toFixed(3)}`);
  };

  return (
    <div
      ref={cardRef}
      className={`${liquidStyles.glassContainer} ${className}`}
      onPointerMove={handlePointerMove}
    >
      <div className={liquidStyles.glassFilter}></div>
      <div className={liquidStyles.glassOverlay}></div>
      <div className={liquidStyles.glassSpecular}></div>
      <div className={liquidStyles.glassGlow}></div>
      <div className={`${liquidStyles.glassContent} ${styles.inner}`}>
        <header>
          {Icon && <Icon className="w-8 h-8 text-[#0A0A0A]" strokeWidth={1.5} />}
          <h2>{title}</h2>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
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
