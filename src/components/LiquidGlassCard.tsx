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
        type: "spring",
        stiffness: 200,
        damping: 15,
        mass: 0.5,
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
          type: "spring",
          stiffness: 200,
          damping: 15,
          mass: 0.8,
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
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
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
