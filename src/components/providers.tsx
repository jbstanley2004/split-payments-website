"use client";

import { ThemeProvider as SystemThemeProvider } from "@/components/theme-provider";
import GlobalStyles from "@/styles/GlobalStyles";
import { theme } from "@/theme";
import type { ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SystemThemeProvider>
      <StyledThemeProvider theme={theme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </SystemThemeProvider>
  );
}
