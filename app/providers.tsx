"use client";

import type { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider
      key="mui-literal-directions"
      options={{
        key: "mui-literal",
        // Emotion's built-in prefixer preserves literal left/right values.
        // Keep its matching Stylis version; external prefixers can break inputs.
        enableCssLayer: true,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
