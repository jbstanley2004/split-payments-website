import React, { useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import styles from './FundingBento.v2.module.css';

type Density = 'compact' | 'comfortable';
type Intensity = 'calm' | 'default' | 'lively';
type Order = 'widesFirst' | 'lgsFirst';

export interface FundingBentoProps {
  density?: Density;
  intensity?: Intensity;
  order?: Order;
}

const spreadByIntensity = { calm: 12, default: 18, lively: 22 } as const;
const tiltByIntensity = { calm: 1, default: 2, lively: 3 } as const;

const FundingBento: React.FC<FundingBentoProps> = ({
  density = 'compact',
  intensity = 'calm',
  order = 'widesFirst',
}) => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  const cls = useMemo(() => {
    const d = density === 'comfortable' ? styles.dComfortable : styles.dCompact;
    const o = order === 'lgsFirst' ? styles.oLgsFirst : styles.oWidesFirst;
    return [styles.grid, d, o].join(' ');
  }, [density, order]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const SPREAD_UNIT = spreadByIntensity[intensity];
    const TILT = tiltByIntensity[intensity];

    const state = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let raf: number;

    const setTargets = (x:number, y:number) => {
      const rect = grid.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      let dx = (x - cx) / (rect.width/2);
      let dy = (y - cy) / (rect.height/2);
      state.targetX = Math.max(-1, Math.min(1, dx));
      state.targetY = Math.max(-1, Math.min(1, dy));
      grid.classList.add(styles.moving);
    };

    const animate = () => {
      state.x += (state.targetX - state.x) * 0.12;
      state.y += (state.targetY - state.y) * 0.12;
      const cards = grid.querySelectorAll<HTMLElement>('[data-layer]');
      cards.forEach((card) => {
        const layer = parseFloat(card.dataset.layer || '1');
        const spread = SPREAD_UNIT * layer;
        const tx = (state.x * spread).toFixed(2) + 'px';
        const ty = (state.y * spread).toFixed(2) + 'px';
        const rx = (-state.y * TILT).toFixed(3);
        const ry = ( state.x * TILT).toFixed(3);
        card.style.setProperty('--tx', tx);
        card.style.setProperty('--ty', ty);
        card.style.transform = `translate3d(${tx}, ${ty}, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onMove = (e:PointerEvent) => setTargets(e.clientX, e.clientY);
    const onLeave = () => { state.targetX = 0; state.targetY = 0; grid.classList.remove(styles.moving); };
    const onTouch = (e:TouchEvent) => { const t = e.touches[0]; if (t) setTargets(t.clientX, t.clientY); };
    const onTouchEnd = () => { state.targetX = 0; state.targetY = 0; };

    grid.addEventListener('pointermove', onMove, { passive: true });
    grid.addEventListener('pointerleave', onLeave, { passive: true });
    grid.addEventListener('touchmove', onTouch, { passive: true });
    grid.addEventListener('touchend', onTouchEnd, { passive: true });

    let lastY = window.scrollY;
    const onScroll = () => {
      const delta = window.scrollY - lastY;
      if (Math.abs(delta) > 0.5) { state.targetY = Math.max(-1, Math.min(1, delta / 140)); state.targetX = 0; lastY = window.scrollY; }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      grid.removeEventListener('pointermove', onMove);
      grid.removeEventListener('pointerleave', onLeave);
      grid.removeEventListener('touchmove', onTouch);
      grid.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('scroll', onScroll);
    };
  }, [intensity]);

  return (
    <section className={styles.wrap} aria-label="Funding features">
      <div ref={gridRef} className={cls} role="group" aria-roledescription="Bento feature grid">
        {/* Order handled by CSS grid areas via class */}

        <article className={`${styles.card} ${styles.wide} ${styles.accentGreen}`} data-layer={1} aria-label="Omnichannel POS">
          <div className={styles.inner}>
            <Image src="/assets/asset-pos.svg" alt="Omnichannel POS illustration" width={400} height={200} />
            <div className={styles.shine} aria-hidden="true"></div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.wide} ${styles.accentOrange}`} data-layer={2} aria-label="Sales Timeline">
          <div className={styles.inner}>
            <Image src="/assets/asset-timeline.svg" alt="Sales timeline illustration" width={400} height={200} />
            <div className={styles.shine} aria-hidden="true"></div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.lg} ${styles.accentBlue}`} data-layer={3} aria-label="Revenue Advance">
          <div className={styles.inner}>
            <Image src="/assets/asset-advance.svg" alt="Revenue advance illustration" width={400} height={400} />
            <div className={styles.shine} aria-hidden="true"></div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.lg} ${styles.accentOrange}`} data-layer={4} aria-label="Transparent Rates">
          <div className={styles.inner}>
            <Image src="/assets/asset-rates.svg" alt="Transparent rates illustration" width={400} height={400} />
            <div className={styles.shine} aria-hidden="true"></div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default FundingBento;
