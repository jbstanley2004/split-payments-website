import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FundingCard.css";

export default function FundingCard() {
  const [advance, setAdvance] = useState(55000);
  const [holdback, setHoldback] = useState(14);
  const [sales, setSales] = useState(2500);

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

      <div className="slider">
        <label>Advance amount</label>
        <input type="range" min="10000" max="100000" value={advance} onChange={e => setAdvance(+e.target.value)} />
        <span>${advance.toLocaleString()}</span>
      </div>

      <div className="slider">
        <label>Holdback</label>
        <input type="range" min="5" max="25" value={holdback} onChange={e => setHoldback(+e.target.value)} />
        <span>{holdback}%</span>
      </div>

      <div className="slider">
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
