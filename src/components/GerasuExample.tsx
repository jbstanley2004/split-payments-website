"use client";

import { useEffect } from "react";
import Gerasu from "@/lib/gerasu";
import styles from "./GerasuExample.module.css";

export default function GerasuExample() {
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
    <div className={styles.content}>
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
