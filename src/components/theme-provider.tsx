"use client";

import { useEffect, type ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, []);

  return <>{children}</>;
}
