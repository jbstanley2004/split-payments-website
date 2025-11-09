"use client";

import React, { useEffect, useRef } from "react";
import styles from "./HowItWorks.module.css";
import ApplicationIcon from "./icons/ApplicationIcon";
import ReceiptsIcon from "./icons/ReceiptsIcon";
import ShippingBoxIcon from "./icons/ShippingBoxIcon";
import ActivationIcon from "./icons/ActivationIcon";
import FundsIcon from "./icons/FundsIcon";
import PaymentsIcon from "./icons/PaymentsIcon";

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) return;

    const steps = sectionElement.querySelectorAll(`.${styles.step}`);
    if (steps.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.reveal);
          }
        });
      },
      { threshold: 0.12 }
    );

    steps.forEach((step) => {
      observer.observe(step);
    });

    return () => {
      steps.forEach((step) => {
        observer.unobserve(step);
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="split-funding-process"
      className={`${styles.process} ${styles["theme--dark"]}`}
      aria-labelledby="how-it-works-title"
    >
      <div className={styles.process__bg} aria-hidden="true"></div>

      <header className={styles.process__header}>
        <h2 id="how-it-works-title">How It Works</h2>
        <p className={styles.process__kicker}>
          Funding that moves with your sales—without fixed due dates.
        </p>
      </header>

      <ol className={styles.process__steps} role="list">
        <li className={styles.step} data-step="1">
          <ApplicationIcon className={styles.icon} />
          <h3>Quick application</h3>
          <p>
            Tell us your monthly card volume (min <strong>$8,000</strong>). No
            credit checks; bankruptcies OK.
          </p>
          <p className={styles.meta}>What we check: card‑processing rhythm</p>
        </li>

        <li className={styles.step} data-step="2">
          <ReceiptsIcon className={styles.icon} />
          <h3>Merchant account approval</h3>
          <p>We set up secure visibility into your card receipts.</p>
          <p className={styles.meta}>
            Typical timing: <strong>~24 hours</strong>
          </p>
        </li>

        <li className={styles.step} data-step="3">
          <ShippingBoxIcon className={styles.icon} />
          <h3>Equipment (if needed)</h3>
          <p>We ship compatible hardware if your setup requires it.</p>
          <p className={styles.meta}>
            Ships in <strong>1–2 business days</strong>.{" "}
            <em>Skip if already compatible.</em>
          </p>
        </li>

        <li className={styles.step} data-step="4">
          <ActivationIcon className={styles.icon} />
          <h3>Remote activation &amp; verification</h3>
          <p>
            We activate remotely and confirm transactions are flowing correctly.
          </p>
          <p className={styles.meta}>
            Usually the <strong>same day</strong> the equipment arrives
          </p>
        </li>

        <li className={styles.step} data-step="5">
          <FundsIcon className={styles.icon} />
          <h3>Funds deployed</h3>
          <p>Once activation is verified, we deploy funds.</p>
          <p className={styles.meta}>
            <strong>Immediately after verification</strong>
          </p>
        </li>

        <li className={styles.step} data-step="6">
          <PaymentsIcon className={styles.icon} />
          <h3>Automatic split payments</h3>
          <p>
            An agreed holdback (<strong>10–30%</strong>) from daily card
            receipts—no sales, no payment.
          </p>
          <p className={styles.meta}>Flexible, sales‑based payback</p>
        </li>
      </ol>

      <aside className={styles.process__disclaimer} role="note">
        <strong>Typical total timeline:</strong> 3–5 business days from signed
        application to funding. Actual timing may vary with shipping,
        activation, and responsiveness.
      </aside>
    </section>
  );
};

export default HowItWorks;