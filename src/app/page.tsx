"use client";

import { DynamicIslandNav } from "@/components/dynamic-island-nav";
import OrangePushButton from "@/components/OrangePushButton";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Inline SVG Icons with accent cycling
const stepIcons = [
  // Step 1: Application form (Orange #d97757)
  <svg key="1" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-icon">
    <defs>
      <radialGradient id="grad1" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#d97757" />
        <stop offset="100%" stopColor="#b85f42" />
      </radialGradient>
    </defs>
    <rect x="14" y="12" width="36" height="40" rx="4" fill="url(#grad1)" stroke="#faf9f5" strokeWidth="1.5" opacity="0.95"/>
    <line x1="20" y1="22" x2="44" y2="22" stroke="#faf9f5" strokeWidth="2" strokeLinecap="round"/>
    <line x1="20" y1="30" x2="40" y2="30" stroke="#faf9f5" strokeWidth="2" strokeLinecap="round"/>
    <line x1="20" y1="38" x2="44" y2="38" stroke="#faf9f5" strokeWidth="2" strokeLinecap="round"/>
  </svg>,

  // Step 2: Shield/eye for secure visibility (Blue #6a9bcc)
  <svg key="2" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-icon">
    <defs>
      <radialGradient id="grad2" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#6a9bcc" />
        <stop offset="100%" stopColor="#4a7ba8" />
      </radialGradient>
    </defs>
    <path d="M32 14L18 20V30C18 40 22 48 32 52C42 48 46 40 46 30V20L32 14Z" fill="url(#grad2)" stroke="#faf9f5" strokeWidth="1.5"/>
    <circle cx="32" cy="32" r="7" fill="#faf9f5" opacity="0.9"/>
    <circle cx="32" cy="32" r="3" fill="#6a9bcc"/>
  </svg>,

  // Step 3: Shipping box (Green #788c5d)
  <svg key="3" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-icon">
    <defs>
      <radialGradient id="grad3" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#788c5d" />
        <stop offset="100%" stopColor="#5a6b45" />
      </radialGradient>
    </defs>
    <path d="M32 14L48 22V42L32 50L16 42V22L32 14Z" fill="url(#grad3)" stroke="#faf9f5" strokeWidth="1.5"/>
    <path d="M32 14V50M16 22L32 30L48 22" stroke="#faf9f5" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,

  // Step 4: WiFi spark for remote activation (Orange #d97757)
  <svg key="4" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-icon">
    <defs>
      <radialGradient id="grad4" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#d97757" />
        <stop offset="100%" stopColor="#b85f42" />
      </radialGradient>
    </defs>
    <path d="M32 42C33.1 42 34 42.9 34 44C34 45.1 33.1 46 32 46C30.9 46 30 45.1 30 44C30 42.9 30.9 42 32 42Z" fill="url(#grad4)"/>
    <path d="M26 36C28.8 33.2 35.2 33.2 38 36" stroke="url(#grad4)" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M20 30C25.5 24.5 38.5 24.5 44 30" stroke="url(#grad4)" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M14 24C23 15 41 15 50 24" stroke="url(#grad4)" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="50" cy="18" r="4" fill="#faf9f5"/>
    <path d="M50 14L50 22M46 18L54 18" stroke="#d97757" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>,

  // Step 5: Money transfer (Blue #6a9bcc)
  <svg key="5" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-icon">
    <defs>
      <radialGradient id="grad5" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#6a9bcc" />
        <stop offset="100%" stopColor="#4a7ba8" />
      </radialGradient>
    </defs>
    <circle cx="24" cy="28" r="8" fill="url(#grad5)" stroke="#faf9f5" strokeWidth="1.5"/>
    <path d="M24 24V32M20 28H28" stroke="#faf9f5" strokeWidth="2" strokeLinecap="round"/>
    <path d="M34 32L46 38" stroke="url(#grad5)" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrowhead)"/>
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
        <polygon points="0 0, 10 3, 0 6" fill="#6a9bcc" />
      </marker>
    </defs>
    <circle cx="46" cy="38" r="4" fill="#faf9f5" stroke="#6a9bcc" strokeWidth="1.5"/>
  </svg>,

  // Step 6: Percentage badge (Green #788c5d)
  <svg key="6" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="step-icon">
    <defs>
      <radialGradient id="grad6" cx="30%" cy="30%">
        <stop offset="0%" stopColor="#788c5d" />
        <stop offset="100%" stopColor="#5a6b45" />
      </radialGradient>
    </defs>
    <circle cx="32" cy="32" r="18" fill="url(#grad6)" stroke="#faf9f5" strokeWidth="1.5"/>
    <circle cx="25" cy="25" r="3" fill="#faf9f5"/>
    <circle cx="39" cy="39" r="3" fill="#faf9f5"/>
    <line x1="24" y1="40" x2="40" y2="24" stroke="#faf9f5" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>,
];

