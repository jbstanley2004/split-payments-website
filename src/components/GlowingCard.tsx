"use client";

import styles from "./GlowingCard.module.css";
import liquidStyles from "./LiquidGlass.module.css";

const GlowingCard = ({ children, title, icon: Icon, className }) => {
  return (
    <div className={`${liquidStyles.glassContainer} ${className}`}>
      <div className={`${liquidStyles.glassContent} ${styles.inner}`}>
        <header>
          {Icon && <Icon className="w-8 h-8 text-[#0A0A0A]" strokeWidth={1.5} />}
          <h2>{title}</h2>
        </header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default GlowingCard;
