"use client";

import { useState, useEffect } from "react";
import { flushSync } from "react-dom";
import Loader from "./Loader";
import { PageReadyContext } from "@/context/page-ready";
import { firstLoadTransition } from "@/lib/pageTransitions";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

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
    // The page name is readable even before setLoaded(true) because the
    // <main data-page-name="…"> element is already in the DOM — it's just
    // hidden via visibility:hidden on the wrapper below.
    const pageName =
      document.querySelector<HTMLElement>("main[data-page-name]")?.dataset
        .pageName ?? "Home";

    // firstLoadTransition runs the full cinematic arc (same as a page
    // transition): overlay sweeps in from below → shows page name → sweeps
    // out above while .once-in springs up.
    //
    // It calls revealPage() at the moment the overlay fully covers the
    // screen, which is the safe window to unmount the ARBC loader and
    // make the page content visible.
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
