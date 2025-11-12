import React from "react";
import { motion } from "framer-motion";
import "./RelationshipLoop.css";

export default function RelationshipLoop() {
  const nodes = ["Review", "Offer", "Advance", "Repay"];

  return (
    <div className="relationship-loop">
      <svg viewBox="0 0 200 200">
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          stroke="url(#grad)"
          strokeWidth="3"
          fill="none"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
          transformOrigin="center center"
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--theme-accent-blue)" />
            <stop offset="100%" stopColor="var(--theme-accent-green)" />
          </linearGradient>
        </defs>

        {nodes.map((label, i) => {
          const angle = (i / nodes.length) * Math.PI * 2;
          const x = 100 + Math.cos(angle) * 80;
          const y = 100 + Math.sin(angle) * 80;
          return (
            <motion.g key={i} initial={{ opacity: 0.6 }} whileHover={{ scale: 1.2, opacity: 1 }}>
              <circle cx={x} cy={y} r="6" fill="var(--theme-accent-blue)" />
              <text x={x} y={y + 16} textAnchor="middle" fontSize="8" fill="var(--theme-text-secondary)">{label}</text>
            </motion.g>
          );
        })}
      </svg>

      <p className="relationship-caption">
        As you process with us, we review your rhythm and extend additional rounds of funding on a cadence that fits your business.
      </p>
    </div>
  );
}
