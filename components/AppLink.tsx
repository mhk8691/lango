"use client";

import { forwardRef, useMemo, type ComponentProps } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { dashboardHref } from "@/components/dashboard/routes";

/** All authenticated application destinations have one canonical dashboard URL. */
export function useAppHref() { return dashboardHref; }
/** Resolves real hrefs, preserving new-tab, keyboard and browser history behavior. */
const AppLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof NextLink>>(function AppLink({ href, ...props }, ref) {
  const resolve = useAppHref();
  const target = typeof href === "string" ? resolve(href) : { ...href, pathname: href.pathname ? resolve(href.pathname) : href.pathname };
  return <NextLink ref={ref} href={target} {...props} />;
});
export default AppLink;

export function useAppRouter() {
  const router = useRouter();
  const resolve = useAppHref();
  return useMemo<typeof router>(() => ({
    ...router,
    push: (href, options) => router.push(resolve(href), options),
    replace: (href, options) => router.replace(resolve(href), options),
    prefetch: (href, options) => router.prefetch(resolve(href), options),
  }), [router, resolve]);
}
