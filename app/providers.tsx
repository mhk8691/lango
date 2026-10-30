"use client";

import type { ReactNode } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { prefixer } from "stylis";
import theme from "./theme";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider
      key="mui-literal-directions"
      options={{
        key: "mui-literal",
        // Keep CSS directions literal. RTL comes from the document and theme;
        // do not add a mirroring plugin that swaps left/right declarations.
        stylisPlugins: [prefixer],
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
