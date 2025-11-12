import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

export default function SplitFundingLoop({ holdback }: { holdback: number }) {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({ rotate: [0, 360], transition: { duration: 6, ease: 'linear', repeat: Infinity } });
  }, [controls]);

  useEffect(() => {
    controls.start({ scale: [1, 1.05, 1], transition: { duration: 0.6, ease: 'easeOut' } });
  }, [holdback]);

  return (
    <motion.svg
      width="100%"
      height="100%"
      viewBox="0 0 820 420"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <defs>
        <linearGradient id="loopGradient" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#d97757" />
          <stop offset="100%" stopColor="#141413" />
        </linearGradient>
      </defs>
      <motion.circle
        cx="410"
        cy="210"
        r="160"
        stroke="url(#loopGradient)"
        strokeWidth="10"
        fill="none"
        animate={controls}
      />
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#141413"
        fontFamily="Poppins, sans-serif"
        fontSize="20"
      >
        Relationship Loop
      </motion.text>
    </motion.svg>
  );
}