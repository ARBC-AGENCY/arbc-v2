"use client";

import { useState } from "react";
import { flushSync } from "react-dom";
import Loader from "./Loader";
import { PageReadyContext } from "@/context/page-ready";
import { initLoader } from "@/lib/pageTransitions";

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderComplete = () => {
    // flushSync forces React to commit the state update synchronously so
    // the content is in the DOM before initLoader's gsap.set() calls run.
    flushSync(() => setLoaded(true));

    // Read the current page name from the <main data-page-name="..."> element
    const pageName =
      document.querySelector<HTMLElement>("main[data-page-name]")?.dataset
        .pageName ?? "Home";

    // Cover the newly-visible content with the overlay, then cinematic reveal
    initLoader(pageName);
  };

  return (
    <PageReadyContext.Provider value={loaded}>
      {!loaded && <Loader onComplete={handleLoaderComplete} />}
      {/* visibility instead of opacity so .once-in elements are laid out
          (and targetable by GSAP) even before the loader finishes */}
      <div style={{ visibility: loaded ? "visible" : "hidden" }}>
        {children}
      </div>
    </PageReadyContext.Provider>
  );
}
