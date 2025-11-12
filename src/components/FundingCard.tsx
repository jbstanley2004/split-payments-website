import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FundingCard.css";

type FundingCardProps = {
  advance: number;
  holdback: number;
  sales: number;
  setAdvance: (value: number) => void;
  setHoldback: (value: number) => void;
  setSales: (value: number) => void;
};

export default function FundingCard({ advance, holdback, sales, setAdvance, setHoldback, setSales }: FundingCardProps) {
  const remit = (sales * (holdback / 100)).toFixed(2);
  const days = Math.ceil(advance / remit);

  return (
    <motion.div
      className="funding-card"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Funding Settings</h2>

      <div className="slider advance-slider">
        <label>Advance amount</label>
        <input type="range" min="10000" max="100000" value={advance} onChange={e => setAdvance(+e.target.value)} />
        <span>${advance.toLocaleString()}</span>
      </div>

      <div className="slider holdback-slider">
        <label>Holdback</label>
        <input type="range" min="5" max="25" value={holdback} onChange={e => setHoldback(+e.target.value)} />
        <span>{holdback}%</span>
      </div>

      <div className="slider sales-slider">
        <label>Daily card sales</label>
        <input type="range" min="500" max="10000" value={sales} onChange={e => setSales(+e.target.value)} />
        <span>${sales.toLocaleString()}</span>
      </div>

      <motion.div layout className="metrics">
        <div>
          <p className="label">Est. Daily Remit</p>
          <p className="value">${remit}</p>
        </div>
        <div>
          <p className="label">Est. Days to Repay</p>
          <p className="value">{days}</p>
        </div>
      </motion.div>

      <div className="disclaimer">
        <small>
          Funding estimates are illustrative only and not guarantees of future results.
        </small>
      </div>
    </motion.div>
  );
}
