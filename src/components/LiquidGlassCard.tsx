"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Gerasu from "@/lib/gerasu";
import styles from "./LiquidGlassCard.module.css";

interface LiquidGlassCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function LiquidGlassCard({
  title,
  description,
  icon: Icon,
}: LiquidGlassCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const gerasuRef = useRef<any>(null);

  useEffect(() => {
    if (cardRef.current && typeof window !== "undefined") {
      // Initialize Gerasu effect
      gerasuRef.current = new Gerasu(`.${styles.glass}`, {
        darknessOpacity: 17,
        darknessBlur: 5,
        lightnessOpacity: 17,
        lightnessBlur: 15,
        centerDistortion: 68,
        centerSize: 15,
        preBlur: 7,
        postBlur: 0,
        iridescence: 20,
      });
    }

    return () => {
      if (gerasuRef.current && gerasuRef.current.destroy) {
        gerasuRef.current.destroy();
      }
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={styles.cardWrapper}
      initial={false}
      animate={{
        scale: isExpanded ? 1.05 : 1,
      }}
      transition={{
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <motion.div
        className={styles.glass}
        initial={false}
        animate={{
          height: isExpanded ? "auto" : "70px",
        }}
        transition={{
          duration: 0.4,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <div className={styles.cardContent}>
          <div className={styles.header}>
            <Icon className={styles.icon} strokeWidth={1.5} />
            <h3 className={styles.title}>{title}</h3>
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  duration: 0.35,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className={styles.description}
              >
                <p>{description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
