"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Gerasu from "@/lib/gerasu";
import styles from "./GerasuExample.module.css";

export default function GerasuExample() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      new Gerasu(`.${styles.glass}`, {
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
  }, []);

  return (
    <div ref={ref} className={styles.content}>
      <motion.div style={{ y }} className={styles.background}>
        <Image
          src="/hero_image_formatted.png"
          alt="Modern office interior"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>
      <div className={styles.contentScroll}>
        <div className={styles.glassContainer}>
          <div className={styles.glass}>01</div>
          <div className={styles.glass}>02</div>
          <div className={styles.glass}>03</div>
        </div>
      </div>
    </div>
  );
}
