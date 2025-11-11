"use client";

import { useRef, MouseEvent } from "react";
import styles from "./InteractiveCard.module.css";

interface InteractiveCardProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  className?: string;
  colorIndex?: number;
}

const brandColors = [
  { bg: "#d8d1c6", border: "#c8c1b6", text: "#141413" }, // Warm beige (Card 1 - Credit Card)
  { bg: "#6a9bcc", border: "#5889ba", text: "#faf9f5" }, // Blue (Card 2 - Check Processing)
  { bg: "#788c5d", border: "#677a4c", text: "#faf9f5" }, // Green (Card 3 - ACH Payments)
  { bg: "#c3d0ca", border: "#b3c0ba", text: "#141413" }, // Soft sage green (Card 4 - POS)
  { bg: "#cccbd8", border: "#bcbbc8", text: "#141413" }, // Muted lavender-gray (Card 5 - Gift Card)
];

const InteractiveCard = ({
  children,
  title,
  icon: Icon,
  className = "",
  colorIndex = 0
}: InteractiveCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const rotationLimit = 6;

  const addRotation = () => {
    if (!cardRef.current || !highlightRef.current) return;
    cardRef.current.classList.add(styles.transition);
    highlightRef.current.classList.add(styles.transition);
    setTimeout(() => {
      cardRef.current?.classList.remove(styles.transition);
      highlightRef.current?.classList.remove(styles.transition);
    }, 250);
  };

  const animateRotation = (event: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !highlightRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cardWidth = rect.width;
    const cardHeight = rect.height;
    const middleX = cardWidth / 2;
    const middleY = cardHeight / 2;

    const rotateX = (x - middleX) * (rotationLimit / middleX);
    const rotateY = (middleY - y) * (rotationLimit / middleY);

    cardRef.current.style.transform = `rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
    highlightRef.current.style.top = `-${rotateY * 50}px`;
    highlightRef.current.style.right = `${rotateX * 50}px`;
  };

  const removeRotation = () => {
    if (!cardRef.current || !highlightRef.current) return;
    cardRef.current.classList.add(styles.transition);
    highlightRef.current.classList.add(styles.transition);
    setTimeout(() => {
      if (cardRef.current && highlightRef.current) {
        cardRef.current.style.transform = "";
        highlightRef.current.style.top = "";
        highlightRef.current.style.right = "";
      }
    }, 250);
    setTimeout(() => {
      cardRef.current?.classList.remove(styles.transition);
      highlightRef.current?.classList.remove(styles.transition);
    }, 500);
  };

  const colors = brandColors[colorIndex % brandColors.length];

  return (
    <div className={styles.cardWrapper}>
      <div
        ref={cardRef}
        className={`${styles.card} ${className}`}
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
          color: colors.text,
        }}
        onMouseEnter={addRotation}
        onMouseMove={animateRotation}
        onMouseLeave={removeRotation}
      >
        <div ref={highlightRef} className={styles.highlight}></div>
        <div className={styles.content}>
          <header className={styles.header}>
            {Icon && <Icon className={styles.icon} strokeWidth={1.5} />}
            <h2 className={styles.title}>{title}</h2>
          </header>
          <div className={styles.description}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCard;
