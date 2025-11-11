"use client";

import styles from "./GlowingCard.module.css";
import liquidStyles from "./LiquidGlass.module.css";

const GlowingCard = ({ children, title, icon: Icon, className }) => {
  return (
    <div className={`${liquidStyles.glassContainer} ${className}`}>
      <div className={liquidStyles.glassFilter}></div>
      <div className={liquidStyles.glassOverlay}></div>
      <div className={liquidStyles.glassSpecular}></div>
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
