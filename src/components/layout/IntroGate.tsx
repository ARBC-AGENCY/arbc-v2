"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { hasSeenIntroRecently, markIntroSeen } from "@/lib/introGate";

/**
 * Rendered only on the home page.
 * On every mount (including browser back navigation), checks whether the
 * user has already seen the intro within the last 24 h. If so, stamps
 * the departure immediately and redirects to /projects — bypassing the
 * home hero entirely.
 *
 * This handles the case where PageWrapper (in the layout) stays mounted
 * across SPA navigations and never re-runs handleLoaderComplete.
 */
export default function IntroGate() {
  const router = useRouter();

  useEffect(() => {
    if (hasSeenIntroRecently()) {
      // Stamp again to refresh the 24 h window, then redirect
      markIntroSeen();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.replace("/projects" as any);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
