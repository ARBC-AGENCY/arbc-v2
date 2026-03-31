"use client";

import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import Loader from "./Loader";
import { PageReadyContext } from "@/context/page-ready";
import { firstLoadTransition } from "@/lib/pageTransitions";
import { hasSeenIntroRecently } from "@/lib/introGate";
import { useRouter } from "@/i18n/navigation";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();

  // Lock scroll on mount so the browser's scrollbar gutter never shows
  // while the ARBC splash loader is covering the viewport.
  // firstLoadTransition's timeline unlocks it at the end.
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  const handleLoaderComplete = () => {
    const pageName =
      document.querySelector<HTMLElement>("main[data-page-name]")?.dataset
        .pageName ?? "home";

    // If the user is landing on the home page but has already seen the intro
    // recently, run the transition as if heading to Projects and push the route.
    const isHome = pageName === "home";
    if (isHome && hasSeenIntroRecently()) {
      firstLoadTransition("projects", () => {
        flushSync(() => setLoaded(true));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        router.push("/projects" as any);
      });
      return;
    }

    firstLoadTransition(pageName, () => {
      flushSync(() => setLoaded(true));
    });
  };

  return (
    <PageReadyContext.Provider value={loaded}>
      {!loaded && <Loader onComplete={handleLoaderComplete} />}
      {/* visibility (not opacity) keeps .once-in elements in the layout and
          targetable by GSAP before the loader finishes */}
      <div style={{ visibility: loaded ? "visible" : "hidden" }}>
        {children}
      </div>
    </PageReadyContext.Provider>
  );
}
