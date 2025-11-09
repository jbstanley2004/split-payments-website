"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "./ThickButton.css";

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
  thickness = 30,
  travel = 22,
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
    <span className="btn3d__cap" ref={capRef}>
      <span className="btn3d__text">{children}</span>
    </span>
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
