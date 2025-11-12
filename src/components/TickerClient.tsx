"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TickerClient({ total = 0, tx = 0, biz = 0 }: { total?: number; tx?: number; biz?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // simple count-up animation
  const [n, setN] = useState(0);
  useEffect(() => {
    const target = Math.max(0, total);
    const step = Math.max(1, Math.floor(target / 120));
    let cur = 0;
    const id = setInterval(() => { cur += step; if (cur >= target) { cur = target; clearInterval(id);} setN(cur); }, 16);
    return () => clearInterval(id);
  }, [total]);

  return (
    <div className="text-center flex flex-col my-24 space-y-4 md:space-y-8">
      <AnimatePresence mode="wait">
        <motion.span
          key={mounted ? "ready" : "ssr"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="font-medium text-center text-[40px] md:text-[80px] lg:text-[100px] xl:text-[130px] 2xl:text-[160px] leading-none"
        >
          {Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)}
        </motion.span>
      </AnimatePresence>
      <span className="text-[#878787]">
        Through our system
        <span className="underline mx-1">{Intl.NumberFormat("en-US").format(tx)}</span>
        transactions across
        <span className="underline mx-1">{Intl.NumberFormat("en-US").format(biz)}</span>
        businesses.
      </span>
    </div>
  );
}
