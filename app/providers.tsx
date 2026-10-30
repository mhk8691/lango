"use client";

import type { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { prefixer } from "stylis";
import theme from "./theme";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider
      options={{
        key: "mui-rtl",
        stylisPlugins: [prefixer, rtlPlugin],
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
