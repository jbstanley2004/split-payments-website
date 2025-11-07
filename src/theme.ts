export const theme = {
  colors: {
    background: "var(--theme-background)",
    surface: "var(--theme-surface)",
    textPrimary: "var(--theme-text-primary)",
    textSecondary: "var(--theme-text-secondary)",
    accent: "var(--theme-accent)",
    accentHover: "var(--theme-accent-hover)",
    border: "var(--theme-border)",
  },
  fonts: {
    primary:
      "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
  },
  spacing: (factor: number) => `${factor * 8}px`,
  radius: {
    sm: "4px",
    md: "8px",
    lg: "12px",
  },
  shadows: {
    card: "0 6px 18px rgba(0,0,0,0.35)",
  },
} as const;

export type AppTheme = typeof theme;
