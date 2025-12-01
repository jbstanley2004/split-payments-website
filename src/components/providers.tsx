"use client";

import { ThemeProvider as SystemThemeProvider } from "@/components/theme-provider";
import GlobalStyles from "@/styles/GlobalStyles";
import { theme } from "@/theme";
import type { ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { AuthProvider } from "@/lib/auth-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SystemThemeProvider>
      <AuthProvider>
        <StyledThemeProvider theme={theme}>
          <GlobalStyles />
          {children}
        </StyledThemeProvider>
      </AuthProvider>
    </SystemThemeProvider>
  );
}
