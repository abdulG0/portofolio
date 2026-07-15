"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Safety net for browser back/forward navigation.
 *
 * Occasionally the App Router can miss a popstate event (e.g. when a
 * navigation races with a re-render), leaving the URL updated but the
 * page content stale — the user then has to refresh manually. This
 * component watches for that desync and forces the router to catch up.
 */
export function NavigationSync() {
  const pathname = usePathname();
  const router = useRouter();
  const renderedPath = useRef(pathname);
  renderedPath.current = pathname;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const onPopState = () => {
      if (timer) clearTimeout(timer);
      // Give the router a moment to handle the popstate itself first.
      timer = setTimeout(() => {
        const browserPath = window.location.pathname;
        if (browserPath !== renderedPath.current) {
          // Router missed the history change — re-sync it to the URL.
          router.replace(browserPath + window.location.search, { scroll: true });
        }
      }, 350);
    };

    window.addEventListener("popstate", onPopState);
    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("popstate", onPopState);
    };
  }, [router]);

  return null;
}
