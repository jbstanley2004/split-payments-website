"use client";

import { useEffect, useRef } from "react";

type IntersectionObserverCallback = (entry: IntersectionObserverEntry) => void;

interface IntersectionObserverOptions {
  threshold?: number;
}

export function useIntersectionObserver(
  callback: IntersectionObserverCallback,
  options: IntersectionObserverOptions = {}
) {
  const { threshold = 0.12 } = options;
  const targetRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback(entry);
          }
        });
      },
      { threshold }
    );

    targetRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      targetRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, [callback, threshold]);

  const addTarget = (node: HTMLElement | null) => {
    if (node && !targetRefs.current.includes(node)) {
      targetRefs.current.push(node);
    }
  };

  return addTarget;
}
