import React from "react";
import { motion } from "framer-motion";
import "./RelationshipLoop.css";

type RelationshipLoopProps = {
  holdback: number;
};

export default function RelationshipLoop({ holdback }: RelationshipLoopProps) {
  const nodes = ["Review", "Offer", "Advance", "Repay"];
  const duration = 2 + (25 - holdback) * 0.5;

  return (
    <div className="relationship-loop">
      <svg viewBox="0 0 200 200">
        <motion.circle
          cx="100"
          cy="100"
          r="80"
          stroke="var(--theme-accent-gray)"
          strokeWidth="3"
          fill="none"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration, ease: "linear" }}
          transformOrigin="center center"
        />

        {nodes.map((label, i) => {
          const angle = (i / nodes.length) * Math.PI * 2;
          const x = 100 + Math.cos(angle) * 80;
          const y = 100 + Math.sin(angle) * 80;
          return (
            <motion.g key={i} initial={{ opacity: 0.6 }} whileHover={{ scale: 1.2, opacity: 1 }}>
              <circle cx={x} cy={y} r="6" fill="var(--theme-accent-gray)" />
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
