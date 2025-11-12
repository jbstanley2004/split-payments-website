import React, { useMemo, useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import clsx from "clsx";
import "./RelationshipLoop.css";

/**
 * RelationshipLoop
 * - Clean 1:1 SVG viewBox for crisp scaling
 * - Brand colors (#141413, #d97757, #faf9f5) via CSS vars
 * - Poppins for headings, Lora for labels (inherits from site)
 * - Accessible title/desc + aria
 * - No <use> duplication; inline ticks
 * - Motion: arc sweeps on load (CSS), ticks pulse, rotation tied to scroll + holdback
 */

 type Props = { holdback: number; className?: string };

 export default function RelationshipLoop({ holdback, className }: Props) {
   const ref = useRef<HTMLDivElement | null>(null);
   const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
   // Map scroll to a subtle rotation (-18deg .. 18deg)
   const scrollDeg = useTransform(scrollYProgress, [0, 1], [-18, 18]);
   const baseSpeed = useMemo(() => 24 - Math.min(Math.max(holdback, 5), 25), [holdback]);

   // Inline style sets a CSS var consumed by SVG group
   const style = {
     // baseSpeed nudges rotation relative to holdback (lower holdback => faster cadence)
     // framer-motion style object supports CSS variables as strings
     ["--rc-rotate" as any]: scrollDeg as any,
     ["--rc-speed" as any]: `${baseSpeed}s`,
   };

   return (
     <motion.div ref={ref} className={clsx("relationship-loop", className)} style={style as any}>
       <svg
         className="relationship-circle loop"
         viewBox="0 0 200 200" width="200" height="200"
         role="img" aria-labelledby="rcTitle rcDesc"
         data-animate="sweep"
       >
         <title id="rcTitle">Funding relationship timeline</title>
         <desc id="rcDesc">A circular diagram showing Advance → Offer → Review → Repay.</desc>

         <g id="ring" transform="translate(100 100) rotate(var(--rc-rotate))">
           {/* base ring */}
           <circle r="72" fill="none" className="rc-muted" strokeWidth="6" />
           {/* accent arc: animated sweep on load via CSS keyframes */}
           <circle r="72" fill="none" className="rc-accent accent-arc" strokeLinecap="round" strokeWidth="6" strokeDasharray="452" strokeDashoffset="452" />

           {/* 12 inline ticks (no <use>) */}
           <g className="ticks" stroke="#141413" strokeWidth="1">
             {Array.from({ length: 12 }).map((_, i) => (
               <line key={i} x1="0" y1="-78" x2="0" y2="-72" transform={`rotate(${i * 30})`} />
             ))}
           </g>

           {/* Labels */}
           <g className="rc-label" textAnchor="middle">
             <text x="0" y="-96">Repay</text>
             <text x="-68" y="8">Advance</text>
             <text x="0" y="92">Offer</text>
             <text x="68" y="8">Review</text>
           </g>
         </g>
       </svg>

       <p className="relationship-caption">
         As you process with us, we review your rhythm and extend additional rounds of funding on a cadence that fits your business.
       </p>
     </motion.div>
   );
 }
