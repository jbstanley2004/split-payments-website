"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Map routes to theme colors
const THEME_COLORS: Record<string, { light: string; dark: string }> = {
  "/": { light: "#d97757", dark: "#1a1a1a" }, // Home - accent color
  "/funding": { light: "#d97757", dark: "#1a1a1a" }, // Funding page
  "/payments": { light: "#d97757", dark: "#1a1a1a" }, // Payments page
  "/get-started": { light: "#d97757", dark: "#1a1a1a" }, // Get started page
};

export function DynamicThemeColor() {
  const pathname = usePathname();

  useEffect(() => {
    const updateThemeColor = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const colors = THEME_COLORS[pathname] || THEME_COLORS["/"];
      const themeColor = isDark ? colors.dark : colors.light;

      // Update existing theme-color meta tag
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (!metaThemeColor) {
        metaThemeColor = document.createElement("meta");
        metaThemeColor.setAttribute("name", "theme-color");
        document.head.appendChild(metaThemeColor);
      }
      metaThemeColor.setAttribute("content", themeColor);
    };

    // Update on mount and pathname change
    updateThemeColor();

    // Listen for color scheme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => updateThemeColor();

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [pathname]);

  return null;
}