// Step component with reveal animation
function Step({ step, index }: { step: any; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="step"
      data-step={index + 1}
    >
      <div className="step-icon-wrapper">{stepIcons[index]}</div>
      <div className="step-content">
        <h3>{step.title}</h3>
        <p>{step.description}</p>
        {step.meta && <p className="meta">{step.meta}</p>}
      </div>
    </motion.li>
  );
}

export default function HomePage() {
  const steps = [
    {
      title: "Quick application",
      description: "Tell us your monthly card volume (min $8,000). No credit checks; bankruptcies OK.",
      meta: "What we check: card‑processing rhythm",
    },
    {
      title: "Merchant account approval",
      description: "We set up secure visibility into your card receipts.",
      meta: "Typical timing: ~24 hours",
    },
    {
      title: "Equipment (if needed)",
      description: "We ship compatible hardware if your setup requires it.",
      meta: "Ships in 1–2 business days. Skip if already compatible.",
    },
    {
      title: "Remote activation & verification",
      description: "We activate remotely and confirm transactions are flowing correctly.",
      meta: "Usually the same day the equipment arrives",
    },
    {
      title: "Funds deployed",
      description: "Once activation is verified, we deploy funds.",
      meta: "Immediately after verification",
    },
    {
      title: "Automatic split payments",
      description: "An agreed holdback (10–30%) from daily card receipts—no sales, no payment.",
      meta: "Flexible, sales‑based payback",
    },
  ];

  return (
    <main className="relative min-h-screen font-lora text-text">
      <DynamicIslandNav />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg" aria-hidden="true" />
        <motion.div
          initial={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-content"
        >
          <h1 className="hero-title">Your Future is Bright.</h1>
          <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link href="/get-started" passHref>
              <OrangePushButton>Get Started</OrangePushButton>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section id="split-funding-process" className="process theme--dark" aria-labelledby="how-it-works-title">
        <div className="process__bg" aria-hidden="true" />

        <header className="process__header">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            id="how-it-works-title"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="process__kicker"
          >
            Funding that moves with your sales—without fixed due dates.
          </motion.p>
        </header>

        <ol className="process__steps" role="list">
          {steps.map((step, index) => (
            <Step key={index} step={step} index={index} />
          ))}
        </ol>

        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="process__disclaimer"
          role="note"
        >
          <strong>Typical total timeline:</strong> 3–5 business days from signed application to funding.
          Actual timing may vary with shipping, activation, and responsiveness.
        </motion.aside>
      </section>

      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How Credit Card Split Funding Works",
            description:
              "We purchase a portion of future credit card receipts and provide upfront funding. Payback is a small percentage of daily card sales (10–30%).",
            step: [
              {
                "@type": "HowToStep",
                name: "Quick application",
                text: "Provide basics and average monthly card volume (minimum $8,000).",
              },
              {
                "@type": "HowToStep",
                name: "Merchant account approval",
                text: "Enable secure visibility into card receipts.",
                timeRequired: "P1D",
              },
              {
                "@type": "HowToStep",
                name: "Equipment (if needed)",
                text: "Ship compatible hardware when required.",
                timeRequired: "P1D",
              },
              {
                "@type": "HowToStep",
                name: "Remote activation & verification",
                text: "Activate remotely and confirm transactions are flowing.",
              },
              {
                "@type": "HowToStep",
                name: "Funds deployed",
                text: "Funds are deployed immediately once activation is verified.",
              },
              {
                "@type": "HowToStep",
                name: "Automatic split payments",
                text: "An agreed 10–30% of daily credit card receipts pays down the balance. No sales, no payment.",
              },
            ],
          }),
        }}
      />

      <style jsx>{`
        /* Brand tokens */
        :root {
          --color-dark: #141413;
          --color-light: #faf9f5;
          --color-mid: #b0aea5;
          --color-lightgray: #e8e6dc;
          --accent-1: #d97757;
          --accent-2: #6a9bcc;
          --accent-3: #788c5d;
          --radius: 16px;
          --shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
        }

        /* Theme wrapper */
        .theme--dark {
          --bg-page: var(--color-dark);
          --text-main: var(--color-light);
          --text-muted: color-mix(in oklab, var(--color-light) 70%, var(--color-mid));
          --card-bg: color-mix(in oklab, var(--color-dark) 85%, black);
          --card-border: rgba(250, 249, 245, 0.1);
          --card-grad-top: rgba(250, 249, 245, 0.06);
          --card-grad-bot: rgba(250, 249, 245, 0.03);
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(2rem, 4vw, 4rem);
          overflow: hidden;
          background: var(--color-dark);
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.95;
          background: radial-gradient(140px 140px at 72% 18%, var(--accent-1) 0%, transparent 60%),
            radial-gradient(90px 90px at 78% 24%, rgba(255, 255, 255, 0.18) 0%, transparent 60%),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.06), transparent 30%),
            conic-gradient(
              from 200deg at 28% 110%,
              rgba(255, 255, 255, 0.04),
              transparent 55%,
              rgba(255, 255, 255, 0.04)
            );
          filter: saturate(1.02);
        }

        .hero-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(50% 40% at 10% 20%, rgba(255, 255, 255, 0.06) 0%, transparent 70%),
            radial-gradient(40% 30% at 80% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
          animation: drift 26s linear infinite;
        }

        .hero-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(70% 60% at -10% 120%, rgba(255, 255, 255, 0.03) 0%, transparent 60%),
            radial-gradient(60% 60% at 120% 130%, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
          transform: translateY(6%);
          animation: parallax 18s ease-in-out infinite;
        }

        @keyframes drift {
          from {
            transform: translateX(-3%);
          }
          to {
            transform: translateX(3%);
          }
        }

        @keyframes parallax {
          0%,
          100% {
            transform: translateY(6%);
          }
          50% {
            transform: translateY(2%);
          }
        }

        .hero-content {
          position: relative;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
        }

        .hero-title {
          font-size: clamp(3rem, 7vw, 5rem);
          font-family: var(--font-poppins), Arial, system-ui, sans-serif;
          font-weight: 600;
          line-height: 1.1;
          color: var(--color-light);
          letter-spacing: 0.2px;
          margin: 0;
        }

        /* Process Section */
        .process {
          position: relative;
          padding: clamp(4rem, 8vw, 8rem) clamp(2rem, 4vw, 4rem);
          color: var(--text-main);
          background: var(--bg-page);
          overflow: hidden;
        }

        .process h2,
        .process h3 {
          font-family: var(--font-poppins), Arial, system-ui, sans-serif;
          letter-spacing: 0.2px;
        }

        .process h2 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin: 0 0 1rem;
          font-weight: 600;
        }

        .process h3 {
          font-size: 1.25rem;
          margin: 0 0 0.5rem;
          font-weight: 600;
        }

        .process__header {
          position: relative;
          margin-bottom: 3rem;
          text-align: center;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .process__kicker {
          color: var(--text-muted);
          margin: 0;
          font-size: 1.125rem;
        }

        .process__bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.95;
          background: radial-gradient(140px 140px at 72% 18%, var(--accent-1) 0%, transparent 60%),
            radial-gradient(90px 90px at 78% 24%, rgba(255, 255, 255, 0.18) 0%, transparent 60%),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.06), transparent 30%),
            conic-gradient(
              from 200deg at 28% 110%,
              rgba(255, 255, 255, 0.04),
              transparent 55%,
              rgba(255, 255, 255, 0.04)
            );
          filter: saturate(1.02);
        }

        .process__bg::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(50% 40% at 10% 20%, rgba(255, 255, 255, 0.06) 0%, transparent 70%),
            radial-gradient(40% 30% at 80% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 70%);
          animation: drift 26s linear infinite;
        }

        .process__bg::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(70% 60% at -10% 120%, rgba(255, 255, 255, 0.03) 0%, transparent 60%),
            radial-gradient(60% 60% at 120% 130%, rgba(255, 255, 255, 0.03) 0%, transparent 70%);
          transform: translateY(6%);
          animation: parallax 18s ease-in-out infinite;
        }

        .process__steps {
          position: relative;
          display: grid;
          gap: 1.5rem;
          margin: 3rem auto;
          max-width: 1200px;
          list-style: none;
          padding: 0;
        }

        .step {
          position: relative;
          background: linear-gradient(180deg, var(--card-grad-top), var(--card-grad-bot)), var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: calc(var(--radius) - 4px);
          padding: 2rem;
          box-shadow: var(--shadow);
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
        }

        .step-icon-wrapper {
          flex-shrink: 0;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .step-icon {
          width: 48px;
          height: 48px;
        }

        .step-content {
          flex: 1;
        }

        .step p {
          margin: 0 0 0.5rem;
          line-height: 1.6;
          font-size: 1rem;
        }

        .step .meta {
          color: var(--text-muted);
          font-size: 0.9rem;
          font-style: italic;
          margin: 0;
        }

        .process__disclaimer {
          margin: 3rem auto 0;
          max-width: 900px;
          font-size: 0.95rem;
          color: var(--text-muted);
          background: color-mix(in oklab, var(--card-bg) 85%, white 10%);
          border: 1px dashed var(--card-border);
          border-radius: calc(var(--radius) - 8px);
          padding: 1.5rem;
          text-align: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-bg,
          .hero-bg::before,
          .hero-bg::after,
          .process__bg,
          .process__bg::before,
          .process__bg::after {
            animation: none !important;
          }
        }

        @media (min-width: 768px) {
          .process__steps {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .process__steps {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </main>
  );
}
