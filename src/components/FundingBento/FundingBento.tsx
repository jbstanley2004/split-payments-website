import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './FundingBento.module.css';
import advanceSvg from './assets/asset-advance.svg';
import ratesSvg from './assets/asset-rates.svg';
import posSvg from './assets/asset-pos.svg';
import timelineSvg from './assets/asset-timeline.svg';

export const FundingBento: React.FC = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const state = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let raf: number;

    const setTargets = (x:number, y:number) => {
      const rect = grid.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      let dx = (x - cx) / (rect.width/2);
      let dy = (y - cy) / (rect.height/2);
      dx = Math.max(-1, Math.min(1, dx));
      dy = Math.max(-1, Math.min(1, dy));
      state.targetX = dx; state.targetY = dy;
      grid.classList.add(styles.moving);
    };

    const animate = () => {
      state.x += (state.targetX - state.x) * 0.12;
      state.y += (state.targetY - state.y) * 0.12;
      const cards = grid.querySelectorAll<HTMLElement>('[data-layer]');
      cards.forEach((card) => {
        const layer = parseFloat(card.dataset.layer || '1');
        const spread = 18 * layer;
        const tx = (state.x * spread).toFixed(2) + 'px';
        const ty = (state.y * spread).toFixed(2) + 'px';
        card.style.setProperty('--tx', tx);
        card.style.setProperty('--ty', ty);
        const rx = (-state.y * 2).toFixed(3);
        const ry = ( state.x * 2).toFixed(3);
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
      if (Math.abs(delta) > 0.5) { state.targetY = Math.max(-1, Math.min(1, delta / 120)); state.targetX = 0; lastY = window.scrollY; }
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
  }, []);

  return (
    <section className={styles.wrap} aria-label="Funding features">
      <div ref={gridRef} className={styles.grid} role="group" aria-roledescription="Bento feature grid">
        <article className={`${styles.card} ${styles.lg} ${styles.accentOrange}`} data-layer={4} aria-label="Revenue Advance">
          <div className={styles.inner}>
            <Image src={advanceSvg} alt="Revenue advance illustration" fill priority />
            <div className={styles.shine} aria-hidden="true"></div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.lg} ${styles.accentBlue}`} data-layer={3} aria-label="Transparent Rates">
          <div className={styles.inner}>
            <Image src={ratesSvg} alt="Transparent rates illustration" fill priority />
            <div className={styles.shine} aria-hidden="true"></div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.wide} ${styles.accentGreen}`} data-layer={2} aria-label="Omnichannel POS">
          <div className={styles.inner}>
            <Image src={posSvg} alt="Omnichannel POS illustration" fill />
            <div className={styles.shine} aria-hidden="true"></div>
          </div>
        </article>

        <article className={`${styles.card} ${styles.wide} ${styles.accentOrange}`} data-layer={1} aria-label="Sales Timeline">
          <div className={styles.inner}>
            <Image src={timelineSvg} alt="Sales timeline illustration" fill />
            <div className={styles.shine} aria-hidden="true"></div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default FundingBento;