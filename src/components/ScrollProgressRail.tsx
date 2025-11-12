"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import './ScrollProgressRail.css';

type Node = { id: string; label: string; colorVar: string };

export default function ScrollProgressRail({
  nodes,
  className,
}: { nodes: Node[]; className?: string }) {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 across all nodes
  const observers = useRef<IntersectionObserver[]>([]);

  // attach observers to each node section
  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    const onChange = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const i = nodes.findIndex((n) => n.id === (entry.target as HTMLElement).id);
        if (i === -1) return;
        if (entry.isIntersecting) {
          setActive(i);
          // expose accent var for CSS consumption
          document.documentElement.style.setProperty('--rail-accent', `var(${nodes[i].colorVar})`);
        }
      });
    };
    nodes.forEach((n) => {
      const el = document.getElementById(n.id);
      if (!el) return;
      const io = new IntersectionObserver(onChange, { root: null, threshold: 0.5 });
      io.observe(el);
      obs.push(io);
    });
    observers.current = obs;
    return () => { obs.forEach((o) => o.disconnect()); observers.current = []; };
  }, [nodes]);

  // overall scroll progress (for rail fill)
  useEffect(() => {
    const handler = () => {
      const first = document.getElementById(nodes[0]?.id);
      const last = document.getElementById(nodes[nodes.length - 1]?.id);
      if (!first || !last) return;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      // normalize between first+viewportTop and last+viewportTop
      const start = first.getBoundingClientRect().top + y;
      const end = last.getBoundingClientRect().top + y;
      const p = Math.min(1, Math.max(0, (y - start) / Math.max(1, end - start)));
      setProgress(p);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    window.addEventListener('resize', handler);
    return () => { window.removeEventListener('scroll', handler); window.removeEventListener('resize', handler); };
  }, [nodes]);

  // hide entirely while hero is in view (assumes hero section id='hero')
  const show = useMemo(() => {
    const hero = document.getElementById('hero');
    if (!hero) return true;
    const r = hero.getBoundingClientRect();
    return r.bottom < 0 || r.top < -20 || r.top > window.innerHeight - 20;
  }, [active, progress]);

  return (
    <aside className={clsx('spr', className, show ? 'spr-visible' : 'spr-hidden')} aria-label="Site progress">
      <div className="spr-rail">
        <div className="spr-rail-fill" style={{ height: `${Math.round(progress * 100)}%` }} />
        {nodes.map((n, i) => (
          <button
            key={n.id}
            className={clsx('spr-node', i === active && 'is-active')}
            style={{ ['--i' as any]: i }}
            onClick={() => { document.getElementById(n.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
            aria-current={i === active ? 'step' : undefined}
            aria-label={n.label}
          >
            <span className="spr-dot" />
            <span className="spr-label">{n.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
}
