"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import Link from "next/link";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/lib/useIntersectionObserver";

export default function HomePage() {
  const addTarget = useIntersectionObserver((entry) => {
    entry.target.classList.add("reveal");
  });

  return (
    <>
      <DynamicIslandNav />
      <main className="relative min-h-screen min-h-[100dvh] font-lora text-text">
        <section
          id="split-funding-process"
          className="process theme--dark"
          aria-labelledby="how-it-works-title"
        >
          <div className="process__bg" aria-hidden="true"></div>

          <header className="process__header">
            <h2 id="how-it-works-title">How It Works</h2>
            <p className="process__kicker">
              Funding that moves with your sales—without fixed due dates.
            </p>
          </header>

          <ol className="process__steps" role="list">
            <li className="step" data-step="1" ref={addTarget}>
              <h3>Quick application</h3>
              <p>
                Tell us your monthly card volume (min <strong>$8,000</strong>).
                No credit checks; bankruptcies OK.
              </p>
              <p className="meta">What we check: card‑processing rhythm</p>
            </li>

            <li className="step" data-step="2" ref={addTarget}>
              <h3>Merchant account approval</h3>
              <p>We set up secure visibility into your card receipts.</p>
              <p className="meta">
                Typical timing: <strong>~24 hours</strong>
              </p>
            </li>

            <li className="step" data-step="3" ref={addTarget}>
              <h3>Equipment (if needed)</h3>
              <p>We ship compatible hardware if your setup requires it.</p>
              <p className="meta">
                Ships in <strong>1–2 business days</strong>.{" "}
                <em>Skip if already compatible.</em>
              </p>
            </li>

            <li className="step" data-step="4" ref={addTarget}>
              <h3>Remote activation &amp; verification</h3>
              <p>
                We activate remotely and confirm transactions are flowing
                correctly.
              </p>
              <p className="meta">
                Usually the <strong>same day</strong> the equipment arrives
              </p>
            </li>

            <li className="step" data-step="5" ref={addTarget}>
              <h3>Funds deployed</h3>
              <p>Once activation is verified, we deploy funds.</p>
              <p className="meta">
                <strong>Immediately after verification</strong>
              </p>
            </li>

            <li className="step" data-step="6" ref={addTarget}>
              <h3>Automatic split payments</h3>
              <p>
                An agreed holdback (<strong>10–30%</strong>) from daily card
                receipts—no sales, no payment.
              </p>
              <p className="meta">Flexible, sales‑based payback</p>
            </li>
          </ol>

          <aside className="process__disclaimer" role="note">
            <strong>Typical total timeline:</strong> 3–5 business days from
            signed application to funding. Actual timing may vary with shipping,
            activation, and responsiveness.
          </aside>

          <motion.div
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{ willChange: "transform, opacity", marginTop: "2rem", textAlign: "center" }}
            >
              <Link href="/get-started" passHref>
                <OrangePushButton>Get Started</OrangePushButton>
              </Link>
            </motion.div>
        </section>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How Credit Card Split Funding Works",
              "description": "We purchase a portion of future credit card receipts and provide upfront funding. Payback is a small percentage of daily card sales (10–30%).",
              "step": [
                {"@type":"HowToStep","name":"Quick application","text":"Provide basics and average monthly card volume (minimum $8,000)."},
                {"@type":"HowToStep","name":"Merchant account approval","text":"Enable secure visibility into card receipts.","timeRequired":"P1D"},
                {"@type":"HowToStep","name":"Equipment (if needed)","text":"Ship compatible hardware when required.","timeRequired":"P1D"},
                {"@type":"HowToStep","name":"Remote activation & verification","text":"Activate remotely and confirm transactions are flowing."},
                {"@type":"HowToStep","name":"Funds deployed","text":"Funds are deployed immediately once activation is verified."},
                {"@type":"HowToStep","name":"Automatic split payments","text":"An agreed 10–30% of daily credit card receipts pays down the balance. No sales, no payment."}
              ]
            }
            `,
        }}
      ></script>
    </>
  );
}
