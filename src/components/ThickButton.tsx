"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface ThickButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  thickness?: number;
  travel?: number;
  tilt?: number;
  variant?: "default" | "blue" | "gold";
  className?: string;
}

export function ThickButton({
  href,
  onClick,
  children,
  thickness = 40,
  travel = 32,
  tilt = 10,
  variant = "default",
  className = "",
}: ThickButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const capRef = useRef<HTMLSpanElement>(null);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const btn = btnRef.current;
    const cap = capRef.current;
    if (!btn || !cap) return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Set CSS custom properties
    btn.style.setProperty("--thickness", thickness + "px");
    btn.style.setProperty("--travel", travel + "px");
    btn.style.setProperty("--tilt", tilt + "deg");

    const clamp = (v: number, min: number, max: number) =>
      Math.min(max, Math.max(min, v));

    // Pointer tilt + specular position
    function updateTilt(e: PointerEvent) {
      if (prefersReduced || !btn) return;
      const r = btn.getBoundingClientRect();
      const x = clamp((e.clientX - r.left) / r.width, 0, 1);
      const y = clamp((e.clientY - r.top) / r.height, 0, 1);

      const rx = ((y - 0.5) * -tilt).toFixed(2);
      const ry = ((x - 0.5) * tilt).toFixed(2);
      btn.style.setProperty("--rx", rx + "deg");
      btn.style.setProperty("--ry", ry + "deg");
      btn.style.setProperty("--mx", x * 100 + "%");
      btn.style.setProperty("--my", y * 100 + "%");
    }

    // Press/release handling
    function handlePointerDown(e: PointerEvent) {
      setIsPressed(true);
      if (btn instanceof HTMLElement) {
        btn.setPointerCapture(e.pointerId);
      }
    }

    function release() {
      setIsPressed(false);
      if (prefersReduced || !btn || !cap) return;

      const getCSS = (name: string) => {
        const v = getComputedStyle(btn).getPropertyValue(name).trim();
        return v || null;
      };

      const rx = getCSS("--rx") || "0deg";
      const ry = getCSS("--ry") || "0deg";
      const start = `translateY(${-thickness + travel}px) rotateX(${rx}) rotateY(${ry})`;
      const over = `translateY(${-thickness + -3}px) rotateX(calc(${rx} * .35)) rotateY(calc(${ry} * .35))`;
      const end = `translateY(${-thickness}px) rotateX(0deg) rotateY(0deg)`;

      cap.animate([{ transform: start }, { transform: over }, { transform: end }], {
        duration: 240,
        easing: "cubic-bezier(.2,.8,.2,1)",
      });
    }

    function handlePointerUp(e: PointerEvent) {
      release();
      if (btn instanceof HTMLElement) {
        btn.releasePointerCapture(e.pointerId);
      }
    }

    function handlePointerCancel(e: PointerEvent) {
      release();
      if (btn instanceof HTMLElement) {
        btn.releasePointerCapture(e.pointerId);
      }
    }

    function handlePointerLeave() {
      btn?.style.removeProperty("--rx");
      btn?.style.removeProperty("--ry");
    }

    // Keyboard support
    function handleKeyDown(e: KeyboardEvent) {
      if (e.code === "Space" || e.code === "Enter") {
        if (!isPressed) {
          setIsPressed(true);
        }
        e.preventDefault();
      }
    }

    function handleKeyUp(e: KeyboardEvent) {
      if (e.code === "Space" || e.code === "Enter") {
        setIsPressed(false);
        if (e.code === "Space" && btn instanceof HTMLButtonElement) {
          btn.click();
        }
      }
    }

    btn.addEventListener("pointermove", updateTilt as EventListener);
    btn.addEventListener("pointerenter", updateTilt as EventListener);
    btn.addEventListener("pointerdown", handlePointerDown as EventListener);
    btn.addEventListener("pointerup", handlePointerUp as EventListener);
    btn.addEventListener("pointercancel", handlePointerCancel as EventListener);
    btn.addEventListener("pointerleave", handlePointerLeave);
    btn.addEventListener("keydown", handleKeyDown as EventListener);
    btn.addEventListener("keyup", handleKeyUp as EventListener);

    return () => {
      btn.removeEventListener("pointermove", updateTilt as EventListener);
      btn.removeEventListener("pointerenter", updateTilt as EventListener);
      btn.removeEventListener("pointerdown", handlePointerDown as EventListener);
      btn.removeEventListener("pointerup", handlePointerUp as EventListener);
      btn.removeEventListener("pointercancel", handlePointerCancel as EventListener);
      btn.removeEventListener("pointerleave", handlePointerLeave);
      btn.removeEventListener("keydown", handleKeyDown as EventListener);
      btn.removeEventListener("keyup", handleKeyUp as EventListener);
    };
  }, [thickness, travel, tilt, isPressed]);

  const variantClass = variant !== "default" ? variant : "";
  const pressedClass = isPressed ? "is-pressed" : "";
  const classes = `btn3d ${variantClass} ${pressedClass} ${className}`.trim();

  const content = (
    <>
      <style jsx global>{`
        .btn3d {
          --radius: 22px;
          --thickness: 40px;
          --travel: 32px;
          --tilt: 10deg;
          --cap-top: #e07b66;
          --cap-bottom: #c75a45;
          --side-top: #b55642;
          --side-bottom: #8d3a2c;
          --base: #5e2a22;
          --text: #ffffff;
          --specular: rgba(255, 255, 255, 0.65);
          --specular-falloff: rgba(255, 255, 255, 0.1);

          appearance: none;
          position: relative;
          display: inline-block;
          border: 0;
          background: transparent;
          cursor: pointer;
          border-radius: var(--radius);
          -webkit-tap-highlight-color: transparent;
          perspective: 800px;
          transform-style: preserve-3d;
          outline: none;
        }

        .btn3d.blue {
          --cap-top: #6aa6ff;
          --cap-bottom: #3f7ce0;
          --side-top: #3a74cd;
          --side-bottom: #2a57a0;
          --base: #1f3966;
        }

        .btn3d.gold {
          --cap-top: #f1c56b;
          --cap-bottom: #d39c2e;
          --side-top: #c38f39;
          --side-bottom: #8b611f;
          --base: #5a3f16;
          color: #1a1308;
        }

        .btn3d:focus-visible {
          box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.8),
            0 0 0 6px rgba(36, 120, 255, 0.6);
        }

        .btn3d::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: var(--radius);
          background: var(--base);
          box-shadow: 0 calc(var(--thickness) + 18px) 44px rgba(0, 0, 0, 0.32),
            0 calc(var(--thickness) + 8px) 18px rgba(0, 0, 0, 0.26),
            0 var(--thickness) 8px rgba(0, 0, 0, 0.42);
        }

        .btn3d::after {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: var(--radius);
          background: radial-gradient(
            140px 70px at var(--mx, 50%) var(--my, 30%),
            var(--specular),
            var(--specular-falloff) 45%,
            transparent 70%
          );
          mix-blend-mode: screen;
          filter: blur(8px);
          pointer-events: none;
          z-index: 5;
          opacity: 0.9;
          transition: opacity 0.15s ease;
        }

        .btn3d__cap {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 20px 44px;
          border-radius: calc(var(--radius) - 2px);
          background: linear-gradient(180deg, var(--cap-top), var(--cap-bottom));
          transform: translateY(calc(-1 * var(--thickness)))
            rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
          transform-style: preserve-3d;
          transition: transform 0.08s cubic-bezier(0.2, 0.8, 0.1, 1),
            box-shadow 0.12s ease;
          box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.4),
            inset 0 -3px 8px rgba(0, 0, 0, 0.28);
          z-index: 2;
        }

        .btn3d__cap::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: calc(-1 * var(--thickness));
          height: var(--thickness);
          border-radius: 0 0 calc(var(--radius) - 2px) calc(var(--radius) - 2px);
          background: linear-gradient(180deg, var(--side-top), var(--side-bottom));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12),
            inset 0 -3px 6px rgba(0, 0, 0, 0.28);
          pointer-events: none;
          z-index: -1;
        }

        .btn3d__text {
          position: relative;
          display: inline-block;
          color: var(--text);
          font: 800 28px/1.05 ui-sans-serif, system-ui, -apple-system, "Segoe UI",
            Roboto, Arial, sans-serif;
          transform: translateZ(8px);
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.22),
            0 2px 6px rgba(0, 0, 0, 0.25);
        }

        .btn3d:hover .btn3d__cap {
          transform: translateY(calc(-1 * var(--thickness) + 2px))
            rotateX(var(--rx, 1.5deg)) rotateY(var(--ry, 0.5deg));
        }

        .btn3d.is-pressed .btn3d__cap,
        .btn3d:active .btn3d__cap {
          transform: translateY(calc(-1 * var(--thickness) + var(--travel)))
            rotateX(var(--rx, 3deg)) rotateY(var(--ry, 1.5deg));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22),
            inset 0 -6px 12px rgba(0, 0, 0, 0.45);
        }

        .btn3d.is-pressed .btn3d__cap::after,
        .btn3d:active .btn3d__cap::after {
          height: calc(var(--thickness) - var(--travel));
          bottom: calc(-1 * (var(--thickness) - var(--travel)));
        }

        @media (prefers-reduced-motion: reduce) {
          .btn3d__cap {
            transition: none !important;
          }
          .btn3d::after {
            display: none !important;
          }
        }
      `}</style>
      <span className="btn3d__cap" ref={capRef}>
        <span className="btn3d__text">{children}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        data-thickness={thickness}
        data-travel={travel}
        data-tilt={tilt}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      data-thickness={thickness}
      data-travel={travel}
      data-tilt={tilt}
    >
      {content}
    </button>
  );
}
